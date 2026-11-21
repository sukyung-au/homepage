"use client";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import s from "./EditMode.module.css";

/**
 * Presenter edit mode, on every page (mounted in the root layout). Turn it on with ?edit in the address, or
 * Alt+Shift+E (on /presentation also plain E). Click a photo to select its frame — move it or resize its box. Press E to turn it on (only the Close button turns it off, so a
 * stray E — or ㄷ while typing Korean — can't drop out of it); click any text to retype it, and use the toolbar to
 * resize it, drag the ✥ handle to move it (CSS `translate`, so it composes with the page's own transform
 * animations), drag the ◢ corner to resize its box (width / height), or widen the selection to the enclosing box. Changes are kept in this browser only (localStorage) and re-applied on reload; "Copy changes"
 * puts them on the clipboard so they can be written into the code. Canvas text in the intro reel is not editable.
 * While on, key presses don't reach the page (no R replay, M sound or Esc skip) except Space / arrows / Page
 * keys outside an edited text, so the prologue can still be stepped. Toolbar clicks keep the text focused.
 */

interface Override { html?: string; size?: number; x?: number; y?: number; w?: number; h?: number; original: string }
type Overrides = Record<string, Override>;
/** One store per page; /presentation keeps its original key so earlier edits still apply */
const storeKey = (path: string) => (path === "/presentation" ? "presentation-edits-v1" : `site-edits-v1:${path}`);

/** Saved paths start at <main>: elements injected into <body> (e.g. the Vercel preview toolbar) shift body's
 *  children, so older "body > main:nth-child(n)" paths are rewritten on load. */
const load = (key: string): Overrides => {
  let raw: Overrides = {};
  try { raw = JSON.parse(localStorage.getItem(key) || "{}"); } catch { /* storage blocked */ }
  const out: Overrides = {};
  for (const [p, o] of Object.entries(raw)) {
    const k = p.replace(/^body > main:nth-child\(\d+\)/, "main");
    out[k] = { ...out[k], ...o };
  }
  return out;
};
const save = (key: string, o: Overrides) => {
  try { localStorage.setItem(key, JSON.stringify(o)); } catch { /* storage blocked */ }
};

/** Stable DOM path (tag:nth-child chain) — class names are hashed, so they are not used. */
function pathOf(el: Element): string {
  const parts: string[] = [];
  for (let n: Element | null = el; n && n !== document.body; n = n.parentElement) {
    if (n.tagName === "MAIN") { parts.unshift("main"); break; }
    const i = n.parentElement ? Array.prototype.indexOf.call(n.parentElement.children, n) + 1 : 1;
    parts.unshift(`${n.tagName.toLowerCase()}:nth-child(${i})`);
  }
  return parts[0] === "main" ? parts.join(" > ") : "body > " + parts.join(" > ");
}

/** A clicked photo → its frame (the image's positioned wrapper, or the <figure> holding it) */
function imageTarget(from: EventTarget | null): HTMLElement | null {
  if (!(from instanceof Element) || from.closest("[data-edit-ui]")) return null;
  const img = from.closest("img, svg[role=img]") ?? (from instanceof HTMLElement && from.children.length === 1 ? from.querySelector(":scope > img") : null);
  if (!img) return null;
  const wrap = img.parentElement;
  return wrap && wrap !== document.body ? (wrap.closest("figure") as HTMLElement) ?? wrap : null;
}

/** The nearest element that directly holds visible text */
function textTarget(from: EventTarget | null): HTMLElement | null {
  for (let n = from instanceof HTMLElement ? from : null; n && n !== document.body; n = n.parentElement) {
    if (n.closest("[data-edit-ui]")) return null;
    if ([...n.childNodes].some((c) => c.nodeType === Node.TEXT_NODE && c.textContent?.trim())) return n;
  }
  return null;
}

/** Fixed box size (border-box); no arguments restores the page's own sizing */
function sizeBox(el: HTMLElement, w?: number, h?: number) {
  el.style.boxSizing = w ? "border-box" : "";
  el.style.width = w ? `${w}px` : "";
  el.style.maxWidth = w ? "none" : "";
  el.style.height = h ? `${h}px` : "";
  el.style.whiteSpace = w ? "normal" : "";
}

/** Keys that still reach the page in edit mode (step the prologue, scroll) */
const NAV_KEYS = new Set(["Space", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", "Tab"]);

/** While the intro reel runs (before the self-introduction), its own keys and clicks pass through so it can be started or skipped (Esc) */
const reelActive = () => /^(waiting|playing|poster|handoff)$/.test(document.documentElement.dataset.reel ?? "");

const isEditable = (t: EventTarget | null) => t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));

export function EditMode() {
  const [on, setOn] = useState(false);
  const [hasSel, setHasSel] = useState(false);
  const [size, setSize] = useState(0);
  const [count, setCount] = useState(0);
  const [note, setNote] = useState("");
  const [top, setTop] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
  const [box, setBox] = useState<{ left: number; top: number; right: number; bottom: number } | null>(null);
  const edits = useRef<Overrides>({});
  const pathname = usePathname();
  const key = useRef(storeKey(pathname));
  const [isImg, setIsImg] = useState(false);
  const sel = useRef<{ el: HTMLElement; path: string; onInput: () => void } | null>(null);

  const commit = useCallback(() => { save(key.current, edits.current); setCount(Object.keys(edits.current).length); }, []);
  const record = useCallback((path: string, el: HTMLElement, patch: Partial<Override>) => {
    edits.current[path] = { ...edits.current[path], ...patch, original: edits.current[path]?.original ?? patch.original ?? el.innerText };
    commit();
  }, [commit]);

  // Re-apply this page's saved changes now, on client-side navigation, and whenever new content mounts
  useEffect(() => {
    key.current = storeKey(pathname);
    edits.current = load(key.current);
    let raf = 0;
    const apply = () => {
      for (const [p, o] of Object.entries(edits.current)) {
        const el = document.querySelector<HTMLElement>(p);
        if (!el) continue;
        if (o.html !== undefined && el.innerHTML !== o.html && document.activeElement !== el) el.innerHTML = o.html;
        if (o.size && el.style.fontSize !== `${o.size}px`) el.style.fontSize = `${o.size}px`;
        const tr = o.x || o.y ? `${o.x ?? 0}px ${o.y ?? 0}px` : "";
        if (tr && el.style.translate !== tr) el.style.translate = tr;
        if (o.w && el.style.width !== `${o.w}px`) sizeBox(el, o.w, o.h);
      }
      // keep the saved-edit count in step: a mutation can replace the first frame before it runs
      setCount(Object.keys(edits.current).length);
    };
    raf = requestAnimationFrame(apply);
    const mo = new MutationObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(apply); });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { mo.disconnect(); cancelAnimationFrame(raf); };
  }, [pathname]);

  // ?edit in the address turns edit mode on
  useEffect(() => {
    if (!new URLSearchParams(location.search).has("edit")) return;
    document.documentElement.setAttribute("data-editing", "");
    const t = window.setTimeout(() => setOn(true), 0);
    return () => window.clearTimeout(t);
  }, [pathname]);

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

  const select = useCallback((el: HTMLElement, image = false) => {
    deselect();
    const path = pathOf(el);
    const original = edits.current[path]?.original ?? (image ? "(image)" : el.innerText);
    const onInput = () => record(path, el, { original, html: el.innerHTML });
    if (!image) {
      el.addEventListener("input", onInput);
      el.contentEditable = "true";
      el.focus();
    }
    el.setAttribute("data-edit-sel", "");
    setIsImg(image);
    sel.current = { el, path, onInput };
    setHasSel(true);
    setPos({ x: edits.current[path]?.x ?? 0, y: edits.current[path]?.y ?? 0 });
    const o = edits.current[path];
    setDims(o?.w ? { w: o.w, h: o.h ?? 0 } : null);
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

  // E turns edit mode on; while on, keys stay in the edited text (Esc leaves it) and page shortcuts are blocked
  const onRef = useRef(false);
  useEffect(() => { onRef.current = on; }, [on]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isEditable(e.target)) {
        if (e.code === "Escape") { e.preventDefault(); deselect(); }
        e.stopPropagation();
        return;
      }
      if (onRef.current) {
        if (e.code === "Escape") deselect();
        if (!NAV_KEYS.has(e.code) && !reelActive()) e.stopPropagation();
        return;
      }
      const plainE = e.code === "KeyE" && !e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey && !e.isComposing && location.pathname === "/presentation";
      const comboE = e.code === "KeyE" && e.altKey && e.shiftKey && !e.metaKey && !e.ctrlKey;
      if (plainE || comboE) {
        e.stopPropagation();
        toggle(true);
      }
    };
    const onUp = (e: KeyboardEvent) => { if (isEditable(e.target) || (onRef.current && !NAV_KEYS.has(e.code) && !reelActive())) e.stopPropagation(); };
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("keyup", onUp, true);
    return () => { window.removeEventListener("keydown", onKey, true); window.removeEventListener("keyup", onUp, true); };
  }, [deselect, toggle]);

  // In edit mode a click selects text instead of pressing buttons / links
  useEffect(() => {
    if (!on) return;
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element).closest?.("[data-edit-ui]") || reelActive()) return;
      e.preventDefault();
      e.stopPropagation();
      const img = imageTarget(e.target);
      if (img) { if (img !== sel.current?.el) select(img, true); return; }
      const el = textTarget(e.target);
      if (el && el !== sel.current?.el) select(el);
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, [on, select]);

  // Keep the move handle on the selected element's corner
  useEffect(() => {
    if (!hasSel) return;
    let raf = 0;
    const follow = () => {
      const r = sel.current?.el.getBoundingClientRect();
      setBox((b) => (!r ? null : b && b.left === r.left && b.top === r.top && b.right === r.right && b.bottom === r.bottom ? b : { left: r.left, top: r.top, right: r.right, bottom: r.bottom }));
      raf = requestAnimationFrame(follow);
    };
    raf = requestAnimationFrame(follow);
    return () => { cancelAnimationFrame(raf); setBox(null); };
  }, [hasSel]);

  const moveTo = (x: number, y: number, keep = true) => {
    const cur = sel.current;
    if (!cur) return;
    cur.el.style.translate = x || y ? `${x}px ${y}px` : "";
    setPos({ x, y });
    if (keep) record(cur.path, cur.el, { x, y });
  };

  const drag = (e: React.PointerEvent) => {
    e.preventDefault();
    const sx = e.clientX, sy = e.clientY, base = pos;
    let last = base;
    const onMove = (m: PointerEvent) => {
      last = { x: Math.round(base.x + m.clientX - sx), y: Math.round(base.y + m.clientY - sy) };
      moveTo(last.x, last.y, false);
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      moveTo(last.x, last.y);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  // Corner drag: set the box's width and height (border-box px)
  const resizeBox = (e: React.PointerEvent) => {
    e.preventDefault();
    const cur = sel.current;
    if (!cur) return;
    const r = cur.el.getBoundingClientRect(), sx = e.clientX, sy = e.clientY;
    let w = Math.round(r.width), h = Math.round(r.height);
    const onMove = (m: PointerEvent) => {
      w = Math.max(20, Math.round(r.width + m.clientX - sx));
      h = Math.max(10, Math.round(r.height + m.clientY - sy));
      sizeBox(cur.el, w, h);
      setDims({ w, h });
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      record(cur.path, cur.el, { w, h });
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };
  const resetBox = () => {
    const cur = sel.current;
    if (!cur) return;
    sizeBox(cur.el);
    setDims(null);
    record(cur.path, cur.el, { w: undefined, h: undefined });
  };

  // Widen the selection to the enclosing box (e.g. a whole card) to move it as one
  const selectParent = () => {
    const p = sel.current?.el.parentElement;
    if (p && p !== document.body && p.tagName !== "MAIN") select(p, isImg);
  };

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
      ...((o.x || o.y) && { movePx: { x: o.x ?? 0, y: o.y ?? 0 } }),
      ...(o.w && { boxPx: { width: o.w, height: o.h } }),
    }));
    const text = JSON.stringify({ page: location.pathname, viewport: `${innerWidth}×${innerHeight}`, edits: list }, null, 2);
    try { await navigator.clipboard.writeText(text); flash("Copied — paste it to Claude"); }
    catch { window.prompt("Copy the changes:", text); }
  };

  const resetAll = () => {
    if (!window.confirm("이 페이지의 수정 사항을 모두 초기화할까요? 페이지가 새로고침됩니다.")) return;
    try { localStorage.removeItem(key.current); } catch { /* storage blocked */ }
    location.reload();
  };

  if (!on) return null;
  return (
    <>
    {box && (
      <span className={s.handle} data-edit-ui style={{ left: box.left, top: box.top }} onPointerDown={drag} title="드래그해서 이동" aria-label="Move">✥</span>
    )}
    {box && (
      <span className={s.corner} data-edit-ui style={{ left: box.right, top: box.bottom }} onPointerDown={resizeBox} title="드래그해서 상자 크기 변경" aria-label="Resize box">◢</span>
    )}
    <div className={s.bar} data-edit-ui data-top={top || undefined} role="toolbar" aria-label="Edit mode" onMouseDown={(e) => e.preventDefault()}>
      <span className={s.badge}>Edit mode</span>
      {hasSel ? (
        <>
          {isImg ? <span className={s.label}>사진</span> : (
            <>
              <span className={s.label}>Size</span>
              <button type="button" className={s.btn} onClick={() => resize(-2)} aria-label="Smaller">−</button>
              <span className={s.value}>{size}px</span>
              <button type="button" className={s.btn} onClick={() => resize(2)} aria-label="Larger">+</button>
            </>
          )}
          <span className={s.sep} />
          <span className={s.label}>Move</span>
          <span className={s.value}>{pos.x}, {pos.y}</span>
          <button type="button" className={s.btn} onClick={() => moveTo(0, 0)} disabled={!pos.x && !pos.y}>위치 초기화</button>
          <span className={s.sep} />
          <span className={s.label}>Box</span>
          <span className={s.value}>{dims ? `${dims.w}×${dims.h}` : "auto"}</span>
          <button type="button" className={s.btn} onClick={resetBox} disabled={!dims}>크기 초기화</button>
          <button type="button" className={s.btn} onClick={selectParent}>상위 박스 선택</button>
          <button type="button" className={s.btn} onClick={deselect}>Done</button>
        </>
      ) : (
        <span className={s.label}>글자나 사진을 클릭해 선택하세요</span>
      )}
      <span className={s.sep} />
      <span className={s.label}>{count} edits</span>
      <button type="button" className={s.btn} onClick={copy} disabled={!count}>Copy changes</button>
      <button type="button" className={s.btn} onClick={resetAll} disabled={!count}>Reset all</button>
      <button type="button" className={s.btn} onClick={() => setTop((v) => !v)} aria-label="Move toolbar">{top ? "↓" : "↑"}</button>
      <button type="button" className={s.btnMain} onClick={() => toggle(false)}>Close</button>
      {note && <span className={s.note}>{note}</span>}
    </div>
    </>
  );
}
