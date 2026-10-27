"use client";
import { useId, useState } from "react";
import s from "./Fundamentals.module.css";

/** 05 — Multiphase flow. The relative-permeability curves are a conceptual Corey-type model, not measured data. */

export function PoreDiagram() {
  const grains: [number, number, number][] = [[40, 40, 52], [230, 34, 48], [26, 196, 50], [236, 200, 54], [134, 252, 34], [140, -18, 30]];
  return (
    <svg viewBox="0 0 270 240" className={`${s.graph} ${s.clip}`} role="img" aria-label="Magnified pore: water coats the grain surfaces, oil occupies the pore centre and a gas bubble sits in the largest space">
      <rect width="270" height="240" className={s.poreSpace} />
      {grains.map(([x, y, r]) => <circle key={`${x}-${y}`} cx={x} cy={y} r={r + 7} className={s.waterFilm} />)}
      {grains.map(([x, y, r]) => <circle key={`g${x}-${y}`} cx={x} cy={y} r={r} className={s.grain} />)}
      <path d="M92,92 C120,70 170,78 186,104 C206,134 180,170 140,172 C100,174 76,140 92,92 Z" className={s.oilBlob} />
      <circle cx="160" cy="118" r="17" className={s.gasBubble} />
      <text x="112" y="150" className={s.gTiny}>Oil</text>
      <text x="152" y="122" className={s.gTiny}>Gas</text>
      <text x="196" y="96" className={s.gTiny}>Water film</text>
      <text x="16" y="120" className={s.gTiny}>Grain</text>
    </svg>
  );
}

export function CapillaryTubes() {
  return (
    <svg viewBox="0 0 270 200" className={s.graph} role="img" aria-label="Capillary rise in a water-wet system: the narrower tube shows the higher rise, meaning higher capillary pressure">
      <rect x="10" y="150" width="250" height="40" className={s.waterBath} />
      <rect x="60" y="80" width="40" height="100" className={s.tube} />
      <rect x="66" y="120" width="28" height="60" className={s.waterCol} />
      <path d="M66,120 Q80,110 94,120" className={s.meniscus} />
      <rect x="170" y="30" width="16" height="150" className={s.tube} />
      <rect x="173" y="56" width="10" height="124" className={s.waterCol} />
      <path d="M173,56 Q178,48 183,56" className={s.meniscus} />
      <text x="80" y="72" className={s.gTiny} textAnchor="middle">large r</text>
      <text x="178" y="22" className={s.gTiny} textAnchor="middle">small r</text>
      <text x="110" y="128" className={s.gTiny}>low rise</text>
      <text x="194" y="64" className={s.gTiny}>high rise</text>
    </svg>
  );
}

const PC_MATH = `<math display="block" aria-label="P c equals P non-wetting minus P wetting equals 2 sigma cos theta over r"><mrow><msub><mi>P</mi><mi>c</mi></msub><mo>=</mo><msub><mi>P</mi><mtext>non-wetting</mtext></msub><mo>−</mo><msub><mi>P</mi><mtext>wetting</mtext></msub><mo>=</mo><mfrac><mrow><mn>2</mn><mi>σ</mi><mo>&#8290;</mo><mi>cos</mi><mo>&#8289;</mo><mi>θ</mi></mrow><mi>r</mi></mfrac></mrow></math>`;
const SAT_MATH = `<math display="block" aria-label="S w plus S o plus S g equals 1"><mrow><msub><mi>S</mi><mi>w</mi></msub><mo>+</mo><msub><mi>S</mi><mi>o</mi></msub><mo>+</mo><msub><mi>S</mi><mi>g</mi></msub><mo>=</mo><mn>1</mn></mrow></math>`;

export function SatFormula() {
  return <div className={s.math} dangerouslySetInnerHTML={{ __html: SAT_MATH }} />;
}
export function PcFormula() {
  return <div className={s.mathSmall} dangerouslySetInnerHTML={{ __html: PC_MATH }} />;
}

/* Conceptual Corey model (oil–water, water-wet) */
const SWC = 0.2, SOR = 0.25, KRW_MAX = 0.3, KRO_MAX = 0.8, NW = 3, NO = 2;
const MU_O = 2, MU_W = 0.5;
const norm = (sw: number) => Math.min(1, Math.max(0, (sw - SWC) / (1 - SWC - SOR)));
export const krw = (sw: number) => KRW_MAX * norm(sw) ** NW;
export const kro = (sw: number) => KRO_MAX * (1 - norm(sw)) ** NO;
/** Fractional flow of water (horizontal flow, no capillary or gravity terms) */
export const fw = (sw: number) => { const w = krw(sw) / MU_W, o = kro(sw) / MU_O; return w + o > 0 ? w / (w + o) : 0; };

const GX0 = 52, GX1 = 560, GY0 = 18, GY1 = 236;
const gx = (sw: number) => GX0 + (GX1 - GX0) * sw;
const gy = (v: number) => GY1 - (GY1 - GY0) * v;
const curve = (f: (sw: number) => number) =>
  Array.from({ length: 101 }, (_, i) => SWC + ((1 - SOR - SWC) * i) / 100).map((sw, i) => `${i ? "L" : "M"}${gx(sw).toFixed(1)},${gy(f(sw)).toFixed(1)}`).join("");

export function RelPerm() {
  const [sw, setSw] = useState(0.45);
  const id = useId();
  return (
    <div className={s.mainGrid}>
      <figure className={s.figure}>
        <svg viewBox="0 0 600 280" className={s.graph} role="img" aria-label="Conceptual relative permeability curves: oil relative permeability falls and water relative permeability rises as water saturation increases between connate water saturation and one minus residual oil saturation">
          <path d={`M${GX0},${GY0 - 6} L${GX0},${GY1} L${GX1 + 6},${GY1}`} className={s.gAxis} />
          {[0, 0.2, 0.4, 0.6, 0.8, 1].map((v) => (
            <g key={v}>
              <line x1={gx(v)} y1={GY1} x2={gx(v)} y2={GY1 + 4} className={s.gAxis} />
              <text x={gx(v)} y={GY1 + 16} className={s.gTiny} textAnchor="middle">{v}</text>
              <line x1={GX0 - 4} y1={gy(v)} x2={GX0} y2={gy(v)} className={s.gAxis} />
              <text x={GX0 - 8} y={gy(v) + 3} className={s.gTiny} textAnchor="end">{v}</text>
            </g>
          ))}
          <line x1={gx(SWC)} y1={GY0} x2={gx(SWC)} y2={GY1} className={s.gGuide} />
          <line x1={gx(1 - SOR)} y1={GY0} x2={gx(1 - SOR)} y2={GY1} className={s.gGuide} />
          <text x={gx(SWC) + 4} y={GY0 + 8} className={s.gTiny}>S<tspan baselineShift="sub" fontSize="8">wc</tspan></text>
          <text x={gx(1 - SOR) + 4} y={GY0 + 8} className={s.gTiny}>1 − S<tspan baselineShift="sub" fontSize="8">or</tspan></text>
          <path d={curve(kro)} className={s.gKro} />
          <path d={curve(krw)} className={s.gKrw} />
          <line x1={gx(sw)} y1={GY0} x2={gx(sw)} y2={GY1} className={s.gCursor} />
          <circle cx={gx(sw)} cy={gy(kro(sw))} r="4.5" className={s.gKroDot} />
          <circle cx={gx(sw)} cy={gy(krw(sw))} r="4.5" className={s.gKrwDot} />
          <text x={gx(0.27)} y={gy(0.7)} className={s.gLabelOil}>k<tspan baselineShift="sub" fontSize="9">ro</tspan></text>
          <text x={gx(0.7)} y={gy(0.24)} className={s.gLabelWater}>k<tspan baselineShift="sub" fontSize="9">rw</tspan></text>
          <text x={GX1} y={GY1 + 34} className={s.gAxisLabel} textAnchor="end">Water saturation S<tspan baselineShift="sub" fontSize="8">w</tspan> (fraction) →</text>
          <text x={GX0 - 34} y={GY0 + 4} className={s.gAxisLabel} textAnchor="end" transform={`rotate(-90 ${GX0 - 34} ${GY0 + 4})`}>Relative permeability kr →</text>
        </svg>
        <div className={s.legend}>
          <span><i className={s.lgKro} />Oil, k<sub>ro</sub></span>
          <span><i className={s.lgKrw} />Water, k<sub>rw</sub></span>
        </div>
        <figcaption className={s.caption}>Conceptual Corey-type curves (S<sub>wc</sub> 0.2, S<sub>or</sub> 0.25, water-wet) · illustrative, not measured</figcaption>
      </figure>
      <div className={s.aside}>
        <h3 className={s.asideTitle}>Relative Permeability</h3>
        <p className={s.lead}>여러 유체가 함께 흐를 때 각 유체의 유동 능력을 절대투과도에 대한 비율(k<sub>r</sub>)로 나타냅니다. 물 포화도가 높아질수록 k<sub>rw</sub>는 커지고 k<sub>ro</sub>는 줄어듭니다.</p>
        <label className={s.slider} htmlFor={`${id}-sw`}>
          <span className={s.sliderHead}><span>Water saturation S<sub>w</sub></span><b>{sw.toFixed(2)}</b></span>
          <input id={`${id}-sw`} type="range" min={SWC} max={1 - SOR} step={0.01} value={sw} onChange={(e) => setSw(Number(e.target.value))} />
        </label>
        <dl className={s.readout} aria-live="polite">
          <div><dt>k<sub>ro</sub></dt><dd>{kro(sw).toFixed(2)}</dd></div>
          <div><dt>k<sub>rw</sub></dt><dd>{krw(sw).toFixed(2)}</dd></div>
          <div><dt>f<sub>w</sub> (fractional flow)</dt><dd>{Math.round(fw(sw) * 100)}%</dd></div>
        </dl>
        <p className={s.p}>k<sub>rw</sub>가 커질수록 생산 유체 중 물의 비율이 늘어나, 생산 단계에서 water cut이 증가하는 원인이 됩니다.</p>
        <div className={s.assume}>
          <span className={s.assumeHead}>Assumptions behind f<sub>w</sub></span>
          <p className={s.pSmall}>
            f<sub>w</sub> = (k<sub>rw</sub>/μ<sub>w</sub>) / (k<sub>rw</sub>/μ<sub>w</sub> + k<sub>ro</sub>/μ<sub>o</sub>) — 수평 1차원 유동, 물·석유 2상, 모세관압과 중력 무시, μ<sub>o</sub> 2 cP · μ<sub>w</sub> 0.5 cP(예시값), 위의 개념 곡선을 가정한 저류층 조건의 물 분율입니다. 지상에서 측정하는 water cut은 체적계수 등에 따라 달라지므로, 이 값은 개념 비교용입니다.
          </p>
        </div>
      </div>
    </div>
  );
}
