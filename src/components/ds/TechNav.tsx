"use client";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, X } from "lucide-react";
import { FLAT_TOPICS, topicLink, type TechCategory } from "@/lib/technology";
import b from "./bottomNav.module.css";
import s from "./TechNav.module.css";

export interface TechNavProps {
  categories: TechCategory[];
  /** id of the topic currently being read — determines the current category */
  topic: string;
  position?: "fixed" | "relative";
  /** Start with the topic tray open. The tray also opens whenever the URL hash is #topics. */
  defaultOpen?: boolean;
  label?: string;
  style?: CSSProperties;
}

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

/**
 * Sticky bottom navigation for the Technology section: 5 fixed categories, current category + topic position,
 * previous/next topic (continues across categories), and an expandable "All topics" tray.
 * Topic collections grow without changing the bar layout.
 */
export function TechNav({ categories, topic, position = "fixed", defaultOpen = false, label = "Technology", style }: TechNavProps) {
  const fi = Math.max(0, FLAT_TOPICS.findIndex((t) => t.id === topic));
  const curT = FLAT_TOPICS[fi];
  const current = Math.max(0, categories.findIndex((c) => c.id === curT.category.id));
  const cat = categories[current];
  const prev = FLAT_TOPICS[fi - 1], next = FLAT_TOPICS[fi + 1];
  const prevHref = topicLink(prev), nextHref = topicLink(next);

  const [open, setOpen] = useState(defaultOpen);
  const [view, setView] = useState(current);
  const vc = categories[view] ?? cat;

  useEffect(() => {
    const sync = () => {
      if (window.location.hash === "#topics") {
        setView(current);
        setOpen(true);
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [current]);

  const toggle = (i: number) => {
    setView(i);
    setOpen((o) => !(o && view === i));
  };

  const fixed = position === "fixed";
  return (
    <nav aria-label="Technology categories" className={cx(b.nav, fixed && b.fixed)} style={{ position, ...style }}>
      <div className={b.inner}>
        {open && (
          <div id="tech-topic-tray" className={cx(b.shell, s.shell, s.tray, !fixed && s.trayRelative)}>
            <div className={s.trayHead}>
              <div className={s.trayTitle}>
                <span className={s.trayKicker}>{label} · {vc.num} / {String(categories.length).padStart(2, "0")}</span>
                <span className={s.trayLabel}>{vc.label}</span>
                {vc.kr && <span className={s.trayKr}>{vc.kr}</span>}
              </div>
              <div className={s.trayMeta}>
                <span className={s.trayCount}>{vc.topics.length} topics</span>
                <button type="button" aria-label="Close" onClick={() => setOpen(false)} className={s.circle}><X size={15} /></button>
              </div>
            </div>
            <ol className={s.list}>
              {vc.topics.map((t) => {
                const on = t.id === topic;
                const href = topicLink(FLAT_TOPICS.find((f) => f.id === t.id));
                const body = (
                  <>
                    <span className={s.topicNum}>{t.num}</span>
                    <span className={s.topicTitle}>{t.title}</span>
                    {on ? <span className={s.pill}>Reading</span> : <span className={s.topicRead}>{t.read}</span>}
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
        <div className={cx(b.shell, s.shell, b.bar)}>
          <div className={cx(b.current, s.current)}>
            <span className={b.badge} />
            <div className={b.currentText}>
              <span className={b.kicker}>{label} · Topic {curT.num} of {cat.topics.length}</span>
              <span className={b.currentLabel}><span className={b.num}>{cat.num}</span>{cat.label}</span>
            </div>
          </div>
          <span className={b.divider} />
          <div className={b.items} style={{ gridTemplateColumns: `repeat(${categories.length},minmax(0,1fr))` }}>
            {categories.map((c, i) => {
              const on = i === current, viewing = open && i === view && !on;
              return (
                <button key={c.id} type="button" onClick={() => toggle(i)} aria-current={on ? "page" : undefined} aria-expanded={open && i === view} aria-controls="tech-topic-tray" className={cx(b.item, on && b.on, viewing && s.viewing)}>
                  <span className={b.itemNum}>{c.num} <span className={s.count}>{c.topics.length} topics</span></span>
                  <span className={b.itemLabel}>{c.label}</span>
                </button>
              );
            })}
          </div>
          <div className={cx(b.end, s.end)}>
            <NavCircle href={prevHref} label={prev ? `Previous topic: ${prev.title}` : "No previous topic"} title={prev && `${prev.num} ${prev.title}`} exists={!!prev}>
              <ArrowLeft size={15} />
            </NavCircle>
            <NavCircle href={nextHref} label={next ? `Next topic: ${next.title}` : "No next topic"} title={next && `${next.num} ${next.title}`} exists={!!next} primary>
              <ArrowRight size={15} />
            </NavCircle>
            <button type="button" onClick={() => toggle(current)} aria-expanded={open} aria-controls="tech-topic-tray" className={cx(b.textAction, s.allTopics)}>
              All topics
              {open ? <ChevronDown size={14} aria-hidden /> : <ChevronUp size={14} aria-hidden />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

/**
 * Prev/next circle. Enabled styling follows whether a neighbouring topic exists (as in the design);
 * it only navigates once that topic has a page.
 */
function NavCircle({ href, label, title, exists, primary, children }: { href?: string; label: string; title?: string; exists: boolean; primary?: boolean; children: ReactNode }) {
  const cls = cx(s.circle, !exists && s.circleOff, exists && primary && s.circleNext);
  return href ? (
    <Link href={href} aria-label={label} title={title} className={cls}>{children}</Link>
  ) : (
    <button type="button" aria-label={label} title={title} className={cls} aria-disabled>{children}</button>
  );
}
