"use client";
import { useRef, type KeyboardEvent } from "react";
import s from "./Fundamentals.module.css";

export interface ChoiceOption<T extends string> {
  id: T;
  label: string;
  /** Small second line (e.g. a number) */
  sub?: string;
}

/**
 * Accessible tab strip (role="tablist"): click, or ←/→/Home/End when focused (roving tabindex).
 * The panel it controls is rendered by the caller with id `${idBase}-panel`.
 */
export function Choice<T extends string>({ options, value, onChange, label, idBase, variant = "tabs" }: {
  options: ChoiceOption<T>[];
  value: T;
  onChange: (v: T) => void;
  label: string;
  idBase: string;
  variant?: "tabs" | "list";
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: KeyboardEvent, i: number) => {
    const n = options.length;
    const j = e.key === "ArrowRight" || e.key === "ArrowDown" ? (i + 1) % n
      : e.key === "ArrowLeft" || e.key === "ArrowUp" ? (i - 1 + n) % n
      : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (j < 0) return;
    e.preventDefault();
    onChange(options[j].id);
    refs.current[j]?.focus();
  };
  return (
    <div role="tablist" aria-label={label} className={variant === "list" ? s.choiceList : s.choice}>
      {options.map((o, i) => {
        const on = o.id === value;
        return (
          <button
            key={o.id}
            ref={(el) => { refs.current[i] = el; }}
            type="button"
            role="tab"
            id={`${idBase}-tab-${o.id}`}
            aria-selected={on}
            aria-controls={`${idBase}-panel`}
            tabIndex={on ? 0 : -1}
            className={s.choiceBtn}
            data-on={on || undefined}
            onClick={() => onChange(o.id)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {o.sub && <span className={s.choiceSub}>{o.sub}</span>}
            <span>{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}
