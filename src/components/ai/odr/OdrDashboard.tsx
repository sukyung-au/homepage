"use client";
import { useMemo, useState, type ReactNode } from "react";
import { CHECKS, DAYS, PADS, PLANT_DAYS, TANKS, WELLS, type DemoWell } from "./demoData";
import { LineChart, type ChartLine } from "./LineChart";
import {
  PLANT, UNIT_PANELS, WELL_METRICS, change, fmt, selectionTotal, wellDetail, wellMetric, wellValue,
  type PlantKey, type Val, type WellKey,
} from "./metrics";
import s from "./OdrDashboard.module.css";

/**
 * Interactive reproduction of the ODR dashboard's core views on synthetic data: Production & Quality (metric,
 * period, tooltip), Well Operations (multi-select, production / injection metrics, Split · Overlay · Selection
 * Total) and a compact Operating Status. All three panels share one grid cell, so switching tabs or modes never
 * changes the page height.
 */

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");
const DAY = 86400000;
const N = DAYS.length;
const ms = (d: string) => Date.parse(d + "T00:00:00Z");
const SPAN = Math.round((ms(DAYS[N - 1]) - ms(DAYS[0])) / DAY) + 1;
const ALL_IDX = DAYS.map((_, i) => i);

/** The program's windowOf(): the last n calendar days (0 = everything) */
function windowOf(n: number) {
  const all = !n || n >= SPAN;
  const start = all ? DAYS[0] : new Date(ms(DAYS[N - 1]) - (n - 1) * DAY).toISOString().slice(0, 10);
  return { idx: ALL_IDX.filter((i) => DAYS[i] >= start), days: all ? SPAN : n, all };
}

const WELL_COLORS = ["#2a78d6", "#eb6834", "#1baf7a", "#6250d6", "#c98500", "#d55181", "#1c5cab", "#12a4d9", "#8a4fbf", "#008300", "#b8322a", "#5b6b7e"];
const wellColor = (w: DemoWell) => WELL_COLORS[WELLS.indexOf(w) % WELL_COLORS.length];
const METRIC_COLORS: Record<WellKey, string> = { oil: "#2a78d6", emulsion: "#1baf7a", sor: "#6250d6", wor: "#c98500", steam: "#eb6834", bhp: "#d55181" };
const pctText = (p: number | null, d = 1) => (p === null ? "" : `${p > 0 ? "▲" : p < 0 ? "▼" : "■"} ${Math.abs(p).toFixed(d)}%`);
const pctCls = (p: number | null) => (!p ? s.flat : p > 0 ? s.up : s.down);
const mmdd = (d: string) => d.slice(5);

/* ───────── shared controls ───────── */

function Seg({ on, onClick, children, title }: { on: boolean; onClick: () => void; children: ReactNode; title?: string }) {
  return <button type="button" className={cx(s.seg, on && s.on)} aria-pressed={on} onClick={onClick} title={title}>{children}</button>;
}

const PRESETS: [string, number][] = [["7일", 7], ["14일", 14], ["30일", 30], ["60일", 60], ["전체", 0]];

function PeriodBar({ n, set }: { n: number; set: (n: number) => void }) {
  const w = windowOf(n);
  return (
    <div className={s.period}>
      <span className={s.periodLabel}>트렌드 기간</span>
      <span className={s.periodVal}>{w.all ? `전체 ${SPAN}일` : `최근 ${w.days}일`}</span>
      <input type="range" min={3} max={SPAN} step={1} value={w.days} aria-label="트렌드 기간 (일)"
        onChange={(e) => set(+e.target.value >= SPAN ? 0 : +e.target.value)} />
      <span className={s.presets}>
        {PRESETS.map(([l, v]) => <Seg key={l} on={w.all ? v === 0 : v === w.days} onClick={() => set(v)}>{l}</Seg>)}
      </span>
    </div>
  );
}

/* ───────── 1 · Production & Quality ───────── */

function ProductionPanel({ onPick }: { onPick: (i: number) => void }) {
  const [key, setKey] = useState<PlantKey>("bitumen");
  const [n, setN] = useState(0);
  const m = PLANT.find((p) => p.key === key)!;
  const w = windowOf(n);
  const values = useMemo(() => PLANT_DAYS.map((d) => m.value(d)), [m]);
  const c = change(w.idx.map((i) => [i, values[i]]));
  const missing = w.days - w.idx.length;
  const lines: ChartLine[] = useMemo(() => [{
    name: m.label, color: m.color, values,
    tip: (i, v) => (
      <><b>{fmt(v, m.digits)}</b> {m.unit}{m.detail?.(PLANT_DAYS[i]) && <span className={s.tipSub}>{m.detail(PLANT_DAYS[i])}</span>}</>
    ),
  }], [m, values]);

  return (
    <div className={s.panelBody}>
      <PeriodBar n={n} set={setN} />
      <div className={s.metricRow} role="group" aria-label="지표">
        {(["생산", "판매·성분"] as const).map((g) => (
          <span key={g} className={s.metricGroup}>
            <span className={s.groupLabel}>{g}</span>
            {PLANT.filter((p) => p.group === g).map((p) => <Seg key={p.key} on={p.key === key} onClick={() => setKey(p.key)} title={p.def}>{p.label}</Seg>)}
          </span>
        ))}
      </div>
      <div className={s.readout}>
        <span className={s.big}>{c ? fmt(c.value, m.digits) : "–"}</span>
        <span className={s.unit}>{m.unit}</span>
        {c && (
          <span className={s.stats}>
            {mmdd(DAYS[c.i1])} 기준
            {c.pct !== null && <> · <b className={pctCls(c.pct)}>{pctText(c.pct)}</b> (기간 시작 {mmdd(DAYS[c.i0])} 대비)</>}
            {" "}· 기간 평균 {fmt(c.avg, m.digits)} {m.unit}
            {missing > 0 && <> · Excel에 없는 날 {missing}일</>}
          </span>
        )}
      </div>
      <LineChart days={DAYS} idx={w.idx} lines={lines} axes={[m.unit]} digits={m.digits} height={300}
        label={`${m.label} 일별 추세 (가상 데이터)`} onPick={onPick} />
      <p className={s.def}><span>정의</span>{m.def}</p>
    </div>
  );
}

/* ───────── 2 · Well Operations ───────── */

type Mode = "split" | "overlay" | "total";
const MODES: [Mode, string, string][] = [
  ["split", "Split", "Well × 지표마다 그래프를 하나씩"],
  ["overlay", "Overlay", "한 그래프에 겹쳐서 — 색 = Well, 선 모양 = 지표"],
  ["total", "Selection Total", "선택한 Well을 합쳐서 — 비율은 합계로 다시 계산"],
];
const MAX_SPLIT = 24;
const AREA = 372;

function DashSample({ dash }: { dash: string }) {
  return <svg width="26" height="8" aria-hidden className={s.dashSample}><line x1="1" y1="4" x2="25" y2="4" strokeDasharray={dash || undefined} /></svg>;
}

function statOf(values: Val[], idx: number[], digits: number, unit: string) {
  const c = change(idx.map((i) => [i, values[i]]));
  if (!c) return <span className={s.cellStat}>값 없음</span>;
  return <span className={s.cellStat}><b>{fmt(c.value, digits)}</b> {unit} {c.pct !== null && <span className={pctCls(c.pct)}>{pctText(c.pct, 0)}</span>}</span>;
}

function WellPanel() {
  const [sel, setSel] = useState<string[]>(["A/A-2", "A/A-4", "B/B-1"]);
  const [metrics, setMetrics] = useState<WellKey[]>(["oil"]);
  const [mode, setMode] = useState<Mode>("split");
  const [n, setN] = useState(0);
  const w = windowOf(n);
  const wells = WELLS.filter((x) => sel.includes(x.id));

  const toggleWell = (id: string) => setSel((v) => (v.includes(id) ? v.filter((x) => x !== id) : [...v, id]));
  const togglePad = (pad: string) => {
    const ids = WELLS.filter((x) => x.pad === pad).map((x) => x.id);
    const all = ids.every((id) => sel.includes(id));
    setSel((v) => (all ? v.filter((id) => !ids.includes(id)) : [...new Set([...v, ...ids])]));
  };
  const toggleMetric = (k: WellKey) => setMetrics((v) => (v.includes(k) ? v.filter((x) => x !== k) : WELL_METRICS.map((m) => m.key).filter((x) => x === k || v.includes(x))));

  const wellLine = (wl: DemoWell, k: WellKey, name: string, color: string, dash = "", axis = 0): ChartLine => {
    const m = wellMetric(k);
    return { name, color, dash, axis, values: DAYS.map((_, i) => wellValue(k, wl.raw, i)),
      tip: (i, v) => <><b>{fmt(v, m.digits)}</b> {m.unit}{wellDetail(k, wl.raw, i) && <span className={s.tipSub}>{wellDetail(k, wl.raw, i)}</span>}</> };
  };

  let legend: ReactNode = null;
  let body: ReactNode = null;
  if (!wells.length || !metrics.length) {
    body = <div className={s.empty}>왼쪽에서 Well을, 위에서 지표를 하나 이상 선택하세요.</div>;
  } else if (mode === "split") {
    const combos = wells.flatMap((wl) => metrics.map((k) => [wl, k] as const));
    const shown = combos.slice(0, MAX_SPLIT);
    const cols = shown.length === 1 ? 1 : shown.length === 2 ? 2 : 3;
    const rows = Math.ceil(shown.length / cols);
    const h = Math.max(128, Math.floor((AREA - (rows - 1) * 16) / Math.min(rows, 2)) - 30);
    legend = <>Split: Well {wells.length}개 × 지표 {metrics.length}개 = 그래프 {combos.length}개{combos.length > MAX_SPLIT && ` — 처음 ${MAX_SPLIT}개만 표시`} · 색 = Well</>;
    body = (
      <div className={s.splitGrid} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {shown.map(([wl, k]) => {
          const m = wellMetric(k), line = wellLine(wl, k, `${wl.name} ${m.label}`, wellColor(wl));
          return (
            <div key={wl.id + k} className={s.cell}>
              <div className={s.cellHead}><span className={s.sw} style={{ background: wellColor(wl) }} />{wl.name} · {m.label} {statOf(line.values, w.idx, m.digits, m.unit)}</div>
              <LineChart days={DAYS} idx={w.idx} lines={[line]} axes={[m.unit]} digits={m.digits} height={h} compact label={`${wl.name} ${m.label} (가상 데이터)`} />
            </div>
          );
        })}
      </div>
    );
  } else if (mode === "overlay") {
    const panels = UNIT_PANELS.map(([u, ks]) => [u, ks.filter((k) => metrics.includes(k))] as const).filter((p) => p[1].length);
    const lines = panels.flatMap(([, ks], a) => wells.flatMap((wl) => ks.map((k) => wellLine(wl, k, `${wl.name} ${wellMetric(k).label}`, wellColor(wl), wellMetric(k).dash, a))));
    legend = (
      <>
        Overlay: 선택한 Well {wells.length}개를 모두 한 그래프에 · 색 = Well, 선 모양 = 지표
        <span className={s.axisNote}>
          {panels.map(([u, ks], a) => (
            <span key={u}>{panels.length > 1 && <b>{a === 0 ? "왼쪽 축" : `오른쪽 축${panels.length > 2 ? ` ${a}` : ""}`} </b>}{u}{ks.includes("steam") && u === "bbl/d" ? " (Steam은 CWE)" : ""}: {ks.map((k) => <span key={k} className={s.dashKey}>{wellMetric(k).label}<DashSample dash={wellMetric(k).dash} /></span>)}</span>
          ))}
        </span>
      </>
    );
    body = (
      <>
        <div className={s.chips}>{wells.map((wl) => <span key={wl.id}><span className={s.sw} style={{ background: wellColor(wl) }} />{wl.name}</span>)}</div>
        <LineChart days={DAYS} idx={w.idx} lines={lines} axes={panels.map((p) => p[0])} digits={1} height={AREA - 34} label="선택한 Well Overlay (가상 데이터)" />
      </>
    );
  } else {
    const h = Math.max(120, Math.floor((AREA - (metrics.length - 1) * 14) / metrics.length) - 30);
    legend = <>Selection Total: 선택한 Well {wells.length}개 ({wells.map((x) => x.name).join(", ")}) · 색 = 지표</>;
    body = (
      <div className={s.totalStack}>
        {metrics.map((k) => {
          const m = wellMetric(k);
          const res = DAYS.map((_, i) => selectionTotal(k, wells.map((x) => x.raw), i));
          const label = `${m.label}${k === "bhp" ? " 평균" : k === "oil" || k === "steam" || k === "emulsion" ? " 합계" : ""}`;
          const line: ChartLine = { name: label, color: METRIC_COLORS[k], values: res.map((r) => r[0]),
            tip: (i, v) => <><b>{fmt(v, m.digits)}</b> {m.unit} <span className={s.tipSub}>값 있는 Well {res[i][1]}/{wells.length}개</span></> };
          return (
            <div key={k} className={s.cell}>
              <div className={s.cellHead}><span className={s.sw} style={{ background: METRIC_COLORS[k] }} />{label} {statOf(line.values, w.idx, m.digits, m.unit)}<span className={s.rule}>집계: {m.total}</span></div>
              <LineChart days={DAYS} idx={w.idx} lines={[line]} axes={[m.unit]} digits={m.digits} height={h} compact={metrics.length > 1} label={`선택 Well ${label} (가상 데이터)`} />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={s.panelBody}>
      <PeriodBar n={n} set={setN} />
      <div className={s.wellControls}>
        <span className={s.groupLabel}>지표</span>
        {(["prod", "inj"] as const).map((g) => (
          <span key={g} className={cx(s.metricGroup, s.tint, g === "inj" && s.tintInj)} role="group" aria-label={g === "prod" ? "생산 지표" : "주입 지표"}>
            <span className={s.groupLabel}>{g === "prod" ? "생산 Production" : "주입 Injection"}</span>
            {WELL_METRICS.filter((m) => m.group === g).map((m) => <Seg key={m.key} on={metrics.includes(m.key)} onClick={() => toggleMetric(m.key)} title={m.def}>{m.label}</Seg>)}
          </span>
        ))}
        <span className={s.metricGroup} role="group" aria-label="보기">
          <span className={s.groupLabel}>보기</span>
          {MODES.map(([k, l, t]) => <Seg key={k} on={mode === k} onClick={() => setMode(k)} title={t}>{l}</Seg>)}
        </span>
      </div>
      <div className={s.wellLayout}>
        <div className={s.wellList}>
          {PADS.map(({ pad, wells: list }) => {
            const ids = list.map((x) => x.id), cnt = ids.filter((id) => sel.includes(id)).length;
            return (
              <div key={pad} className={s.pad}>
                <label className={s.padHead}>
                  <input type="checkbox" checked={cnt === ids.length} ref={(el) => { if (el) el.indeterminate = cnt > 0 && cnt < ids.length; }} onChange={() => togglePad(pad)} />
                  Pad {pad} 전체
                </label>
                {list.map((wl) => (
                  <label key={wl.id} className={s.wellItem}>
                    <input type="checkbox" checked={sel.includes(wl.id)} onChange={() => toggleWell(wl.id)} />
                    {wl.name}
                    {sel.includes(wl.id) && <span className={s.sw} style={{ background: wellColor(wl) }} />}
                  </label>
                ))}
              </div>
            );
          })}
          <button type="button" className={s.clear} onClick={() => setSel([])}>모두 해제</button>
        </div>
        <div className={s.wellMain}>
          <p className={s.legend}>{legend ?? MODES.find((x) => x[0] === mode)![2]}</p>
          <div className={s.wellArea} style={{ height: AREA }}>{body}</div>
        </div>
      </div>
    </div>
  );
}

/* ───────── 3 · Operating Status ───────── */

const TANK_COLORS = ["#2a78d6", "#eb6834", "#1baf7a", "#c98500"];

function StatusPanel({ i, setI }: { i: number; setI: (i: number) => void }) {
  return (
    <div className={s.panelBody}>
      <div className={s.statusHead}>
        <span className={s.statusDate}>운영 현황 · {DAYS[i]}{i === N - 1 && " (최신)"}</span>
        <Seg on={false} onClick={() => setI(Math.max(0, i - 1))}>◀ 이전날</Seg>
        <Seg on={false} onClick={() => setI(Math.min(N - 1, i + 1))}>다음날 ▶</Seg>
        <Seg on={i === N - 1} onClick={() => setI(N - 1)}>최신</Seg>
        <span className={s.statusNote}>생산·품질 그래프의 점을 클릭해도 그 날짜로 바뀝니다</span>
      </div>
      <div className={s.statusGrid}>
        <div>
          <h4 className={s.statusTitle}>탱크 보유 현황 <span>% Cap</span></h4>
          {TANKS.map((t, k) => (
            <div key={t.name} className={s.tank}>
              <span><span className={s.sw} style={{ background: TANK_COLORS[k] }} />{t.name}</span>
              <span className={s.bar}><span style={{ width: `${t.values[i]}%`, background: TANK_COLORS[k] }} /></span>
              <b>{Math.round(t.values[i])}%</b>
            </div>
          ))}
        </div>
        <div>
          <h4 className={s.statusTitle}>품질 경고</h4>
          {CHECKS.map((c) => {
            const v = c.values[i], over = v !== null && v > c.limit;
            return (
              <div key={c.name} className={s.check}>
                <span className={over ? s.warn : s.ok}>{over ? "! 초과" : "✓ 정상"}</span>
                <b>{c.name}</b> {fmt(v, c.unit === "%" ? 2 : 0)} {c.unit} <span className={s.limit}>기준 {c.limit} {c.unit}</span>
              </div>
            );
          })}
          <p className={s.statusFoot}>원본 대시보드의 Fuels / Energy와 Operator Comments는 공개 페이지에서 제외했습니다.</p>
        </div>
      </div>
    </div>
  );
}

/* ───────── Tabs ───────── */

type Tab = "prod" | "wells" | "status";
const TABS: [Tab, string][] = [["prod", "생산·품질"], ["wells", "Well 운영"], ["status", "운영 현황"]];

export function OdrDashboard() {
  const [tab, setTab] = useState<Tab>("prod");
  const [statusI, setStatusI] = useState(N - 1);
  const [picked, setPicked] = useState(false);
  const pick = (i: number) => { setStatusI(i); setPicked(true); };

  return (
    <div className={s.dash}>
      <div className={s.tabs} role="tablist" aria-label="ODR Dashboard">
        {TABS.map(([k, l]) => (
          <button key={k} type="button" role="tab" id={`odr-tab-${k}`} aria-selected={tab === k} aria-controls={`odr-panel-${k}`}
            className={cx(s.tab, tab === k && s.tabOn)} onClick={() => setTab(k)}>
            {l}{k === "status" && picked && <span className={s.tabDate}>{mmdd(DAYS[statusI])}</span>}
          </button>
        ))}
      </div>
      <div className={s.stage}>
        {TABS.map(([k]) => (
          <div key={k} id={`odr-panel-${k}`} role="tabpanel" aria-labelledby={`odr-tab-${k}`} className={cx(s.panel, tab === k && s.panelOn)} aria-hidden={tab !== k} inert={tab !== k}>
            {k === "prod" ? <ProductionPanel onPick={pick} /> : k === "wells" ? <WellPanel /> : <StatusPanel i={statusI} setI={setStatusI} />}
          </div>
        ))}
      </div>
    </div>
  );
}
