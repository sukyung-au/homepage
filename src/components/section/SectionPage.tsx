import Link from "next/link";
import type { ReactNode } from "react";
import { sceneStyles as ss } from "@/components/site/scene";
import s from "./SectionPage.module.css";

export { s as sectionStyles };

/** Page heading: breadcrumb, eyebrow (num — rule — label), light editorial H1, optional subtitle and meta line. */
export function SectionHead({ crumbs, num, label, title, sub, meta }: { crumbs?: { label: string; href?: string }[]; num?: string; label: string; title: string; sub?: string; meta?: ReactNode }) {
  return (
    <>
      {crumbs && (
        <nav className={s.crumb} aria-label="Breadcrumb">
          {crumbs.map((c, i) => (
            <span key={c.label} style={{ display: "contents" }}>
              {i > 0 && <span aria-hidden>/</span>}
              {c.href ? <Link href={c.href}>{c.label}</Link> : <span className={s.crumbCurrent} aria-current="page">{c.label}</span>}
            </span>
          ))}
        </nav>
      )}
      <div className={s.head}>
        <div className={ss.eyebrow}>
          {num && <><span className={ss.eyebrowNum}>{num}</span><span className={ss.eyebrowRule} /></>}
          <span className={ss.eyebrowLabel}>{label}</span>
        </div>
        <h1 className={s.h1}>{title}</h1>
        {sub && <p className={s.sub}>{sub}</p>}
        {meta && <div className={s.meta}>{meta}</div>}
      </div>
    </>
  );
}

export interface IndexItem {
  id: string;
  num: string;
  title: string;
  /** Detail page, once it exists */
  href?: string;
  /** Right-hand note for linked items (e.g. read time) */
  meta?: string;
}

/** Numbered, ruled list. Items without a page yet are shown with a "Coming soon" tag. */
export function IndexList({ items, label }: { items: IndexItem[]; label: string }) {
  return (
    <ol className={s.list} aria-label={label}>
      {items.map((it) => {
        const body = (
          <>
            <span className={s.num}>{it.num}</span>
            <span className={s.title}>{it.title}</span>
            {it.href ? <span className={s.rowMeta}>{it.meta}</span> : <span className={s.soon}>Coming soon</span>}
          </>
        );
        return (
          <li key={it.id} id={it.id}>
            {it.href ? <Link href={it.href} className={s.row}>{body}</Link> : <div className={s.row}>{body}</div>}
          </li>
        );
      })}
    </ol>
  );
}
