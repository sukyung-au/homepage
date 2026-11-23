"use client";
import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import s from "./OpenDashboard.module.css";

/**
 * Section 02 → 03 bridge: the program's Dashboard tab, with its "대시보드 열기 (브라우저)" button made live. Pressing it
 * smooth-scrolls to #dashboard instead of opening a window, then the dashboard settles in once (data-arrive on the
 * section). Reduced motion jumps straight there. The capture is cropped to the tabs and button; the file name and
 * dates line is blanked in the image file itself.
 */

/** The button's box inside the 560×266 capture (percent) */
const BTN = { left: "6.6%", top: "76.7%", width: "57.1%", height: "18.8%" };

export function OpenDashboard({ style }: { style?: CSSProperties }) {
  const [pressed, setPressed] = useState(false);
  const raf = useRef(0);

  const open = () => {
    const sec = document.getElementById("dashboard");
    if (!sec) return;
    setPressed(true);
    window.setTimeout(() => setPressed(false), 220);
    sec.removeAttribute("data-arrive");
    const top = Math.round(sec.getBoundingClientRect().top + window.scrollY);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { window.scrollTo({ top }); return; }
    window.scrollTo({ top, behavior: "smooth" });
    cancelAnimationFrame(raf.current);
    let t0 = -1;
    const wait = (now: number) => {
      if (t0 < 0) t0 = now;
      if (Math.abs(window.scrollY - top) > 2 && now - t0 < 1600) { raf.current = requestAnimationFrame(wait); return; }
      sec.setAttribute("data-arrive", "");
    };
    raf.current = requestAnimationFrame(wait);
  };

  return (
    <figure className={s.bridge} data-reveal="up" style={style}>
      <div className={s.frame}>
        <Image src="/images/ai/production-report/odr-gui-dashboard-open.webp" alt="ODR 자동 집계 프로그램의 대시보드 탭과 ‘대시보드 열기 (브라우저)’ 버튼" width={560} height={266} sizes="(max-width: 899px) 100vw, 440px" />
        <span className={s.marker} aria-hidden>04</span>
        <button type="button" className={pressed ? `${s.hit} ${s.pressed}` : s.hit} style={BTN} onClick={open} aria-label="대시보드 열기 — 03 The Dashboard로 이동" />
      </div>
      <figcaption className={s.text}>
        <span className={s.kicker}>04 · 프로그램의 대시보드 탭</span>
        <span className={s.lead}>버튼 하나로 집계한 데이터를 대시보드에서 바로 확인하여 분석 가능</span>
        <span className={s.hint}>‘대시보드 열기’를 눌러 보세요 ↓</span>
      </figcaption>
    </figure>
  );
}
