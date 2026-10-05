"use client";
import { useState } from "react";
import { TechViz } from "@/components/ds/TechViz";
import { Scene, SceneHead, sceneStyles as ss } from "@/components/site/scene";
import { getStage } from "@/lib/stages";
import s from "./Scenes.module.css";

/** Same field, different property: each toggle swaps the colour-mapped map and its scale. */
const PROPS = [
  { name: "Porosity", seed: 3, min: "5%", max: "30%" },
  { name: "Permeability", seed: 14, min: "0.1 mD", max: "2,000 mD" },
  { name: "Saturation", seed: 27, min: "0%", max: "85%" },
];

export function ReservoirScene() {
  const st = getStage("reservoir");
  const [p, setP] = useState(0);
  const prop = PROPS[p];
  return (
    <Scene stage={st}>
      <div className={ss.wrap}>
        <div className={s.text}>
          <SceneHead stage={st}>
            <div className={s.chips} role="group" aria-label="Reservoir property">
              {PROPS.map((x, i) => (
                <button key={x.name} type="button" aria-pressed={p === i} onClick={() => setP(i)} className={p === i ? `${s.chip} ${s.chipOn}` : s.chip}>
                  {x.name}
                </button>
              ))}
            </div>
          </SceneHead>
        </div>
        <div className={s.visual} style={{ height: 640 }}>
          <TechViz kind="reservoir" seed={prop.seed} label={`Reservoir ${prop.name.toLowerCase()} map`} />
          <div className={`${s.scale} ${s.propScale}`}>
            <span>{prop.min}</span>
            <span className={s.scaleBar} style={{ width: 180, background: "linear-gradient(90deg,var(--viz-1),var(--viz-2),var(--viz-3),var(--viz-4),var(--viz-5),var(--viz-6),var(--viz-7))" }} />
            <span>{prop.max}</span>
            <span className={s.propName}>{prop.name}</span>
          </div>
        </div>
      </div>
    </Scene>
  );
}
