"use client";
import { useState } from "react";
import { Choice } from "../fundamentals/Choice";
import f from "../fundamentals/Fundamentals.module.css";
import { X, Y, iprPath, operatingPoint, vlpPath } from "./nodalModel";
import n from "./Nodal.module.css";

/** Topic 3.5, section 05: how the operating point moves. Conceptual curves from nodalModel.ts, no values. */

type Id = "base" | "choke" | "depleted" | "lift";
const BASE = { pr: 0.9, pwh: 0.32, lift: 0 };
const CASES: { id: Id; label: string; pr: number; pwh: number; lift: number; title: string; body: string }[] = [
  { id: "base", label: "Natural Flow", ...BASE, title: "Two Curves, One Rate", body: "저류층이 내보낼 수 있는 양(IPR)과 생산관이 들어 올릴 수 있는 양(VLP)이 만나는 점에서 유정의 생산량과 바닥 압력이 정해집니다. 두 곡선의 기울기가 서로 반대인 오른쪽 교점이 안정적인 자연 생산 지점입니다." },
  { id: "choke", label: "Higher Wellhead Pressure", pr: 0.9, pwh: 0.4, lift: 0, title: "Choking Back the Well", body: "초크로 유정을 조이면 유정 상부 압력이 올라가 VLP 곡선이 위로 이동하고, 교점이 왼쪽 — 더 적은 생산량 — 으로 옮겨 갑니다." },
  { id: "depleted", label: "Reservoir Depletion", pr: 0.6, pwh: 0.32, lift: 0, title: "When the Curves Stop Meeting", body: "생산이 계속되어 저류층 압력이 내려가면 IPR 곡선이 아래로 줄어듭니다. 두 곡선이 더 이상 만나지 않으면, 저류층 압력만으로는 유체를 지표까지 올릴 수 없어 자연 생산이 멈춥니다." },
  { id: "lift", label: "With Artificial Lift", pr: 0.6, pwh: 0.32, lift: 0.25, title: "Adding Energy in the Well", body: "펌프가 압력을 더하거나 가스 리프트가 유체 기둥을 가볍게 하면, 같은 생산량에 필요한 바닥 압력이 낮아져 VLP 곡선이 아래로 내려옵니다. 두 곡선이 다시 만나 생산이 이어집니다." },
];

export function NodalExplorer() {
  const [id, setId] = useState<Id>("base");
  const c = CASES.find((x) => x.id === id)!;
  const op = operatingPoint(c.pr, c.pwh, c.lift);
  const ghost = id !== "base";
  return (
    <div>
      <Choice idBase="nodal" label="Operating point scenario" value={id} onChange={setId} options={CASES.map((x) => ({ id: x.id, label: x.label }))} />
      <div id="nodal-panel" role="tabpanel" aria-labelledby={`nodal-tab-${id}`} className={n.explorer}>
        <figure className={n.fig}>
          <svg viewBox="0 0 560 330" className={f.graph} role="img" aria-label={`${c.label}: conceptual IPR and VLP curves${op ? " meeting at an operating point" : " that do not meet"}`}>
            <path d="M56,16 V286 H548" className={f.gAxis} />
            {ghost && <path d={iprPath(BASE.pr)} className={n.ghost} />}
            {ghost && <path d={vlpPath(BASE.pwh)} className={n.ghost} />}
            <path d={iprPath(c.pr)} className={n.ipr} />
            <path d={vlpPath(c.pwh, c.lift)} className={c.lift ? n.vlpLift : n.vlp} />
            {op ? (
              <g>
                <path d={`M${X(op.q)},${Y(op.p)} V286 M56,${Y(op.p)} H${X(op.q)}`} className={f.gGuide} />
                <circle cx={X(op.q)} cy={Y(op.p)} r="7" className={n.op} />
                <text x={X(op.q) + 12} y={Y(op.p) - 10} className={f.gTinyBlue}>Operating point</text>
              </g>
            ) : (
              <text x="300" y="70" className={n.warn} textAnchor="middle">No intersection — the well cannot flow naturally</text>
            )}
            <text x="548" y="312" className={f.gAxisLabel} textAnchor="end">Liquid rate →</text>
            <text x="38" y="16" className={f.gAxisLabel} transform="rotate(-90 38 16)" textAnchor="end">Flowing bottomhole pressure →</text>
          </svg>
          <div className={n.legend}>
            <span><i className={n.lgIpr} />IPR (reservoir inflow)</span>
            <span><i className={c.lift ? n.lgLift : n.lgVlp} />VLP (tubing outflow)</span>
            {ghost && <span><i className={n.lgGhost} />Natural flow case</span>}
          </div>
          <figcaption className={n.caption}>Conceptual nodal plot at the bottomhole node · shapes only, no values</figcaption>
        </figure>
        <div className={n.panelText}>
          <h3 className={n.panelTitle}>{c.title}</h3>
          <p className={f.p}>{c.body}</p>
        </div>
      </div>
    </div>
  );
}
