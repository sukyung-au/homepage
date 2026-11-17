import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { ImageSlot } from "@/components/ds/ImageSlot";
import { sceneStyles as ss } from "@/components/site/scene";
import { RevealScope } from "@/components/technology/RevealScope";
import { FeedbackStory } from "./odr/FeedbackStory";
import { OdrDashboard } from "./odr/OdrDashboard";
import p from "./ProductionReport.module.css";

/**
 * AI Technology topic 03 — the Black Gold daily production report (ODR) automation, told as one story:
 * the problem → the tool → the dashboard → how feedback shaped it → what it taught.
 *
 * Public-page rules: no internal paths or operator comments. The 01 ODR / Excel captures are shown unmasked at the
 * owner's request; real captures in 02 and 04-A
 * are masked before they are committed. The dashboard (03) and the
 * small charts in 04 run on synthetic data (odr/demoData.ts) with the program's real metric definitions
 * (odr/metrics.ts). Program screenshots (02) are real captures with internal paths and ODR values masked.
 */

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

function Head({ num, label, title, children, aside }: { num: string; label: string; title: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <div className={p.head} data-reveal="up">
      <div className={ss.eyebrow}><span>{num}</span><span className={ss.eyebrowRule} /><span className={ss.eyebrowLabel}>{label}</span>{aside}</div>
      <h2 className={p.h2}>{title}</h2>
      <p className={p.sub}>{children}</p>
    </div>
  );
}

/* ── 01 Problem: concept graphic (no figures) ── */
const PAINS: [string, string][] = [
  ["반복 입력", "매일 같은 항목을 PDF에서 찾아 Excel에 옮겨 적는 작업"],
  ["오류·누락 가능성", "손으로 옮기는 과정에서 생기는 오타와 빠진 값"],
  ["추세 확인의 번거로움", "날짜별 변화를 보려면 표를 따로 정리해 그래프를 만들어야 함"],
];

function ProblemGraphic() {
  return (
    <div className={p.flow} data-reveal="up">
      <figure className={p.docFig}>
        <div className={p.docFrame} style={{ aspectRatio: "784 / 490" }}>
          <Image src="/images/ai/production-report/odr-report.webp" alt="ODR(일일 생산보고서)의 Production 표: Bitumen, Produced Water, Steam Injection 등 항목별 단위와 값이 이어지는 보고서" fill sizes="(max-width: 899px) 100vw, 40vw" />
          <span className={p.mark} style={{ left: "2.5%", top: "11.4%", width: "96%", height: "7.8%" }} aria-hidden />
        </div>
        <figcaption><b>ODR · PDF</b> 일일 생산보고서</figcaption>
      </figure>
      <div className={p.lane} aria-hidden>
        <span className={p.laneLabel}>Manual Input</span>
        <span className={p.laneTrack}>{[0, 1, 2].map((i) => <i key={i} style={{ "--k": i } as CSSProperties} />)}</span>
        <span className={p.laneNote}>매일 · 항목마다</span>
      </div>
      <figure className={p.docFig}>
        <div className={p.docFrame} style={{ aspectRatio: "797 / 498" }}>
          <Image src="/images/ai/production-report/odr-excel.webp" alt="기존 Excel 집계표: 날짜별 행에 Bitumen, Pipeline Dilbit, Steam to Wells 등 항목을 열마다 옮겨 적는 표" fill sizes="(max-width: 899px) 100vw, 40vw" />
          <span className={`${p.mark} ${p.markLate}`} style={{ left: "18.8%", top: "27%", width: "20.8%", height: "73%" }} aria-hidden />
        </div>
        <figcaption><b>Excel</b> 기존 집계표</figcaption>
      </figure>
    </div>
  );
}

/* ── 02 Solution ── */
const STEPS: [string, string, string][] = [
  ["01", "PDF 확인", "ODR 폴더를 지정하면 날짜별 PDF를 읽고, 저장할 날짜와 확인이 필요한 날짜를 나눠 보여 줍니다."],
  ["02", "Data Validation", "항목마다 PDF 원문과 입력값을 나란히 놓고, 미추출 · 수동 입력 · 수정한 값을 색으로 구분합니다."],
  ["03", "Excel Update", "기존 Excel 양식에 새 날짜만 추가합니다. 저장 전에는 항상 backup 폴더에 자동 백업합니다."],
];

/* ── 05 Outcome: where it started, what changed, what it taught about using AI ── */
const LESSONS: [string, string, string][] = [
  ["Starting Point", "반복 업무를 줄이자", "매일 반복되는 ODR 수기 입력 업무를 자동화하는 것이 처음 목표였습니다."],
  ["What Changed", "실제로 활용할 수 있게 만들자", "데이터 검증, 기존 업무 흐름, 실무자 피드백까지 고려하며 프로그램을 개선했습니다."],
  ["Responsible AI", "정보보호를 고려한 AI 활용", "AI를 활용한 개발 과정에서 내부정보의 노출 위험을 인식하고, 제공하는 정보를 최소화하는 중요성을 배웠습니다."],
];

export function ProductionReport() {
  return (
    <RevealScope className={p.motion}>
      <section id="problem" className={cx(p.sec, p.white)} data-section="problem">
        <div className={p.inner}>
          <Head num="01" label="The Problem" title="Every Field. Every Day.">반복적인 ODR 수기 집계 업무에서 발견한 문제</Head>
          <p className={p.odrNote} data-reveal="up"><b>ODR</b>(Oil Daily Report, 일일 생산보고서)은 유전의 생산·주입·운영 데이터를 기록한 문서입니다. 기존에는 이 보고서의 데이터를 매일 Excel 집계표에 직접 입력해야 했습니다.</p>
          <ProblemGraphic />
          <p className={p.maskNote}>실제 문서 화면</p>
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
              <figcaption className={p.shotCap}>실제 프로그램 화면 · 사내 경로와 ODR 수치는 가림 처리</figcaption>
            </figure>
            <div className={p.solutionSide}>
              <ol className={p.steps}>
                {STEPS.map(([n, t, d], i) => (
                  <li key={n} data-reveal="up" style={{ "--i": i } as CSSProperties}><span className={p.stepNum}>{n}</span><b>{t}</b><span>{d}</span></li>
                ))}
              </ol>
              <figure className={p.mini} data-reveal="up" style={{ "--i": 3 } as CSSProperties}>
                <div className={p.shotFrame} style={{ aspectRatio: "1100 / 400" }}>
                  <ImageSlot id="odr-gui-dashboard" src="/images/ai/production-report/odr-gui-dashboard-tab.webp" alt="ODR 자동 집계 프로그램의 대시보드 탭: 대시보드 열기(브라우저) 버튼" placeholder="대시보드 탭" sizes="(max-width: 899px) 100vw, 30vw" />
                </div>
                <figcaption>프로그램의 대시보드 탭 → 버튼 하나로 브라우저 대시보드 열기</figcaption>
              </figure>
            </div>
          </div>
          <p className={p.facts} data-reveal="up">기존 Excel 양식 유지 · 체크한 날짜만 저장 · 저장 전 자동 백업 · Python 설치 없이 실행되는 Windows EXE</p>
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
          <Head num="05" label="Outcome & Reflection" title="Beyond Automation.">기술 구현에서 실무 문제 해결로</Head>
          <ol className={p.lessons}>
            {LESSONS.map(([label, title, d], i) => (
              <li key={label} data-reveal="up" style={{ "--i": i } as CSSProperties}>
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
