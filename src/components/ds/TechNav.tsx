"use client";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, List, X } from "lucide-react";
import { FLAT_TOPICS, TECH_STOPS, categoryHref, stopTitle, topicLink, type TechCategory } from "@/lib/technology";
import s from "./TechNav.module.css";

export interface TechNavProps {
  categories: TechCategory[];
  /** id of the current category */
  category: string;
  /** id of the topic currently being read; omit on a category overview page */
  topic?: string;
  position?: "fixed" | "relative";
  /** Start with the topic tray open. The tray also opens whenever the URL hash is #topics. */
  defaultOpen?: boolean;
  label?: string;
  style?: CSSProperties;
}

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

/**
 * Slim floating rail for the Technology section, in the same chrome as the Journey StageNav: every category
 * (from lib/technology.ts) in one row — the current one in blue with a thin indicator — then previous/next
 * (each category overview, then its published topics, continuing across categories) and an "All topics" tray
 * for the current category. On narrow screens the category row scrolls and keeps the current one in view.
 */
export function TechNav({ categories, category, topic, position = "fixed", defaultOpen = false, label = "Technology", style }: TechNavProps) {
  const curT = topic ? FLAT_TOPICS.find((t) => t.id === topic) : undefined;
  const current = Math.max(0, categories.findIndex((c) => c.id === (curT?.category.id ?? category)));
  const cat = categories[current];
  const si = TECH_STOPS.findIndex((st) => (curT ? st.kind === "topic" && st.topic.id === curT.id : st.kind === "category" && st.category.id === cat.id));
  const prev = si > 0 ? TECH_STOPS[si - 1] : undefined, next = si >= 0 ? TECH_STOPS[si + 1] : undefined;
  const total = String(categories.length).padStart(2, "0");

  const [open, setOpen] = useState(defaultOpen);
  const cats = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sync = () => { if (window.location.hash === "#topics") setOpen(true); };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  // Keep the current category visible when the row scrolls (narrow screens) — horizontal only.
  useEffect(() => {
    const el = cats.current, item = el?.children[current] as HTMLElement | undefined;
    if (!el || !item || el.scrollWidth <= el.clientWidth) return;
    el.scrollLeft = item.offsetLeft - (el.clientWidth - item.offsetWidth) / 2;
  }, [current]);

  return (
    <nav aria-label="Technology categories" className={cx(s.nav, position === "fixed" && s.fixed)} style={style}>
      {open && (
        <div id="tech-topic-tray" className={s.tray}>
          <div className={s.trayHead}>
            <div className={s.trayTitle}>
              <span className={s.trayKicker}>{label} · {cat.num} / {total}</span>
              <span className={s.trayLabel}>{cat.label}</span>
              {cat.ko && <span className={s.trayKr}>{cat.ko}</span>}
            </div>
            <div className={s.trayMeta}>
              <span className={s.trayCount}>{cat.topics.length} {cat.topics.length === 1 ? "topic" : "topics"}</span>
              <Link href={categoryHref(cat)} className={s.textAction} aria-current={!curT ? "page" : undefined} onClick={() => setOpen(false)}>Overview</Link>
              <button type="button" aria-label="Close" onClick={() => setOpen(false)} className={s.circle}><X size={14} /></button>
            </div>
          </div>
          {cat.topics.length === 0 && <p className={s.trayEmpty}>Topics coming soon · 세부 토픽은 준비 중입니다.</p>}
          <ol className={s.list}>
            {cat.topics.map((t) => {
              const on = t.id === topic;
              const href = topicLink(FLAT_TOPICS.find((f) => f.id === t.id));
              const body = (
                <>
                  <span className={s.topicNum}>{t.num}</span>
                  <span className={s.topicTitle}>{t.title}</span>
                  {on ? <span className={s.pill}>Reading</span> : <span className={s.topicRead}>{href ? t.read : "Coming soon"}</span>}
                </>
              );
              return (
                <li key={t.id} className={on ? s.reading : undefined}>
                  {href ? (
                    <Link href={href} className={s.topic} aria-current={on ? "page" : undefined} onClick={() => setOpen(false)}>{body}</Link>
                  ) : (
                    <span className={cx(s.topic, s.topicSoon)} title="Coming soon">{body}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      )}
      <div className={s.rail}>
        <div ref={cats} className={s.cats}>
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
        <span className={s.sep} aria-hidden />
        <div className={s.end}>
          <NavCircle href={prev?.href} label={prev ? `Previous: ${stopTitle(prev)}` : "No previous page"} title={prev && stopTitle(prev)}>
            <ArrowLeft size={14} />
          </NavCircle>
          <NavCircle href={next?.href} label={next ? `Next: ${stopTitle(next)}` : "No next page"} title={next && stopTitle(next)} primary>
            <ArrowRight size={14} />
          </NavCircle>
          <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="tech-topic-tray" aria-label="All topics" className={s.allTopics}>
            <List size={15} aria-hidden className={s.allIcon} />
            <span className={s.allText}>All topics</span>
            {open ? <ChevronDown size={13} aria-hidden /> : <ChevronUp size={13} aria-hidden />}
          </button>
        </div>
      </div>
    </nav>
  );
}

/** Prev/next circle: navigates to the neighbouring page in the reading sequence, or renders disabled at either end. */
function NavCircle({ href, label, title, primary, children }: { href?: string; label: string; title?: string; primary?: boolean; children: ReactNode }) {
  const cls = cx(s.circle, !href && s.circleOff, href && primary && s.circleNext);
  return href ? (
    <Link href={href} aria-label={label} title={title} className={cls}>{children}</Link>
  ) : (
    <button type="button" aria-label={label} title={title} className={cls} aria-disabled>{children}</button>
  );
}
