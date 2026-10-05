import Link from "next/link";
import { Search } from "lucide-react";
import type { CSSProperties } from "react";
import type { SiteLink } from "@/lib/site";
import s from "./SiteHeader.module.css";

export interface SiteHeaderProps {
  links?: SiteLink[];
  active?: string;
  tone?: "light" | "dark";
  position?: "absolute" | "relative" | "sticky";
  style?: CSSProperties;
}

/** Transparent 72px editorial header: type-only wordmark, 13px links, search + KR/EN. Sits over the hero. */
export function SiteHeader({ links = [], active, tone = "light", position = "absolute", style }: SiteHeaderProps) {
  return (
    <header className={tone === "dark" ? `${s.header} ${s.dark}` : s.header} style={{ position, ...style }}>
      <Link href="/" className={s.mark}>
        <b>Oil &amp; Gas</b>
        <span>Development</span>
      </Link>
      <nav className={s.nav} aria-label="Primary">
        {links.map((l) => {
          const cls = [s.link, active === l.id && s.active, !l.href && s.inert].filter(Boolean).join(" ");
          return l.href ? (
            <Link key={l.id} href={l.href} className={cls} aria-current={active === l.id ? "page" : undefined}>{l.label}</Link>
          ) : (
            <span key={l.id} className={cls}>{l.label}</span>
          );
        })}
      </nav>
      <div className={s.tools}>
        <Search size={16} aria-label="Search" />
        <span className={s.lang}><b>KR</b> <span>/ EN</span></span>
      </div>
    </header>
  );
}
