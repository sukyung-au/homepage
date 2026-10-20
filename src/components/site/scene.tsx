import type { CSSProperties, ReactNode } from "react";
import { sceneId, type Stage } from "@/lib/stages";
import s from "./scene.module.css";

export { s as sceneStyles };

/**
 * One full journey scene. Carries the data-* hooks for future scroll-driven motion:
 * data-stage / data-scene / data-depth / data-motion / data-transition-in / -hold / -out / data-persist.
 */
export function Scene({ stage, children, style }: { stage: Stage; children: ReactNode; style?: CSSProperties }) {
  return (
    <section
      id={sceneId(stage.id)}
      data-stage={stage.id}
      data-scene={stage.num}
      data-depth={stage.depth}
      data-motion={stage.motion}
      data-transition-in={stage.t.in}
      data-transition-hold={stage.t.hold}
      data-transition-out={stage.t.out}
      data-persist={stage.t.persist}
      aria-labelledby={`${sceneId(stage.id)}-title`}
      className={stage.dark ? `${s.scene} ${s.onDark}` : s.scene}
      style={{ background: stage.bg, ...style }}
    >
      {children}
    </section>
  );
}

/** Eyebrow line: number — rule — label */
export function Eyebrow({ num, label, extra, style }: { num?: string; label?: string; extra?: ReactNode; style?: CSSProperties }) {
  return (
    <div className={s.eyebrow} style={style}>
      {num && <span className={s.eyebrowNum}>{num}</span>}
      {num && <span className={s.eyebrowRule} />}
      {label && <span className={s.eyebrowLabel}>{label}</span>}
      {extra}
    </div>
  );
}

/**
 * Scene heading block: eyebrow, light editorial title, Korean body, then any extra content.
 * `titleEm` sets the title's line length (in em, so the breaks hold as the type scales); `body={false}`
 * leaves the Korean body out (render it elsewhere with <SceneBody>).
 */
export function SceneHead({ stage, children, titleEm, body = true }: { stage: Stage; children?: ReactNode; titleEm?: number; body?: boolean }) {
  return (
    <div className={stage.dark ? s.onDark : undefined}>
      <Eyebrow num={stage.num} label={`${stage.label} (${stage.ko})`} />
      <h2 id={`${sceneId(stage.id)}-title`} className={s.title} style={titleEm ? ({ "--title-w": `${titleEm}em` } as CSSProperties) : undefined}>{stage.title}</h2>
      {body && <SceneBody stage={stage} />}
      {children}
    </div>
  );
}

/** The stage's Korean body paragraph */
export function SceneBody({ stage, className }: { stage: Stage; className?: string }) {
  return <p className={className ? `${s.body} ${className}` : s.body}>{stage.kr}</p>;
}

/** Large figure + caption, ruled on top. */
export function Fact({ v, l, dark }: { v: string; l: string; dark?: boolean }) {
  return (
    <div className={dark ? `${s.fact} ${s.onDark}` : s.fact}>
      <span className={s.factValue}>{v}</span>
      <span className={s.factLabel}>{l}</span>
    </div>
  );
}
