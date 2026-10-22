import type { ReactNode } from "react";
import { SectionHeading, topicStyles as t } from "../TopicParts";
import s from "./Fundamentals.module.css";

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

/**
 * One numbered section of topic 3.2: heading + short Korean summary, then the section's own layout.
 * `layout` only changes the head arrangement ("split": title left / summary right, "center": stacked and
 * centred); each section arranges its body to suit its content.
 */
export function SectionShell({ id, num, title, summary, white, layout = "split", children }: {
  id: string;
  num: string;
  title: string;
  summary: ReactNode;
  white?: boolean;
  layout?: "split" | "center";
  children: ReactNode;
}) {
  return (
    <section id={id} className={cx(t.section, white && t.white, s.anchor)} data-section={id}>
      <div className={t.inner}>
        <div className={layout === "center" ? s.headCenter : s.head} data-reveal="up">
          <SectionHeading num={num}>{title}</SectionHeading>
          <p className={s.summaryText}>{summary}</p>
        </div>
        {children}
      </div>
    </section>
  );
}
