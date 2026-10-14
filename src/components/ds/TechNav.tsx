"use client";
import { useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
import { FLAT_TOPICS, categoryHref, type TechCategory } from "@/lib/technology";
import s from "./TechNav.module.css";

export interface TechNavProps {
  categories: TechCategory[];
  /** id of the current category */
  category: string;
  /** id of the topic currently being read; omit on a category overview page */
  topic?: string;
  position?: "fixed" | "relative";
  style?: CSSProperties;
}

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

/**
 * Slim floating rail for the Technology section — identical in look and behaviour to the Journey StageNav:
 * every category (from lib/technology.ts) in one row, the current one in blue with a thin indicator; each links
 * to its overview, where the category's topics are listed. On narrow screens the row scrolls and keeps the
 * current category in view.
 */
export function TechNav({ categories, category, topic, position = "fixed", style }: TechNavProps) {
  const curT = topic ? FLAT_TOPICS.find((t) => t.id === topic) : undefined;
  const current = Math.max(0, categories.findIndex((c) => c.id === (curT?.category.id ?? category)));
  const rail = useRef<HTMLDivElement>(null);

  // Keep the current category visible when the rail scrolls (narrow screens) — horizontal only.
  useEffect(() => {
    const el = rail.current, item = el?.children[current] as HTMLElement | undefined;
    if (!el || !item || el.scrollWidth <= el.clientWidth) return;
    el.scrollLeft = item.offsetLeft - (el.clientWidth - item.offsetWidth) / 2;
  }, [current]);

  return (
    <nav aria-label="Technology categories" className={cx(s.nav, position === "fixed" && s.fixed)} style={style}>
      <div ref={rail} className={s.rail}>
        {categories.map((c, i) => {
          const on = i === current;
          return (
            <Link key={c.id} href={categoryHref(c)} className={cx(s.item, on && s.on)} aria-current={on ? (curT ? "true" : "page") : undefined} title={`${c.label} · ${c.topics.length} ${c.topics.length === 1 ? "topic" : "topics"}`}>
              <span className={s.num}>{c.num}</span>
              <span className={s.label}>{c.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
