"use client";
import { useEffect, useState } from "react";
import s from "./Fundamentals.module.css";

/**
 * Sticky "on this page" index for 01–07. Plain anchor links (no scroll hijacking); the current section is
 * tracked with an IntersectionObserver band across the upper part of the viewport.
 */
export function SectionNav({ items }: { items: { id: string; num: string; label: string }[] }) {
  const [cur, setCur] = useState(items[0]?.id);
  useEffect(() => {
    const els = items.map((it) => document.getElementById(it.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setCur(hit.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);
  return (
    <nav className={s.secNav} aria-label="Sections on this page">
      <ol>
        {items.map((it) => (
          <li key={it.id}>
            <a href={`#${it.id}`} aria-current={cur === it.id ? "true" : undefined} data-on={cur === it.id || undefined}>
              <span>{it.num}</span>{it.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
