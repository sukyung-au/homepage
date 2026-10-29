"use client";
import { useState } from "react";
import { Choice } from "../fundamentals/Choice";
import f from "../fundamentals/Fundamentals.module.css";
import { rc, ricker, wiggle, wiggleFill } from "./seismicModel";
import g from "./GpFund.module.css";

/** Topic 1.2, section 04: the sign of the impedance contrast sets the sign of the reflection. Normalized, no values. */

type Id = "up" | "down" | "same";
const CASES: { id: Id; label: string; z2: number; title: string; body: string }[] = [
  { id: "up", label: "Impedance increases", z2: 1.5, title: "Positive Reflection", body: "아래 지층의 임피던스가 더 크면 반사계수가 양(+)이 됩니다. 이 그림의 표시 방식에서는 경계에 오른쪽으로 채워진 피크(peak)가 나타납니다." },
  { id: "down", label: "Impedance decreases", z2: 0.65, title: "Negative Reflection", body: "아래 지층의 임피던스가 더 작으면 반사계수가 음(−)이 되어 극성이 뒤집힌 트로프(trough)가 나타납니다. 경계 양쪽의 차이가 클수록 반사 진폭도 커집니다." },
  { id: "same", label: "No contrast", z2: 1.0, title: "No Reflection", body: "암석 종류가 달라도 두 지층의 임피던스가 같으면 반사계수가 0이 되어 경계가 탄성파 자료에 보이지 않습니다. 반사는 암석의 경계가 아니라 임피던스의 경계에서 생깁니다." },
];
const Z1 = 1.0;
const WAV = Array.from({ length: 61 }, (_, k) => ricker(k - 30, 0.05));

export function PolarityExplorer() {
  const [id, setId] = useState<Id>("up");
  const c = CASES.find((x) => x.id === id)!;
  const r = rc(Z1, c.z2);
  const bar = (z: number) => z * 100;
  const trace = WAV.map((w) => w * r * 2.4);
  return (
    <div>
      <Choice idBase="polarity" label="Impedance contrast" value={id} onChange={setId} options={CASES.map((x) => ({ id: x.id, label: x.label }))} />
      <div id="polarity-panel" role="tabpanel" aria-labelledby={`polarity-tab-${id}`} className={g.explorer}>
        <figure className={g.fig}>
          <svg viewBox="0 0 560 304" className={f.graph} role="img" aria-label={`${c.label}: two layers, their acoustic impedance and the reflected wavelet at the boundary`}>
            <rect x="20" y="40" width="200" height="110" className={g.layer1} />
            <rect x="20" y="150" width="200" height="120" className={c.z2 > Z1 ? g.layer3 : c.z2 < Z1 ? g.layer4 : g.layer1} />
            <path d="M20,150 H530" className={g.interface} />
            <text x="34" y="66" className={f.gNote}>Layer 1</text>
            <text x="34" y="176" className={f.gNote}>Layer 2</text>

            <text x="300" y="26" className={f.gNote} textAnchor="middle">Impedance Z</text>
            <path d="M250,40 V270" className={g.zero} />
            <path d={`M250,40 H${250 + bar(Z1)} V150 H${250 + bar(c.z2)} V270`} className={g.zLog} />

            <text x="470" y="26" className={f.gNote} textAnchor="middle">Reflection</text>
            <path d="M470,40 V270" className={g.zero} />
            {r !== 0 && <path d={wiggleFill(trace, 470, 150 - 30 * 3.6, 3.6, 90)} className={g.fill} />}
            <path d={wiggle(trace, 470, 150 - 30 * 3.6, 3.6, 90)} className={g.trace} />
            <text x="470" y="292" className={f.gTinyBlue} textAnchor="middle">{r > 0 ? "R > 0" : r < 0 ? "R < 0" : "R = 0"}</text>
          </svg>
          <figcaption className={g.caption}>Normal incidence · conceptual, no values · polarity display conventions vary</figcaption>
        </figure>
        <div className={g.panelText}>
          <h3 className={g.panelTitle}>{c.title}</h3>
          <p className={f.p}>{c.body}</p>
        </div>
      </div>
    </div>
  );
}
