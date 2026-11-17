"use client";
import Image from "next/image";
import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Maximize2, X } from "lucide-react";
import { sceneStyles as ss } from "@/components/site/scene";
import { RevealScope } from "@/components/technology/RevealScope";
import { SectionHeading, topicStyles as t } from "@/components/technology/TopicParts";
import p from "./AiPresentation.module.css";

/**
 * AI Technology topic 02 — the Claymore field briefing deck, made as an HTML presentation with Claude.
 * The focus is the work experience (task → approach → outcome), not the field itself. The three slide images are
 * screenshots of the actual HTML deck (slides 01, 02, 10), rendered from the file; nothing else from the deck is
 * reproduced. Figures stated here ("10 slides", "about 10 minutes") come from the deck and its speaker notes.
 */

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");
const v = (o: Record<string, string | number>) => o as CSSProperties;

function Head({ num, title, children }: { num: string; title: string; children: ReactNode }) {
  return (
    <div className={p.head} data-reveal="up">
      <SectionHeading num={num}>{title}</SectionHeading>
      <p className={cx(ss.body, p.headBody)}>{children}</p>
    </div>
  );
}

/* ── 01 Task ── */
const SCOPE = ["위치와 개발 인프라", "50년 개발 연혁", "소유권·운영사 변천", "지분 구조", "생산과 저류층 관리", "2026 Brownfield 활동", "자산의 의미와 핵심 정리"];

/* ── 02 Approach ── */
const STEPS: [string, string, string][] = [
  ["Collect", "자료 정리", "유전의 위치·연혁·소유권·생산 등 흩어진 공개 자료를 모았습니다."],
  ["Structure", "구조화 · Claude", "Claude와 함께 발표 흐름을 짜고, 슬라이드마다 핵심 메시지 한 줄을 정했습니다."],
  ["Build", "HTML 제작 · Claude", "하나의 HTML 파일로 1920×1080 슬라이드, 키보드 이동, 발표자 노트까지 구현했습니다."],
  ["Review", "검토 · 수정", "내용과 표현을 직접 확인하고, 화면을 보며 수정 요청을 반복했습니다."],
];
const ANATOMY: [string, string][] = [
  ["Key message", "장마다 결론을 먼저 — 상단의 인용 한 줄"],
  ["Evidence", "지도·연표·핵심 항목으로 근거를 정리"],
  ["Source", "하단에 출처 표기"],
];

/* ── 03 Outcome ── */
const SLIDES: { n: string; src: string; title: string; alt: string }[] = [
  { n: "01", src: "/images/ai/presentation/claymore-slide-01.webp", title: "Cover", alt: "발표자료 표지: Claymore Oil Field, UK Central North Sea · Mature Producing Asset" },
  { n: "02", src: "/images/ai/presentation/claymore-slide-02.webp", title: "Overview", alt: "Overview 슬라이드: 위치 지도와 발견·첫 생산·수심·위치·상태·운영사 핵심 정보" },
  { n: "10", src: "/images/ai/presentation/claymore-slide-10.webp", title: "Key Takeaways", alt: "Key Takeaways 슬라이드: 세 가지 핵심 메시지와 한 줄 요약" },
];
const LEARNED: [string, string][] = [
  ["Faster Structure", "AI가 발표 흐름과 초안을 빠르게 잡아 주어, 내용을 검토하고 다듬는 데 더 많은 시간을 쓸 수 있었습니다."],
  ["Human Check", "사실과 수치는 원 자료로 직접 확인했습니다. 그럴듯한 문장과 정확한 내용은 다르기 때문입니다."],
  ["Easy to Share", "HTML 한 파일이라 별도 프로그램 없이 브라우저에서 열고, 수정과 공유가 쉬웠습니다."],
];

function Slide({ s, onOpen, big }: { s: (typeof SLIDES)[number]; onOpen: () => void; big?: boolean }) {
  return (
    <figure className={cx(p.slide, big && p.slideBig)}>
      <button type="button" className={p.shot} onClick={onOpen} aria-label={`슬라이드 ${s.n} ${s.title} 크게 보기`}>
        <Image src={s.src} alt={s.alt} width={1600} height={900} sizes={big ? "(max-width: 899px) 100vw, 900px" : "(max-width: 899px) 100vw, 440px"} />
        <span className={p.zoom} aria-hidden><Maximize2 size={14} /></span>
      </button>
      <figcaption><b>{s.n}</b> {s.title}</figcaption>
    </figure>
  );
}

export function AiPresentation() {
  const dlg = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const show = (i: number) => { setOpen(i); dlg.current?.showModal(); };

  return (
    <RevealScope className={p.motion}>
      <section id="task" className={cx(t.section, t.white, p.anchor)} data-section="task">
        <div className={cx(t.inner, p.taskGrid)}>
          <Head num="01" title="The Task">
            2027년도 작업계획 및 예산 검토 과정에서, 검토 대상인 Dana Claymore 유전의 일반현황을 팀 내에서 공유해야 했습니다. 영국 북해에서 50년 가까이 생산해 온 유전이라 위치, 연혁, 소유권, 생산 관리까지 살펴볼 내용이 많았습니다.
          </Head>
          <div className={p.scope} data-reveal="up" style={v({ "--i": 1 })}>
            <p className={p.kicker}>정리해야 했던 범위</p>
            <ol>{SCOPE.map((x, i) => <li key={x}><span>{String(i + 1).padStart(2, "0")}</span>{x}</li>)}</ol>
          </div>
        </div>
      </section>

      <section id="approach" className={cx(t.section, p.anchor)} data-section="approach">
        <div className={t.inner}>
          <Head num="02" title="The Approach">
            Claude와 대화하며 자료를 발표 흐름으로 구조화하고, 그 구조를 그대로 HTML 발표자료로 만들었습니다.
          </Head>
          <ol className={p.steps}>
            {STEPS.map(([en, ko, d], i) => (
              <li key={en} data-reveal="up" style={v({ "--i": i })}>
                <span className={p.stepNum}>{i + 1}</span>
                <b>{en}</b>
                <span className={p.stepKo}>{ko}</span>
                <span className={p.stepBody}>{d}</span>
              </li>
            ))}
          </ol>
          <div className={p.anatomy} data-reveal="up" style={v({ "--i": 2 })}>
            <button type="button" className={p.shot} onClick={() => show(1)} aria-label="Overview 슬라이드 크게 보기">
              <Image src={SLIDES[1].src} alt={SLIDES[1].alt} width={1600} height={900} sizes="(max-width: 899px) 100vw, 760px" />
              <span className={p.pin} style={{ left: "2.4%", top: "24.5%" }}>1</span>
              <span className={p.pin} style={{ left: "52%", top: "57%" }}>2</span>
              <span className={p.pin} style={{ left: "2.4%", top: "96%" }}>3</span>
              <span className={p.zoom} aria-hidden><Maximize2 size={14} /></span>
            </button>
            <div>
              <p className={p.kicker}>슬라이드 공통 구조</p>
              <ol className={p.anatomyList}>
                {ANATOMY.map(([en, ko], i) => <li key={en}><span className={p.pinKey}>{i + 1}</span><b>{en}</b><span>{ko}</span></li>)}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section id="outcome" className={cx(t.section, t.white, p.anchor)} data-section="outcome">
        <div className={t.inner}>
          <Head num="03" title="The Outcome">
            완성된 HTML 발표자료로 팀 내에서 발표했습니다. 브라우저에서 바로 열리고, 발표자 노트를 보며 진행할 수 있습니다.
          </Head>
          <div className={p.gallery} data-reveal="up" style={v({ "--i": 1 })}>
            <Slide s={SLIDES[0]} big onOpen={() => show(0)} />
            <div className={p.side}>
              <Slide s={SLIDES[1]} onOpen={() => show(1)} />
              <Slide s={SLIDES[2]} onOpen={() => show(2)} />
            </div>
          </div>
          <p className={p.facts} data-reveal="up" style={v({ "--i": 2 })}><b>10</b> slides <i>·</i> about <b>10</b> min <i>·</i> 팀 내 발표 <i>·</i> HTML 한 파일</p>
          <ol className={p.learned}>
            {LEARNED.map(([en, d], i) => (
              <li key={en} data-reveal="up" style={v({ "--i": i + 3 })}><b>{en}</b><span>{d}</span></li>
            ))}
          </ol>
        </div>
      </section>

      <dialog ref={dlg} className={p.dialog} aria-label="슬라이드 크게 보기" onClose={() => setOpen(null)} onClick={(e) => e.target === e.currentTarget && dlg.current?.close()}>
        {open !== null && <Image src={SLIDES[open].src} alt={SLIDES[open].alt} width={1600} height={900} sizes="94vw" className={p.full} />}
        <button type="button" className={p.close} onClick={() => dlg.current?.close()} aria-label="닫기"><X size={20} /></button>
      </dialog>
    </RevealScope>
  );
}
