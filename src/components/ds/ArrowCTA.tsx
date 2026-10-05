import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import s from "./ArrowCTA.module.css";

const ICONS = { right: ArrowRight, down: ArrowDown, "up-right": ArrowUpRight };

export interface ArrowCTAProps {
  children?: ReactNode;
  /** Destination. Without one the CTA renders as an inert (not-yet-available) button. */
  href?: string;
  tone?: "navy" | "blue" | "white";
  direction?: keyof typeof ICONS;
  title?: string;
  style?: CSSProperties;
}

/** Editorial call-to-action: 48px filled circle with arrow + label. Journey-level actions (Explore, Continue, Descend). */
export function ArrowCTA({ children = "Explore the Journey", href, tone = "navy", direction = "right", title, style }: ArrowCTAProps) {
  const Icon = ICONS[direction];
  const cls = [s.cta, tone === "blue" && s.blue, tone === "white" && s.white, !href && s.disabled].filter(Boolean).join(" ");
  const body = (
    <>
      <span className={s.disc}><Icon size={18} aria-hidden /></span>
      {children}
    </>
  );
  return href ? (
    <Link href={href} className={cls} style={style} title={title}>{body}</Link>
  ) : (
    <button type="button" className={cls} style={style} title={title} aria-disabled>{body}</button>
  );
}
