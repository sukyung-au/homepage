"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowRight, ChartColumn, Cpu, Laptop, Presentation } from "lucide-react";
import s from "./AiIntro.module.css";

/**
 * AI Technology — Introduction (after the approved design draft): an AI hub with three applications around it
 * (left) and the three results as cards (right). Hovering or focusing a node highlights its card and vice versa;
 * everything is readable without interaction. The entrance plays once on load (~1.5 s, CSS only).
 *
 * "상세 보기" goes through the topic list below (#topics): smooth-scroll to it, tint the chosen row, pause briefly,
 * then open that topic (≈2–2.5 s in all). Scrolling, a key or a click cancels the pending move; reduced motion
 * opens the topic at once.
 *
 * Card images: `website` and `odr` are captures of this site (the Technology intro and the synthetic-data ODR demo);
 * `presentation` is the cover slide of the Claymore HTML deck.
 */

type Key = "ppt" | "web" | "odr";

const APPS: { key: Key; num: string; title: string; node: string; nodeDesc: string; desc: string; img: string; imgAlt: string; topic?: string; Icon: typeof Presentation }[] = [
  { key: "ppt", num: "01", title: "AI-Powered Presentation", node: "Presentation", nodeDesc: "업무 자료 제작 및 팀 발표", Icon: Presentation,
    desc: "2027년도 작업계획 및 예산 검토 과정에서 Dana Claymore 유전의 일반현황을 정리하고, Claude를 활용해 HTML 기반 발표자료를 제작하여 팀 내 발표 진행",
    img: "/images/ai/intro/presentation.webp", imgAlt: "Claymore 유전 일반현황 HTML 발표자료 표지", topic: "ai-presentation" },
  { key: "web", num: "02", title: "Digital Knowledge Portal", node: "Website", nodeDesc: "기술 지식 포털 구축", Icon: Laptop,
    desc: "인턴십에서 교육받은 석유개발 기술을 체계적으로 정리하고 공유할 수 있도록 AI 기반 바이브 코딩으로 홈페이지 구축",
    img: "/images/ai/intro/website.webp", imgAlt: "이 홈페이지의 Petroleum Technology 첫 화면", topic: "vibe-coding" },
  { key: "odr", num: "03", title: "ODR Automation", node: "ODR Automation", nodeDesc: "생산일보 자동화 및 대시보드 구축", Icon: ChartColumn,
    desc: "Oil Daily Report의 데이터 집계 과정을 자동화하고, 생산 현황을 시각적으로 확인할 수 있는 대시보드 구축",
    img: "/images/ai/intro/odr-dashboard.webp", imgAlt: "ODR 대시보드 데모 화면 (가상 데이터)", topic: "production-report" },
];

/** Node centres in the diagram (percent): top, bottom-left, bottom-right; the hub sits at the triangle's centre */
const POS: Record<Key, [number, number]> = { ppt: [50, 19], web: [20, 76], odr: [80, 76] };
const HUB: [number, number] = [50, 57];

const v = (o: Record<string, string | number>) => o as CSSProperties;

function Screen({ src, alt }: { src: string; alt: string }) {
  return (
    <span className={s.screen}>
      <span className={s.display}><Image src={src} alt={alt} fill sizes="200px" /></span>
      <span className={s.base} aria-hidden />
    </span>
  );
}

export function AiIntro() {
  const [hi, setHi] = useState<Key | null>(null);
  const router = useRouter();
  const cancel = useRef<() => void>(() => {});
  useEffect(() => () => cancel.current(), []);

  /** Intro → topic list (chosen row tinted) → topic page */
  const goTo = (topic?: string) => {
    cancel.current();
    const list = document.getElementById("topics");
    const row = topic ? document.getElementById(topic) : null;
    const href = row?.querySelector<HTMLAnchorElement>("a[href]")?.getAttribute("href") ?? null;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (href) router.push(href);
      else list?.scrollIntoView();
      return;
    }
    if (!list) return;
    let raf = 0, timer = 0, live = true;
    const stop = () => {
      if (!live) return;
      live = false;
      cancelAnimationFrame(raf); clearTimeout(timer);
      for (const ev of ["wheel", "touchstart", "keydown", "pointerdown"]) window.removeEventListener(ev, stop, true);
      timer = window.setTimeout(() => row?.removeAttribute("data-picked"), 1800);
    };
    cancel.current = () => { stop(); clearTimeout(timer); row?.removeAttribute("data-picked"); };
    document.querySelectorAll("#topics li[data-picked]").forEach((el) => el.removeAttribute("data-picked"));
    const top = Math.round(list.getBoundingClientRect().top + window.scrollY);
    window.scrollTo({ top, behavior: "smooth" });
    // listen after this click has finished, so it does not cancel itself
    setTimeout(() => { if (live) for (const ev of ["wheel", "touchstart", "keydown", "pointerdown"]) window.addEventListener(ev, stop, { capture: true, passive: true }); }, 0);
    let t0 = -1;
    const arrived = (now: number) => {
      if (!live) return;
      if (t0 < 0) t0 = now;
      if (Math.abs(window.scrollY - top) > 2 && now - t0 < 1400) { raf = requestAnimationFrame(arrived); return; }
      row?.setAttribute("data-picked", "");
      if (href) timer = window.setTimeout(() => { if (live) { stop(); router.push(href); } }, 1400);
      else stop();
    };
    raf = requestAnimationFrame(arrived);
  };
  const on = (k: Key) => ({ onMouseEnter: () => setHi(k), onMouseLeave: () => setHi(null), onFocus: () => setHi(k), onBlur: () => setHi(null) });

  return (
    <section className={s.intro} data-hi={hi ?? undefined} aria-labelledby="ai-intro-title">
      <div className={s.inner}>
        <div className={s.bar}>
          <span>KNOC <i>/</i> AI Technology</span>
          <span className={s.barRule} aria-hidden />
          <span>01 <i>—</i> Introduction</span>
        </div>

        <div className={s.body}>
          <div className={s.left}>
            <header className={s.head}>
              <h2 id="ai-intro-title" className={s.title}><span>Applying AI</span><span>Across the <em>Work Process.</em></span></h2>
              <p className={s.sub}>생성형 AI를 활용해 업무를 더 효과적으로, 더 체계적으로, 더 효율적으로 수행한 경험</p>
            </header>

            <div className={s.diagram} role="group" aria-label="AI를 중심으로 연결된 세 가지 활용 분야: Presentation, Website, ODR Automation">
              <svg className={s.lines} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                <path d={`M${POS.ppt.join(",")} L${POS.web.join(",")} L${POS.odr.join(",")} Z`} className={s.tri} />
                {APPS.map((a, i) => (
                  <path key={a.key} d={`M${HUB.join(",")} L${POS[a.key].join(",")}`} className={s.spoke} data-k={a.key} style={v({ "--i": i })} />
                ))}
              </svg>
              <span className={s.orbit} aria-hidden />
              <div className={s.hub} style={{ left: `${HUB[0]}%`, top: `${HUB[1]}%` }}>
                <Cpu size={34} strokeWidth={1.6} aria-hidden />
                <b>AI</b>
              </div>
              {APPS.map((a, i) => (
                <div key={a.key} className={s.node} data-k={a.key} style={v({ left: `${POS[a.key][0]}%`, top: `${POS[a.key][1]}%`, "--i": i })} tabIndex={0} {...on(a.key)}>
                  <a.Icon size={30} strokeWidth={1.6} className={s.nodeIcon} aria-hidden />
                  <b>{a.node}</b>
                  <span>{a.nodeDesc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={s.right}>
            <p className={s.listLabel}>My AI Applications</p>
            <ol className={s.cards}>
              {APPS.map((a, i) => {
                const inner: ReactNode = (
                  <>
                    <Screen src={a.img} alt={a.imgAlt} />
                    <span className={s.cardText}>
                      <span className={s.cardTitle}><span className={s.num}>{a.num}</span>{a.title}</span>
                      <span className={s.desc}>{a.desc}</span>
                      <button type="button" className={s.more} onClick={() => goTo(a.topic)}>상세 보기 <ArrowRight size={14} aria-hidden /></button>
                    </span>
                  </>
                );
                return (
                  <li key={a.key} className={s.cardWrap} style={v({ "--i": i })}>
                    <div className={a.key === "odr" ? `${s.card} ${s.cardLink}` : s.card} data-k={a.key} {...on(a.key)}>{inner}</div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
