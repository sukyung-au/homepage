import s from "./Callout.module.css";

export interface CalloutProps {
  /** Anchor position inside the positioned visual, e.g. "40%" */
  x: string;
  y: string;
  label: string;
  sub?: string;
  side?: "left" | "right";
  dark?: boolean;
}

/** Pin + leader + label annotating a point on a visual. */
export function Callout({ x, y, label, sub, side = "right", dark }: CalloutProps) {
  const cls = [s.callout, side === "left" && s.left, dark && s.dark].filter(Boolean).join(" ");
  return (
    <div className={cls} style={{ left: x, top: y }}>
      <span className={s.dot} />
      <span className={s.leader} />
      <span className={s.tag}>
        {label}
        {sub && <span className={s.sub}>{sub}</span>}
      </span>
    </div>
  );
}
