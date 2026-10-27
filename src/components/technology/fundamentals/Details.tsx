import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import s from "./Fundamentals.module.css";

/** Collapsed-by-default disclosure for supporting material (tables, procedures, extra formulas). Native
 *  <details>: keyboard and screen-reader state come for free. */
export function Details({ summary, children }: { summary: string; children: ReactNode }) {
  return (
    <details className={s.details}>
      <summary className={s.summary}>
        <span>{summary}</span>
        <ChevronDown size={16} aria-hidden className={s.summaryIcon} />
      </summary>
      <div className={s.detailsBody}>{children}</div>
    </details>
  );
}
