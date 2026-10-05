import type { CSSProperties } from "react";
import s from "./DepthRuler.module.css";

export interface DepthRulerProps {
  marks?: string[];
  tone?: "light" | "dark";
  label?: string;
  style?: CSSProperties;
}

/** Thin vertical depth gauge at the edge of journey visuals — anchors every scene to a depth. */
export function DepthRuler({ marks = ["0 m", "1,000", "2,000", "3,000 m"], tone = "light", label = "Depth", style }: DepthRulerProps) {
  return (
    <div className={tone === "dark" ? `${s.ruler} ${s.dark}` : s.ruler} style={style}>
      <span className={s.label}>{label}</span>
      <div className={s.track}>
        <span className={s.axis} />
        {marks.map((m) => (
          <span key={m} className={s.mark}><span className={s.tick} /><span className={s.value}>{m}</span></span>
        ))}
      </div>
      <span className={s.end} />
    </div>
  );
}
