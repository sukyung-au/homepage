"use client";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FLAT_TOPICS, categoryHref, topicLink, type TechCategory } from "@/lib/technology";
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
 * Slim floating rail for the Technology section, in the Journey StageNav look: every category (from
 * lib/technology.ts) in one row, the current one in blue with a thin indicator. Clicking a category opens a
 * small menu above it with that category's topics (published ones link to their page) and its overview.
 * On narrow screens the row scrolls and keeps the current category in view; the menu spans the rail.
 */
export function TechNav({ categories, category, topic, position = "fixed", style }: TechNavProps) {
  const curT = topic ? FLAT_TOPICS.find((t) => t.id === topic) : undefined;
  const current = Math.max(0, categories.findIndex((c) => c.id === (curT?.category.id ?? category)));
  const [open, setOpen] = useState<number | null>(null);
  const [left, setLeft] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);

  // Keep the current category visible when the rail scrolls (narrow screens) — horizontal only.
  useEffect(() => {
    const el = rail.current, item = el?.children[current] as HTMLElement | undefined;
    if (!el || !item || el.scrollWidth <= el.clientWidth) return;
    el.scrollLeft = item.offsetLeft - (el.clientWidth - item.offsetWidth) / 2;
  }, [current]);

  // Anchor the menu over the clicked category
  useLayoutEffect(() => {
    if (open === null) return;
    const w = wrap.current, item = rail.current?.children[open] as HTMLElement | undefined;
    if (w && item) {
      const a = w.getBoundingClientRect(), b = item.getBoundingClientRect();
      setLeft(b.left + b.width / 2 - a.left);
    }
  }, [open]);

  // Close on outside click or Escape
  useEffect(() => {
    if (open === null) return;
    const down = (e: PointerEvent) => { if (!wrap.current?.contains(e.target as Node)) setOpen(null); };
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    document.addEventListener("pointerdown", down);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("keydown", key);
    };
  }, [open]);

  const menu = open === null ? undefined : categories[open];
  return (
    <nav aria-label="Technology categories" className={cx(s.nav, position === "fixed" && s.fixed)} style={style}>
      <div ref={wrap} className={s.wrap}>
        {menu && (
          <div id="tech-category-menu" className={s.menu} style={{ "--menu-x": `${left}px` } as CSSProperties} role="dialog" aria-label={`${menu.label} topics`}>
            <div className={s.menuHead}>
              <span className={s.menuKicker}>{menu.num} · {menu.topics.length} {menu.topics.length === 1 ? "topic" : "topics"}</span>
              <span className={s.menuTitle}>{menu.label}</span>
              {menu.ko && <span className={s.menuKo}>{menu.ko}</span>}
            </div>
            {menu.topics.length === 0 && <p className={s.menuEmpty}>세부 토픽은 준비 중입니다.</p>}
            <ol className={s.menuList}>
              {menu.topics.map((t) => {
                const on = t.id === topic;
                const href = topicLink(FLAT_TOPICS.find((f) => f.id === t.id));
                const body = (
                  <>
                    <span className={s.topicNum}>{t.num}</span>
                    <span className={s.topicTitle}>{t.title}</span>
                    {on ? <span className={s.pill}>Reading</span> : !href && <span className={s.soon}>Coming soon</span>}
                  </>
                );
                return (
                  <li key={t.id}>
                    {href ? (
                      <Link href={href} className={cx(s.topic, on && s.reading)} aria-current={on ? "page" : undefined} onClick={() => setOpen(null)}>{body}</Link>
                    ) : (
                      <span className={cx(s.topic, s.topicOff)} aria-disabled>{body}</span>
                    )}
                  </li>
                );
              })}
            </ol>
            <Link href={categoryHref(menu)} className={s.overview} aria-current={!curT && open === current ? "page" : undefined} onClick={() => setOpen(null)}>
              Category overview <ArrowRight size={13} aria-hidden />
            </Link>
          </div>
        )}
        <div ref={rail} className={s.rail}>
          {categories.map((c, i) => {
            const on = i === current;
            return (
              <button
                key={c.id}
                type="button"
                className={cx(s.item, on && s.on, open === i && s.opened)}
                onClick={() => setOpen(open === i ? null : i)}
                aria-current={on ? (curT ? "true" : "page") : undefined}
                aria-expanded={open === i}
                aria-controls="tech-category-menu"
              >
                <span className={s.num}>{c.num}</span>
                <span className={s.label}>{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
