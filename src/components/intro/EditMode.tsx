"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import s from "./EditMode.module.css";

/**
 * Presenter edit mode for /presentation. Press E to toggle; click any text to retype it, and use the toolbar to
 * resize it. Changes are kept in this browser only (localStorage) and re-applied on reload; "Copy changes"
 * puts them on the clipboard so they can be written into the code. Canvas text in the intro reel is not editable.
 * While a text is being edited, its key presses don't reach the page (Space won't advance the prologue).
 */

interface Override { html?: string; size?: number; original: string }
type Overrides = Record<string, Override>;
const STORE = "presentation-edits-v1";

const load = (): Overrides => {
  try { return JSON.parse(localStorage.getItem(STORE) || "{}"); } catch { return {}; }
};
const save = (o: Overrides) => {
  try { localStorage.setItem(STORE, JSON.stringify(o)); } catch { /* storage blocked */ }
};

/** Stable DOM path (tag:nth-child chain) — class names are hashed, so they are not used. */
function pathOf(el: Element): string {
  const parts: string[] = [];
  for (let n: Element | null = el; n && n !== document.body; n = n.parentElement) {
    const i = n.parentElement ? Array.prototype.indexOf.call(n.parentElement.children, n) + 1 : 1;
    parts.unshift(`${n.tagName.toLowerCase()}:nth-child(${i})`);
  }
  return "body > " + parts.join(" > ");
}

/** The nearest element that directly holds visible text */
function textTarget(from: EventTarget | null): HTMLElement | null {
  for (let n = from instanceof HTMLElement ? from : null; n && n !== document.body; n = n.parentElement) {
    if (n.closest("[data-edit-ui]")) return null;
    if ([...n.childNodes].some((c) => c.nodeType === Node.TEXT_NODE && c.textContent?.trim())) return n;
  }
  return null;
}

const isEditable = (t: EventTarget | null) => t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));

export function EditMode() {
  const [on, setOn] = useState(false);
  const [hasSel, setHasSel] = useState(false);
  const [size, setSize] = useState(0);
  const [count, setCount] = useState(0);
  const [note, setNote] = useState("");
  const [top, setTop] = useState(false);
  const edits = useRef<Overrides>({});
  const sel = useRef<{ el: HTMLElement; path: string; onInput: () => void } | null>(null);

  const commit = useCallback(() => { save(edits.current); setCount(Object.keys(edits.current).length); }, []);
  const record = useCallback((path: string, el: HTMLElement, patch: Partial<Override>) => {
    edits.current[path] = { ...edits.current[path], ...patch, original: edits.current[path]?.original ?? patch.original ?? el.innerText };
    commit();
  }, [commit]);

  // Re-apply saved changes now and whenever new content mounts (prologue, scenes)
  useEffect(() => {
    edits.current = load();
    let raf = 0;
    const apply = () => {
      for (const [p, o] of Object.entries(edits.current)) {
        const el = document.querySelector<HTMLElement>(p);
        if (!el) continue;
        if (o.html !== undefined && el.innerHTML !== o.html && document.activeElement !== el) el.innerHTML = o.html;
        if (o.size && el.style.fontSize !== `${o.size}px`) el.style.fontSize = `${o.size}px`;
      }
    };
    raf = requestAnimationFrame(() => { apply(); setCount(Object.keys(edits.current).length); });
    const mo = new MutationObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(apply); });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { mo.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  const flash = (t: string) => { setNote(t); window.setTimeout(() => setNote(""), 1600); };

  const deselect = useCallback(() => {
    const cur = sel.current;
    if (!cur) return;
    cur.el.removeEventListener("input", cur.onInput);
    cur.el.contentEditable = "inherit";
    cur.el.removeAttribute("data-edit-sel");
    cur.el.blur();
    sel.current = null;
    setHasSel(false);
  }, []);

  const select = useCallback((el: HTMLElement) => {
    deselect();
    const path = pathOf(el);
    const original = edits.current[path]?.original ?? el.innerText;
    const onInput = () => record(path, el, { original, html: el.innerHTML });
    el.addEventListener("input", onInput);
    el.contentEditable = "true";
    el.setAttribute("data-edit-sel", "");
    el.focus();
    sel.current = { el, path, onInput };
    setHasSel(true);
    setSize(Math.round(parseFloat(getComputedStyle(el).fontSize)));
  }, [deselect, record]);

  const toggle = useCallback((v?: boolean) => {
    setOn((cur) => {
      const next = v ?? !cur;
      document.documentElement.toggleAttribute("data-editing", next);
      return next;
    });
    deselect();
  }, [deselect]);

  // E toggles; inside an edited text, keys stay there (Esc leaves the text)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isEditable(e.target)) {
        if (e.code === "Escape") { e.preventDefault(); deselect(); }
        e.stopPropagation();
        return;
      }
      if (e.code === "KeyE" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.stopPropagation();
        toggle();
      }
    };
    const onUp = (e: KeyboardEvent) => { if (isEditable(e.target)) e.stopPropagation(); };
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("keyup", onUp, true);
    return () => { window.removeEventListener("keydown", onKey, true); window.removeEventListener("keyup", onUp, true); };
  }, [deselect, toggle]);

  // In edit mode a click selects text instead of pressing buttons / links
  useEffect(() => {
    if (!on) return;
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element).closest?.("[data-edit-ui]")) return;
      e.preventDefault();
      e.stopPropagation();
      const el = textTarget(e.target);
      if (el && el !== sel.current?.el) select(el);
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, [on, select]);

  const resize = (d: number) => {
    const cur = sel.current;
    if (!cur) return;
    const n = Math.max(6, size + d);
    cur.el.style.fontSize = `${n}px`;
    setSize(n);
    record(cur.path, cur.el, { size: n });
  };

  const copy = async () => {
    const list = Object.entries(edits.current).map(([path, o]) => ({
      path, original: o.original,
      ...(o.html !== undefined && { text: o.html.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&") }),
      ...(o.size && { fontSizePx: o.size }),
    }));
    const text = JSON.stringify({ page: location.pathname, viewport: `${innerWidth}×${innerHeight}`, edits: list }, null, 2);
    try { await navigator.clipboard.writeText(text); flash("Copied — paste it to Claude"); }
    catch { window.prompt("Copy the changes:", text); }
  };

  const resetAll = () => {
    if (!window.confirm("Reset all edits? The page will reload.")) return;
    try { localStorage.removeItem(STORE); } catch { /* storage blocked */ }
    location.reload();
  };

  if (!on) return null;
  return (
    <div className={s.bar} data-edit-ui data-top={top || undefined} role="toolbar" aria-label="Edit mode">
      <span className={s.badge}>Edit mode</span>
      {hasSel ? (
        <>
          <span className={s.label}>Size</span>
          <button type="button" className={s.btn} onClick={() => resize(-2)} aria-label="Smaller">−</button>
          <span className={s.value}>{size}px</span>
          <button type="button" className={s.btn} onClick={() => resize(2)} aria-label="Larger">+</button>
          <button type="button" className={s.btn} onClick={deselect}>Done</button>
        </>
      ) : (
        <span className={s.label}>글자를 클릭해 수정하세요</span>
      )}
      <span className={s.sep} />
      <span className={s.label}>{count} edits</span>
      <button type="button" className={s.btn} onClick={copy} disabled={!count}>Copy changes</button>
      <button type="button" className={s.btn} onClick={resetAll} disabled={!count}>Reset</button>
      <button type="button" className={s.btn} onClick={() => setTop((v) => !v)} aria-label="Move toolbar">{top ? "↓" : "↑"}</button>
      <button type="button" className={s.btnMain} onClick={() => toggle(false)}>Close (E)</button>
      {note && <span className={s.note}>{note}</span>}
    </div>
  );
}
