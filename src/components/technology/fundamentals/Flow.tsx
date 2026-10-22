"use client";
import { useId, useState } from "react";
import { RotateCcw } from "lucide-react";
import s from "./Fundamentals.module.css";

/* ───────────── A. Permeability ───────────── */

function Grains({ r, gap, cement, label }: { r: number; gap: number; cement?: boolean; label: string }) {
  const step = r * 2 + gap, cols = Math.floor(240 / step), rows = Math.floor(150 / step);
  const grains: [number, number, number][] = [];
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const jit = ((i * 7 + j * 13) % 5) - 2;
    grains.push([10 + r + i * step + (j % 2 ? step / 2 : 0) + jit * 0.6, 10 + r + j * step + jit * 0.4, r + (((i + j) % 3) - 1) * (cement ? 1.2 : 0.6)]);
  }
  return (
    <svg viewBox="0 0 270 170" className={s.graph} role="img" aria-label={label}>
      <defs>
        <marker id={`pm-${r}`} viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L8,4 L0,8 Z" className={s.flowHead} /></marker>
      </defs>
      <rect width="270" height="170" className={s.poreSpace} />
      {cement && <rect width="270" height="170" className={s.cement} />}
      {grains.map(([x, y, rr]) => <circle key={`${x}-${y}`} cx={x} cy={y} r={rr} className={s.grain} />)}
      {cement
        ? <path d={[0, 1, 2, 3].map((k) => { const y = 10 + 2 * r + gap / 2 + k * step; return `${k ? "L" : "M"}${4 + k * 66},${y} L${60 + k * 66},${y}`; }).join(" ")} className={s.flowThin} markerEnd={`url(#pm-${r})`} />
        : [0, 1, 2].map((k) => {
            // through the open lanes between grain rows
            const y = 10 + 2 * r + gap / 2 + k * step;
            return <path key={k} d={`M4,${y} C90,${y - 2} 180,${y + 2} 266,${y}`} className={s.flowThick} markerEnd={`url(#pm-${r})`} />;
          })}
    </svg>
  );
}

export function Permeability() {
  return (
    <div className={s.permGrid}>
      <figure className={s.figure}>
        <Grains r={14} gap={7} label="High permeability: larger, well-connected pores let fluid pass easily" />
        <figcaption className={s.permCap}><b>High permeability</b> 공극이 크고 잘 연결되어 유체가 쉽게 흐름</figcaption>
      </figure>
      <figure className={s.figure}>
        <Grains r={8} gap={3} cement label="Low permeability: small, poorly connected pore throats restrict flow" />
        <figcaption className={s.permCap}><b>Low permeability</b> 공극 목(pore throat)이 좁고 연결이 약해 흐름이 제한됨</figcaption>
      </figure>
    </div>
  );
}

/* ───────────── B. Pressure drawdown (pseudo-steady-state radial flow, oilfield units) ───────────── */

const MATHML = `<math display="block" aria-label="P r minus P w f equals 141.2 q B mu over k h, times the quantity natural log of r e over r w minus three quarters plus s"><mrow><msub><mi>P</mi><mi>r</mi></msub><mo>−</mo><msub><mi>P</mi><mi>wf</mi></msub><mo>=</mo><mfrac><mrow><mn>141.2</mn><mo>&#8290;</mo><mi>q</mi><mo>&#8290;</mo><mi>B</mi><mo>&#8290;</mo><mi>μ</mi></mrow><mrow><mi>k</mi><mo>&#8290;</mo><mi mathvariant="normal" style="font-style:italic">h</mi></mrow></mfrac><mo>&#215;</mo><mrow><mo>[</mo><mi>ln</mi><mo>&#8289;</mo><mfrac><msub><mi>r</mi><mi>e</mi></msub><msub><mi>r</mi><mi>w</mi></msub></mfrac><mo>−</mo><mfrac><mn>3</mn><mn>4</mn></mfrac><mo>+</mo><mi>s</mi><mo>]</mo></mrow></mrow></math>`;

export function DrawdownFormula() {
  return <div className={s.math} dangerouslySetInnerHTML={{ __html: MATHML }} />;
}


/* ───────────── C. Skin (plan view around the wellbore) ───────────── */

type SkinKind = "positive" | "zero" | "negative";

function SkinView({ kind, uid = "" }: { kind: SkinKind; uid?: string }) {
  const mk = `sk-${kind}${uid}`, hatch = `sk-hatch${uid}`;
  const zone = kind === "zero" ? 0 : 44;
  return (
    <svg viewBox="0 0 200 200" className={s.skinSvg} role="img" aria-label={`Plan view around a well with ${kind} skin`}>
      <defs>
        <marker id={mk} viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L8,4 L0,8 Z" className={s.flowHead} /></marker>
        <pattern id={hatch} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" className={s.hatch} /></pattern>
      </defs>
      <circle cx="100" cy="100" r="92" className={s.skinRock} />
      {kind === "positive" && <circle cx="100" cy="100" r={zone} fill={`url(#${hatch})`} className={s.skinDamaged} />}
      {kind === "negative" && (
        <>
          <circle cx="100" cy="100" r={zone} className={s.skinStim} />
          {[0, 60, 120, 180, 240, 300].map((a) => {
            const t = (a * Math.PI) / 180;
            return <line key={a} x1={100 + 10 * Math.cos(t)} y1={100 + 10 * Math.sin(t)} x2={100 + 40 * Math.cos(t)} y2={100 + 40 * Math.sin(t)} className={s.skinFrac} />;
          })}
        </>
      )}
      {[20, 80, 140, 200, 260, 320].map((a) => {
        const t = (a * Math.PI) / 180;
        return <path key={a} d={`M${100 + 86 * Math.cos(t)},${100 + 86 * Math.sin(t)} L${100 + 16 * Math.cos(t)},${100 + 16 * Math.sin(t)}`} className={kind === "positive" ? s.flowThin : s.flowThick} markerEnd={`url(#${mk})`} />;
      })}
      <circle cx="100" cy="100" r="8" className={s.wellbore} />
    </svg>
  );
}

const SKIN_ITEMS = [
    { kind: "positive" as const, k: "Positive Skin · s > 0", t: "추가 유동 저항", d: "시추·완결 중 손상된 유정 주변 구간(투과도 감소)이 추가 압력강하를 만듭니다." },
    { kind: "zero" as const, k: "Zero Skin · s = 0", t: "이상적인 기준 상태", d: "유정 주변 투과도가 저류층과 같아, 추가 압력강하가 없습니다." },
    { kind: "negative" as const, k: "Negative Skin · s < 0", t: "유동 개선 효과", d: "산처리·수압파쇄 등으로 유정 주변 유동이 개선되어 압력강하가 줄어듭니다." },
];

/** The three skin states side by side (plan views) */
export function Skin() {
  const items = SKIN_ITEMS;
  return (
    <ul className={s.skinRow}>
      {items.map((it) => (
        <li key={it.kind} className={s.skinItem} data-kind={it.kind}>
          <SkinView kind={it.kind} />
          <span className={s.skinKey}>{it.k}</span>
          <h4 className={s.skinTitle}>{it.t}</h4>
          <p className={s.pSmall}>{it.d}</p>
        </li>
      ))}
    </ul>
  );
}

/* ───────────── Interactive Pressure Drawdown Explorer ───────────── */

const FIXED = { q: 500, B: 1.2, mu: 2, h: 50, re: 1000, rw: 0.35 };
const INIT = { logk: 2, s: 2 };
/** Input ranges: k 10–1000 mD; s −4 … +10, which keeps ln(re/rw) − 3/4 + s > 0 (≈ 3.2 at s = −4) */
const LOGK_MIN = 1, LOGK_MAX = 3, S_MIN = -4, S_MAX = 10;
const BAR_MAX = 6000;

export function drawdown(k: number, skin: number) {
  const c = (141.2 * FIXED.q * FIXED.B * FIXED.mu) / (k * FIXED.h);
  const geo = Math.log(FIXED.re / FIXED.rw) - 0.75;
  return { c, ideal: c * geo, skin: c * skin, total: c * (geo + skin) };
}

const fmt = (v: number) => Math.round(v).toLocaleString("en-US");

export function DrawdownExplorer() {
  const [logk, setLogk] = useState(INIT.logk);
  const [skin, setSkin] = useState(INIT.s);
  const id = useId();
  const k = 10 ** logk;
  const kShown = k >= 100 ? Math.round(k / 5) * 5 : k >= 20 ? Math.round(k) : Math.round(k * 10) / 10;
  const r = drawdown(kShown, skin);
  const pct = (v: number) => `${Math.max(0, Math.min(100, (v / BAR_MAX) * 100))}%`;
  const changed = logk !== INIT.logk || skin !== INIT.s;
  const skinKind: SkinKind = skin > 0 ? "positive" : skin < 0 ? "negative" : "zero";
  const skinItem = SKIN_ITEMS.find((x) => x.kind === skinKind)!;
  return (
    <div className={s.explorer}>
      <div className={s.explorerHead}>
        <h3 className={s.asideTitle}>Pressure Drawdown Explorer</h3>
        <button type="button" className={s.reset} onClick={() => { setLogk(INIT.logk); setSkin(INIT.s); }} disabled={!changed}>
          <RotateCcw size={14} aria-hidden /> Reset
        </button>
      </div>

      <div className={s.explorerGrid}>
        <div className={s.controls}>
          <label className={s.slider} htmlFor={`${id}-k`}>
            <span className={s.sliderHead}><span>Permeability <i>k</i></span><b>{kShown.toLocaleString("en-US")} mD</b></span>
            <input id={`${id}-k`} type="range" min={LOGK_MIN} max={LOGK_MAX} step={0.01} value={logk} onChange={(e) => setLogk(Number(e.target.value))} aria-valuetext={`${kShown} millidarcies`} />
            <span className={s.sliderScale}><span>10</span><span>100</span><span>1,000 mD</span></span>
          </label>
          <label className={s.slider} htmlFor={`${id}-s`}>
            <span className={s.sliderHead}><span>Skin factor <i>s</i></span><b>{skin > 0 ? "+" : ""}{skin}</b></span>
            <input id={`${id}-s`} type="range" min={S_MIN} max={S_MAX} step={0.5} value={skin} onChange={(e) => setSkin(Number(e.target.value))} aria-valuetext={`skin ${skin}`} />
            <span className={s.sliderScale}><span>−4</span><span>0</span><span>+10</span></span>
          </label>
          <div className={s.skinNow}>
            <SkinView kind={skinKind} uid="-now" />
            <div>
              <span className={s.miniHead}>{skinItem.k}</span>
              <p className={s.pSmall}>{skinItem.t} — {skinItem.d}</p>
            </div>
          </div>
          <dl className={s.fixed}>
            <div><dt>q</dt><dd>500 STB/day</dd></div>
            <div><dt>B</dt><dd>1.2 RB/STB</dd></div>
            <div><dt>μ</dt><dd>2 cP</dd></div>
            <div><dt>h</dt><dd>50 ft</dd></div>
            <div><dt>r<sub>e</sub></dt><dd>1,000 ft</dd></div>
            <div><dt>r<sub>w</sub></dt><dd>0.35 ft</dd></div>
          </dl>
        </div>

        <div className={s.result} aria-live="polite">
          <span className={s.resultKey}>Pressure drawdown · P<sub>r</sub> − P<sub>wf</sub></span>
          <span className={s.resultValue}>{fmt(r.total)} <small>psi</small></span>
          <div className={s.bar} role="img" aria-label={`Drawdown ${fmt(r.total)} psi: ${fmt(r.ideal)} psi without skin and ${fmt(r.skin)} psi due to skin`}>
            <span className={s.barIdeal} style={{ width: pct(Math.min(r.ideal, r.total)) }} />
            {r.skin > 0
              ? <span className={s.barSkin} style={{ left: pct(r.ideal), width: pct(r.skin) }} />
              : <span className={s.barGain} style={{ left: pct(r.total), width: pct(-r.skin) }} />}
          </div>
          <div className={s.barScale}><span>0</span><span>2,000</span><span>4,000</span><span>6,000 psi</span></div>
          <dl className={s.breakdown}>
            <div><dt><i className={s.lgIdeal} />Without skin (s = 0)</dt><dd>{fmt(r.ideal)} psi</dd></div>
            <div><dt><i className={r.skin >= 0 ? s.lgSkin : s.lgGain} />Skin contribution</dt><dd>{r.skin >= 0 ? "+" : "−"}{fmt(Math.abs(r.skin))} psi</dd></div>
            <div><dt>141.2 qBμ / kh</dt><dd>{r.c.toFixed(1)} psi</dd></div>
          </dl>
        </div>
      </div>
      <p className={s.note}>
        교육용 단순화 모델: 단상 원유, 원형 배수영역의 의사정상상태(pseudo-steady-state) 방사상 유동, 유전 단위계. q를 고정하고 k와 s만 바꿉니다. 실제로 P<sub>wf</sub>가 기포점 아래로 내려가면 단상 가정이 성립하지 않으며, 계산된 압력강하가 평균 저류층 압력보다 크면 해당 생산량은 유지될 수 없습니다.
      </p>
    </div>
  );
}
