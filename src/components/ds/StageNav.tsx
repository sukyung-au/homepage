"use client";
import { useEffect, useRef, type CSSProperties } from "react";
import s from "./StageNav.module.css";

export interface StageNavItem {
  id: string;
  num: string;
  label: string;
}

export interface StageNavProps {
  stages: StageNavItem[];
  /** Index of the current stage */
  current?: number;
  onSelect?: (index: number) => void;
  /** 'fixed' on pages (floating above the bottom edge); 'relative' in previews */
  position?: "fixed" | "relative";
  style?: CSSProperties;
}

/**
 * Slim floating rail showing every journey stage in one row. The current stage is marked with blue
 * text and a thin blue indicator line. On narrow screens the rail scrolls horizontally and keeps the
 * current stage in view.
 */
export function StageNav({ stages, current = 0, onSelect, position = "fixed", style }: StageNavProps) {
  const rail = useRef<HTMLDivElement>(null);

  // Keep the current stage visible when the rail is scrollable (mobile) — horizontal only.
  useEffect(() => {
    const el = rail.current;
    const item = el?.children[current] as HTMLElement | undefined;
    if (!el || !item || el.scrollWidth <= el.clientWidth) return;
    el.scrollTo({ left: item.offsetLeft - (el.clientWidth - item.offsetWidth) / 2, behavior: "smooth" });
  }, [current]);

  return (
    <nav aria-label="Development stages" className={position === "fixed" ? `${s.nav} ${s.fixed}` : s.nav} style={style}>
      <div ref={rail} className={s.rail} data-journey-nav>
        {stages.map((st, i) => {
          const on = i === current;
          return (
            <button
              key={st.id}
              type="button"
              className={on ? `${s.item} ${s.on}` : s.item}
              onClick={() => onSelect?.(i)}
              aria-current={on ? "step" : undefined}
            >
              <span className={s.num}>{st.num}</span>
              <span className={s.label}>{st.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
