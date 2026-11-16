"use client";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { fmt, type Val } from "./metrics";
import s from "./OdrDashboard.module.css";

/**
 * Lightweight SVG line chart for the ODR demo, modelled on the program's chart(): time x-axis, one y-axis per unit,
 * lines broken on missing values and on days missing from the workbook, a crosshair tooltip and click-to-pick.
 */

export interface ChartLine {
  name: string;
  color: string;
  dash?: string;
  /** Indexed like `days` */
  values: Val[];
  /** y-axis index (Overlay with several units) */
  axis?: number;
  /** Tooltip value text; defaults to value + unit */
  tip?: (i: number, v: number) => ReactNode;
}

interface Props {
  days: string[];
  /** Day indices inside the selected period */
  idx: number[];
  lines: ChartLine[];
  /** Unit per y-axis (left first, then right) */
  axes: string[];
  digits: number;
  height: number;
  compact?: boolean;
  /** No axes or tick labels (sparkline) */
  bare?: boolean;
  label: string;
  onPick?: (i: number) => void;
}

const DAY = 86400000;
const ms = (d: string) => Date.parse(d + "T00:00:00Z");
const mmdd = (d: string) => d.slice(5);

function niceStep(range: number, count: number) {
  const raw = range / count, mag = Math.pow(10, Math.floor(Math.log10(raw)));
  for (const m of [1, 2, 2.5, 5, 10]) if (raw <= m * mag) return m * mag;
  return 10 * mag;
}
/** The program's yScale(): 10 % padding, floor at 0 for non-negative data, nice steps */
function yScale(values: number[], count: number) {
  let lo = values.length ? Math.min(...values) : 0, hi = values.length ? Math.max(...values) : 1;
  const pad = (hi - lo) * 0.1 || Math.abs(hi) * 0.05 || 1;
  let a = lo - pad;
  const b0 = hi + pad;
  if (lo >= 0 && a < 0) a = 0;
  const step = niceStep(b0 - a, count);
  a = Math.floor(a / step) * step;
  const b = Math.ceil(b0 / step) * step;
  const ticks: number[] = [];
  for (let t = a; t <= b + step / 2; t += step) ticks.push(+t.toPrecision(12));
  lo = a; hi = b;
  return { lo, hi, ticks, step };
}
const tickLabel = (t: number, step: number) => {
  const d = step >= 1 ? 0 : Math.min(3, Math.ceil(-Math.log10(step)));
  return t.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
};

export function LineChart({ days, idx, lines, axes, digits, height, compact, bare, label, onPick }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [hi, setHi] = useState<number | null>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(Math.round(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const m = bare ? { l: 4, r: 4, t: 6, b: 6 } : { l: compact ? 44 : 58, r: (compact ? 10 : 18) + Math.max(0, axes.length - 1) * 54, t: compact ? 8 : 12, b: compact ? 22 : 28 };
  const pw = Math.max(10, width - m.l - m.r), ph = height - m.t - m.b;

  const geo = useMemo(() => {
    if (!idx.length) return null;
    const t0 = ms(days[idx[0]]), t1 = ms(days[idx[idx.length - 1]]), span = Math.max(DAY, t1 - t0);
    const X = (i: number) => m.l + ((ms(days[i]) - t0) / span) * pw;
    const scales = axes.map((_, a) => {
      const vals: number[] = [];
      for (const l of lines) if ((l.axis ?? 0) === a) for (const i of idx) { const v = l.values[i]; if (v !== null && v !== undefined) vals.push(v); }
      return yScale(vals, compact ? 3 : 5);
    });
    const Y = (a: number, v: number) => { const sc = scales[a]; return m.t + ph - ((v - sc.lo) / (sc.hi - sc.lo || 1)) * ph; };
    const paths = lines.map((l) => {
      let d = "", prev: number | null = null;
      const dots: number[] = [];
      let run: number[] = [];
      const flush = () => { if (run.length === 1) dots.push(run[0]); run = []; };
      for (const i of idx) {
        const v = l.values[i];
        if (v === null || v === undefined) { flush(); prev = null; continue; }
        if (prev !== null && ms(days[i]) - ms(days[prev]) > DAY) { flush(); prev = null; }
        d += `${prev === null ? "M" : "L"}${X(i).toFixed(1)},${Y(l.axis ?? 0, v).toFixed(1)}`;
        run.push(i); prev = i;
      }
      flush();
      return { d, dots };
    });
    // date ticks: a whole number of days apart, about every 100–120 px
    const spanDays = Math.round(span / DAY);
    const want = Math.max(2, Math.floor(pw / (compact ? 90 : 115)));
    const step = [1, 2, 3, 7, 14, 21, 28, 42, 56, 84].find((s) => spanDays / s <= want) ?? 84;
    const xticks: number[] = [];
    for (let t = t0; t <= t1; t += step * DAY) xticks.push(t);
    return { t0, span, X, Y, scales, paths, xticks };
  }, [days, idx, lines, axes, compact, pw, ph, m.l, m.t]);

  const nearest = (clientX: number) => {
    if (!geo || !host.current) return null;
    const x = clientX - host.current.getBoundingClientRect().left;
    let best = idx[0], bd = Infinity;
    for (const i of idx) { const d = Math.abs(geo.X(i) - x); if (d < bd) { bd = d; best = i; } }
    return best;
  };
  const onMove = (e: PointerEvent) => setHi(nearest(e.clientX));
  const onKey = (e: KeyboardEvent) => {
    if (!idx.length) return;
    const k = hi === null ? -1 : idx.indexOf(hi);
    if (e.key === "ArrowRight") { setHi(idx[Math.min(idx.length - 1, k + 1)]); e.preventDefault(); }
    else if (e.key === "ArrowLeft") { setHi(idx[Math.max(0, k < 0 ? idx.length - 1 : k - 1)]); e.preventDefault(); }
    else if (e.key === "Enter" && hi !== null) onPick?.(hi);
    else if (e.key === "Escape") setHi(null);
  };

  const sig = lines.map((l) => l.name).join("|") + idx.length;
  const tipRows = hi === null ? [] : lines.map((l) => ({ l, v: l.values[hi] ?? null }));
  const tipLeft = hi !== null && geo ? geo.X(hi) : 0;
  const flip = tipLeft > width * 0.62;

  return (
    <div
      ref={host}
      className={s.chart}
      style={{ height }}
      tabIndex={0}
      role="img"
      aria-label={label}
      onPointerMove={onMove}
      onPointerDown={onMove}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHi(null)}
      onClick={() => hi !== null && onPick?.(hi)}
      onKeyDown={onKey}
      onBlur={() => setHi(null)}
      data-pickable={onPick ? "" : undefined}
    >
      {width > 0 && geo && (
        <svg width={width} height={height} aria-hidden>
          {!bare && geo.scales[0].ticks.map((t) => (
            <g key={t}>
              <line x1={m.l} x2={m.l + pw} y1={geo.Y(0, t)} y2={geo.Y(0, t)} className={s.grid} />
              <text x={m.l - 8} y={geo.Y(0, t)} className={s.ytick} textAnchor="end" dominantBaseline="middle">{tickLabel(t, geo.scales[0].step)}</text>
            </g>
          ))}
          {!bare && geo.scales.slice(1).map((sc, a) => sc.ticks.map((t) => (
            <text key={`${a}-${t}`} x={m.l + pw + 8 + a * 54} y={geo.Y(a + 1, t)} className={s.ytick} dominantBaseline="middle">{tickLabel(t, sc.step)}</text>
          )))}
          {!bare && geo.xticks.map((t) => (
            <text key={t} x={m.l + ((t - geo.t0) / geo.span) * pw} y={height - 6} className={s.xtick} textAnchor="middle">{mmdd(new Date(t).toISOString().slice(0, 10))}</text>
          ))}
          <g key={sig} className={s.series}>
            {lines.map((l, k) => (
              <g key={l.name}>
                <path d={geo.paths[k].d} stroke={l.color} strokeDasharray={l.dash || undefined} className={s.line} />
                {geo.paths[k].dots.map((i) => <circle key={i} cx={geo.X(i)} cy={geo.Y(l.axis ?? 0, l.values[i] as number)} r={2.2} fill={l.color} />)}
              </g>
            ))}
          </g>
          {hi !== null && (
            <g className={s.cross}>
              <line x1={geo.X(hi)} x2={geo.X(hi)} y1={m.t} y2={m.t + ph} />
              {tipRows.map(({ l, v }) => v !== null && <circle key={l.name} cx={geo.X(hi)} cy={geo.Y(l.axis ?? 0, v)} r={3.5} fill={l.color} />)}
            </g>
          )}
        </svg>
      )}
      {hi !== null && geo && (
        <div className={s.tip} style={{ left: flip ? undefined : tipLeft + 14, right: flip ? width - tipLeft + 14 : undefined, top: m.t + 4 }} role="status">
          <div className={s.tipDate}>{days[hi]}</div>
          {tipRows.slice(0, 12).map(({ l, v }) => (
            <div key={l.name} className={s.tipRow}>
              <span className={s.sw} style={{ background: l.color }} />
              {lines.length > 1 && <span className={s.tipName}>{l.name}</span>}
              <span>{v === null ? "값 없음" : l.tip ? l.tip(hi, v) : fmt(v, digits)}</span>
            </div>
          ))}
          {tipRows.length > 12 && <div className={s.tipMore}>+{tipRows.length - 12}개 더</div>}
          {onPick && !compact && <div className={s.tipHint}>클릭: 운영 현황을 이 날짜로</div>}
        </div>
      )}
    </div>
  );
}
