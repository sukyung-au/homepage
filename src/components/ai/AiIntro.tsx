"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties, type ReactNode } from "react";
import { ArrowRight, ChartColumn, Cpu, Laptop, Presentation } from "lucide-react";
import s from "./AiIntro.module.css";

/**
 * AI Technology — Introduction (after the approved design draft): an AI hub with three applications around it
 * (left) and the three results as cards (right). Hovering or focusing a node highlights its card and vice versa;
 * everything is readable without interaction. The entrance plays once on load (~1.5 s, CSS only).
 *
 * Card images: `website` and `odr` are captures of this site (the Technology intro and the synthetic-data ODR demo);
 * `presentation` is a stand-in photo until the HTML slide capture is supplied — replace `img` in APPS.
 */

type Key = "ppt" | "web" | "odr";

const APPS: { key: Key; num: string; title: string; node: string; nodeDesc: string; desc: string; img: string; imgAlt: string; href?: string; Icon: typeof Presentation }[] = [
  { key: "ppt", num: "01", title: "AI-Powered Presentation", node: "Presentation", nodeDesc: "업무 자료 제작 및 팀 발표", Icon: Presentation,
    desc: "2027년도 작업계획 및 예산 검토 과정에서 Dana Claymore 유전의 일반현황을 정리하고, Claude를 활용해 HTML 기반 발표자료를 제작하여 팀 내 발표 진행",
    img: "/images/ai/intro/presentation.webp", imgAlt: "해양 생산 플랫폼 사진 (발표자료 캡처로 교체 예정)" },
  { key: "web", num: "02", title: "Digital Knowledge Portal", node: "Website", nodeDesc: "기술 지식 포털 구축", Icon: Laptop,
    desc: "인턴십에서 교육받은 석유개발 기술을 체계적으로 정리하고 공유할 수 있도록 AI 기반 바이브 코딩으로 홈페이지 구축",
    img: "/images/ai/intro/website.webp", imgAlt: "이 홈페이지의 Petroleum Technology 첫 화면" },
  { key: "odr", num: "03", title: "ODR Automation", node: "ODR Automation", nodeDesc: "생산일보 자동화 및 대시보드 구축", Icon: ChartColumn,
    desc: "Oil Daily Report의 데이터 집계 과정을 자동화하고, 생산 현황을 시각적으로 확인할 수 있는 대시보드 구축",
    img: "/images/ai/intro/odr-dashboard.webp", imgAlt: "ODR 대시보드 데모 화면 (가상 데이터)", href: "/ai-technology/production-report" },
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
                      {a.href && <span className={s.more}>상세 보기 <ArrowRight size={14} aria-hidden /></span>}
                    </span>
                  </>
                );
                return (
                  <li key={a.key} className={s.cardWrap} style={v({ "--i": i })}>
                    {a.href ? (
                      <Link href={a.href} className={`${s.card} ${s.cardLink}`} data-k={a.key} {...on(a.key)}>{inner}</Link>
                    ) : (
                      <div className={s.card} data-k={a.key} tabIndex={0} {...on(a.key)}>{inner}</div>
                    )}
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
