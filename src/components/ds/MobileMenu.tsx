"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { SiteLink } from "@/lib/site";
import s from "./SiteHeader.module.css";

/** Global nav for narrow screens: a menu button that opens the site links in a panel under the header. */
export function MobileMenu({ links, active }: { links: SiteLink[]; active?: string }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const down = (e: PointerEvent) => { if (!wrap.current?.contains(e.target as Node)) setOpen(false); };
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", down);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("keydown", key);
    };
  }, [open]);

  return (
    <div ref={wrap} className={s.mobile}>
      <button type="button" className={s.menuButton} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(!open)}>
        {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
      </button>
      {open && (
        <nav id="site-menu" className={s.panel} aria-label="Primary">
          {links.map((l) => l.href ? (
            <Link key={l.id} href={l.href} className={active === l.id ? `${s.panelLink} ${s.panelActive}` : s.panelLink} aria-current={active === l.id ? "page" : undefined} onClick={() => setOpen(false)}>{l.label}</Link>
          ) : (
            <span key={l.id} className={s.panelLink}>{l.label}</span>
          ))}
        </nav>
      )}
    </div>
  );
}
