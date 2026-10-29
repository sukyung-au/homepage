"use client";
import { useState } from "react";
import { Choice } from "../fundamentals/Choice";
import f from "../fundamentals/Fundamentals.module.css";
import g from "../gpfund/GpFund.module.css";
import s from "./Res.module.css";

/**
 * Topic 1.3, section 03: conceptual CSEM response against source–receiver offset, on a log-amplitude axis in
 * normalized units. Shapes follow the qualitative behaviour in Constable (2010); not any real survey.
 */

type Id = "brine" | "reservoir" | "shallow";
const CASES: { id: Id; label: string; title: string; body: string }[] = [
  { id: "brine", label: "No reservoir", title: "Background Decay", body: "전기가 잘 통하는 해수와 퇴적층을 지나며 전자기장은 빠르게 감쇠합니다. 송신원에서 멀어질수록 수신기에 도달하는 신호가 꾸준히 약해집니다." },
  { id: "reservoir", label: "Resistive reservoir", title: "A Stronger Signal at Long Offsets", body: "탄화수소로 채워진 비저항이 높은 층이 있으면 전자기 신호가 그 층을 따라 적게 감쇠하며 전파된 뒤 다시 해저로 올라옵니다. 그래서 먼 수신기일수록 저류층이 없을 때보다 진폭이 커집니다." },
  { id: "shallow", label: "Shallow water", title: "The Airwave Problem", body: "수심이 얕으면 송신원에서 대기로 빠져나가 거의 감쇠 없이 퍼진 에너지(airwave)가 먼 수신기의 신호를 지배합니다. 저류층 신호가 묻혀 차이가 작아지므로, 심해에서 CSEM이 더 효과적입니다." },
];

const X = (o: number) => 56 + o * 480;
const Y = (a: number) => 286 - a * 250;
const bg = (o: number) => 1 - o;
const res = (o: number) => bg(o) + 0.24 / (1 + Math.exp(-(o - 0.42) * 12));
const AIR = 0.5;
const withAir = (a: number) => Math.log10(10 ** (3 * a) + 10 ** (3 * AIR)) / 3;

function points(fn: (o: number) => number) {
  return Array.from({ length: 61 }, (_, i) => {
    const o = 0.04 + (0.92 * i) / 60;
    return `${X(o).toFixed(1)},${Y(fn(o)).toFixed(1)}`;
  });
}
const path = (fn: (o: number) => number) => "M" + points(fn).join(" L");
const band = (top: (o: number) => number, base: (o: number) => number) =>
  "M" + [...points(top), ...points(base).reverse()].join(" L") + " Z";

export function CsemExplorer() {
  const [id, setId] = useState<Id>("reservoir");
  const c = CASES.find((x) => x.id === id)!;
  const air = id === "shallow";
  const b = air ? (o: number) => withAir(bg(o)) : bg;
  const r = air ? (o: number) => withAir(res(o)) : res;
  return (
    <div>
      <Choice idBase="csem" label="CSEM response scenario" value={id} onChange={setId} options={CASES.map((x) => ({ id: x.id, label: x.label }))} />
      <div id="csem-panel" role="tabpanel" aria-labelledby={`csem-tab-${id}`} className={g.explorer}>
        <figure className={g.fig}>
          <svg viewBox="0 0 560 330" className={f.graph} role="img" aria-label={`${c.label}: conceptual CSEM amplitude against source–receiver offset`}>
            <path d="M56,16 V286 H548" className={f.gAxis} />
            {id !== "brine" && <path d={band(r, b)} className={s.gap} />}
            <path d={path(b)} className={id === "brine" ? s.bgLine : s.bgGhost} />
            {id !== "brine" && <path d={path(r)} className={s.resLine} />}
            {air && <path d={`M56,${Y(AIR)} H548`} className={f.gGuide} />}
            {air && <text x="544" y={Y(AIR) + 16} className={f.gTiny} textAnchor="end">Airwave level</text>}
            <text x="548" y="312" className={f.gAxisLabel} textAnchor="end">Source–receiver offset →</text>
            <text x="38" y="16" className={f.gAxisLabel} transform="rotate(-90 38 16)" textAnchor="end">Field amplitude (log) →</text>
          </svg>
          <div className={s.legend}>
            <span><i className={id === "brine" ? s.lgBg : s.lgGhost} />No reservoir</span>
            {id !== "brine" && <span><i className={s.lgRes} />With resistive reservoir</span>}
          </div>
          <figcaption className={g.caption}>Conceptual CSEM response · shapes only, no values</figcaption>
        </figure>
        <div className={g.panelText}>
          <h3 className={g.panelTitle}>{c.title}</h3>
          <p className={f.p}>{c.body}</p>
        </div>
      </div>
    </div>
  );
}
