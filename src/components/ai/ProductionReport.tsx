import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { ImageSlot } from "@/components/ds/ImageSlot";
import { sceneStyles as ss } from "@/components/site/scene";
import { RevealScope } from "@/components/technology/RevealScope";
import { FeedbackStory } from "./odr/FeedbackStory";
import { OdrDashboard } from "./odr/OdrDashboard";
import { OpenDashboard } from "./odr/OpenDashboard";
import p from "./ProductionReport.module.css";

/**
 * AI Technology topic 03 — the Black Gold daily production report (ODR) automation, told as one story:
 * the problem → the tool → the dashboard → how feedback shaped it → what it taught.
 *
 * Public-page rules: no field or country names, internal paths or operator comments. The 01 ODR / Excel images keep
 * the real layouts but carry invented values and dates (marked "Illustrative Data"); real captures in 02 and 04-A
 * are masked before they are committed. The dashboard (03) and the
 * small charts in 04 run on synthetic data (odr/demoData.ts) with the program's real metric definitions
 * (odr/metrics.ts). Program screenshots (02) are real captures with internal paths and ODR values masked.
 */

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

function Head({ num, label, title, children, aside }: { num: string; label: string; title: string; children?: ReactNode; aside?: ReactNode }) {
  return (
    <div className={p.head} data-reveal="up">
      <div className={ss.eyebrow}><span>{num}</span><span className={ss.eyebrowRule} /><span className={ss.eyebrowLabel}>{label}</span>{aside}</div>
      <h2 className={p.h2}>{title}</h2>
      {children && <p className={p.sub}>{children}</p>}
    </div>
  );
}

/* ── 01 Problem: concept graphic (no figures) ── */
const PAINS: [string, string][] = [
  ["반복 입력", "매일 같은 항목(약 160개)을 PDF에서 찾아 수기로 Excel에 입력하는 반복 작업"],
  ["오류·누락 가능성", "손으로 옮기는 과정에서 생기는 오타와 빠진 값"],
  ["추세 확인의 번거로움", "날짜별 변화를 보려면 표를 따로 정리해 그래프를 만들어야 함"],
];

function ProblemGraphic() {
  return (
    <div className={p.flow} data-reveal="up">
      <figure className={p.docFig}>
        <div className={p.docFrame} style={{ aspectRatio: "784 / 434" }}>
          <Image src="/images/ai/production-report/odr-report-illustrative.webp" alt="ODR(일일 생산보고서)의 Production 표 양식: Bitumen, Produced Water, Steam Injection 등 항목별 단위와 값 (수치는 예시 데이터)" fill sizes="(max-width: 899px) 100vw, 40vw" />
          <span className={p.mark} style={{ left: "2.5%", top: "12.9%", width: "96%", height: "8.4%" }} aria-hidden />
        </div>
        <figcaption><b>ODR · PDF</b> 일일 생산보고서 · 예시 데이터</figcaption>
      </figure>
      <div className={p.lane} aria-hidden>
        <span className={p.laneLabel}>Manual Input</span>
        <span className={p.laneTrack}>{[0, 1, 2].map((i) => <i key={i} style={{ "--k": i } as CSSProperties} />)}</span>
        <span className={p.laneNote}>매일 · 항목마다</span>
      </div>
      <figure className={p.docFig}>
        <div className={p.docFrame} style={{ aspectRatio: "797 / 441" }}>
          <Image src="/images/ai/production-report/odr-excel-illustrative.webp" alt="기존 Excel 집계표 양식: 날짜별 행에 Bitumen, Pipeline Dilbit, Steam to Wells 등 항목을 열마다 옮겨 적는 표 (날짜와 수치는 예시 데이터)" fill sizes="(max-width: 899px) 100vw, 40vw" />
          <span className={`${p.mark} ${p.markLate}`} style={{ left: "18.8%", top: "30.8%", width: "20.6%", height: "69.2%" }} aria-hidden />
        </div>
        <figcaption><b>Excel</b> 기존 집계표 · 예시 데이터</figcaption>
      </figure>
    </div>
  );
}

/* ── 02 Solution ── */
const STEPS: [string, string, string][] = [
  ["01", "PDF 확인", "ODR 폴더를 지정하면 날짜별 PDF를 읽고 저장할 날짜와 확인이 필요한 날짜를 나눠 보여 줍니다."],
  ["02", "Data Validation", "항목마다 PDF 원문과 입력값을 나란히 놓고 미추출 · 수동 입력 · 수정한 값을 색으로 구분합니다."],
  ["03", "Excel Update", "기존 Excel 양식에 새 날짜만 추가합니다."],
];

/* ── 05 Outcome: repetitive work improved → built together with the people who use it → a team-level contribution ── */
/** Mini line illustrations for the three 05 items — one style: 96×72 viewBox, blue + light blue-grey */
const MINI: ReactNode[] = [
  // 01 a report page → an arrow → spreadsheet cells
  <>
    <path d="M8 12h20l6 6v32H8z" className={p.miniSoft} />
    <path d="M28 12v6h6" className={p.miniLine} />
    <path d="M13 26h15M13 32h15M13 38h10" className={p.miniLine} />
    <g className={p.miniMove}><path d="M40 31h14" className={p.miniBlue} /><path d="M50 27l4 4-4 4" className={p.miniBlue} /></g>
    <rect x="60" y="16" width="28" height="30" rx="1.5" className={p.miniSoft} />
    <path d="M60 26h28M60 36h28M69.3 16v30M78.6 16v30" className={p.miniLine} />
    <rect x="69.3" y="26" width="9.3" height="10" className={p.miniFill} />
  </>,
  // 02 two speech bubbles in conversation
  <g key="talk">
    <path d="M14 12h38a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H30l-9 8v-8h-7a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4z" className={p.miniSoft} />
    <path d="M20 22h26M20 29h17" className={p.miniLine} />
    <path d="M46 30h36a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4h-6v8l-9-8H46a4 4 0 0 1-4-4V34a4 4 0 0 1 4-4z" className={p.miniSoft} />
    <path d="M52 40h26M52 47h16" className={p.miniBlue} />
  </g>,
  // 03 a report document with a check
  <g key="report">
    <path d="M28 8h28l10 10v46H28z" className={p.miniSoft} />
    <path d="M56 8v10h10" className={p.miniLine} />
    <path d="M35 24h16M35 31h24M35 38h24M35 45h12" className={p.miniLine} />
    <circle cx="64" cy="54" r="11" className={p.miniSoft} />
    <path d="M59 54.5l3.5 3.5 6.5-7" className={p.miniBlue} />
  </g>,
];

const LESSONS: [string, string, ReactNode][] = [
  ["Problem Solving", "반복 업무의 개선", <>매일 반복되는 생산일보 수기 입력 업무를 자동화하고<br className="br-d" /> 데이터 검증과 분석 기능까지 구현</>],
  ["Communication & Collaboration", "소통을 통한 발전", <>실무자 및 사업부서의 의견을 반영하며 실제 업무에 필요한 기능을<br className="br-d" /> 함께 고민하고 개선</>],
  ["Organizational Contribution", "조직의 업무개선에 기여", <>담당 유전의 생산일보 자동화 프로그램이 팀 차원의 AI 활용 업무개선<br className="br-d" /> 사례 중 하나로 2026년 경영실적보고서에 반영될 예정</>],
];

export function ProductionReport() {
  return (
    <RevealScope className={p.motion}>
      <section id="problem" className={cx(p.sec, p.white)} data-section="problem">
        <div className={p.inner}>
          <Head num="01" label="The Problem" title="Every Field. Every Day." />
          <p className={p.odrNote} data-reveal="up"><b>ODR</b>(Oil Daily Report, 일일 생산보고서)은 해외 유전 현장에서 매일 생산·주입·운영 현황을 기록하는 보고서</p>
          <ProblemGraphic />
          <p className={p.maskNote}>실제 문서 양식 · 수치와 날짜는 실제 데이터와 무관한 예시 데이터(Illustrative Data)</p>
          <ol className={p.pains}>
            {PAINS.map(([t, d], i) => (
              <li key={t} data-reveal="up" style={{ "--i": i } as CSSProperties}><b>{t}</b><span>{d}</span></li>
            ))}
          </ol>
        </div>
      </section>

      <section id="solution" className={p.sec} data-section="solution">
        <div className={p.inner}>
          <Head num="02" label="The Solution" title="One Tool. From PDF to Excel.">PDF 추출부터 검증과 Excel 저장까지 하나의 프로그램으로</Head>
          <div className={p.solution}>
            <figure className={p.shot} data-reveal="up">
              <div className={p.shotFrame} style={{ aspectRatio: "1681 / 905" }}>
                <ImageSlot id="odr-gui-import" src="/images/ai/production-report/odr-gui-import.webp" alt="ODR 자동 집계 프로그램의 가져오기 화면: 파일 위치, 날짜별 처리 목록, PDF 원문과 입력값 비교 표, Excel에 저장 버튼" placeholder="프로그램 가져오기 화면" sizes="(max-width: 899px) 100vw, 66vw" />
                <span className={p.marker} style={{ left: "9%", top: "10.6%" }}>01</span>
                <span className={p.marker} style={{ left: "67.2%", top: "47%" }}>02</span>
                <span className={p.marker} style={{ left: "77%", top: "94.3%" }}>03</span>
              </div>
              <figcaption className={p.shotCap}>실제 프로그램 화면 · 사내 경로, 유전명, ODR 수치는 가림 처리</figcaption>
            </figure>
            <div className={p.solutionSide}>
              <ol className={p.steps}>
                {STEPS.map(([n, t, d], i) => (
                  <li key={n} data-reveal="up" style={{ "--i": i } as CSSProperties}><span className={p.stepNum}>{n}</span><b>{t}</b><span>{d}</span></li>
                ))}
              </ol>
              <OpenDashboard style={{ "--i": 3 } as CSSProperties} />
            </div>
          </div>
          <p className={p.facts} data-reveal="up">Python 설치 없이 실행되는 Windows EXE</p>
        </div>
      </section>

      <section id="dashboard" className={cx(p.sec, p.white, p.secDash)} data-section="dashboard">
        <div className={p.inner}>
          <Head num="03" label="The Dashboard" title="From Data Entry to Data Insight." aside={<span className={p.demo}>Demo · Synthetic Data</span>}>
            집계된 데이터를 확인하는 것을 넘어 비교하고 분석할 수 있도록
          </Head>
          <OdrDashboard />
          <p className={p.demoNote}>실제 프로그램의 지표 정의와 계산 규칙을 그대로 쓰고, 값은 모두 가상 데이터입니다.</p>
        </div>
      </section>

      <section id="before-after" className={cx(p.sec, p.secStory)} data-section="before-after">
        <FeedbackStory
          head={<Head num="04" label="Feedback & Evolution" title="Built with Feedback. Improved for Practice.">실무자의 의견을 반영하며 발전시킨 프로그램</Head>}
        />
      </section>

      <section id="outcome" className={cx(p.sec, p.white, p.secOutcome)} data-section="outcome">
        <div className={p.inner}>
          <Head num="05" label="Outcome & Reflection" title="Beyond Automation.">업무자동화를 넘어, 협업과 조직 기여로</Head>
          <ol className={p.lessons}>
            {LESSONS.map(([label, title, d], i) => (
              <li key={label} data-reveal="up" style={{ "--i": i } as CSSProperties}>
                <svg className={p.mini} viewBox="0 0 96 72" aria-hidden>{MINI[i]}</svg>
                <span className={p.lessonLabel}><span>{String(i + 1).padStart(2, "0")}</span>{label}</span>
                <b>{title}</b>
                <span className={p.lessonBody}>{d}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </RevealScope>
  );
}
