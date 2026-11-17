"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ImageSlot } from "@/components/ds/ImageSlot";
import { DAYS, PLANT_DAYS, WELLS } from "./demoData";
import { LineChart, type ChartLine } from "./LineChart";
import { PLANT, fmt, pointChange, selectionTotal, signed, wellValue, type Val } from "./metrics";
import f from "./FeedbackStory.module.css";

/**
 * 04 Feedback & Evolution — three improvements in one pinned view. On desktop the view stays in place while the
 * reader scrolls through a short runway (A → B → C); the step buttons jump to a step by scrolling to it, so the
 * page never traps or skips. Narrow screens, short screens and reduced motion get the three steps stacked.
 *
 * Status labels: "구현" means the feature is in the program's code (checked in the dashboard HTML). "Demo" (04-C ③
 * range comparison) is reproduced on this site only, until the program's version is confirmed. Neither
 * claim a business-side validation.
 */

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");
const MOTION = "(min-width: 900px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)";
const ALL = DAYS.map((_, i) => i);
const LAST60 = ALL.slice(-60);
const COLORS = ["#2a78d6", "#eb6834", "#1baf7a", "#6250d6", "#c98500", "#d55181", "#1c5cab", "#12a4d9", "#8a4fbf", "#008300", "#b8322a", "#5b6b7e"];

const STEPS = [
  { key: "A", title: "Simplifying the Experience", kicker: "1차 실무자 피드백 — 사용성 개선" },
  { key: "B", title: "Expanding Analytical Capabilities", kicker: "주도적인 기능 확장 — Well 비교 방식" },
  { key: "C", title: "Refining with Field Feedback", kicker: "2차 사업부서 피드백 — 실무 분석 요구" },
];

function Status() {
  return <span className={f.status} title="현재 프로그램 코드에 반영된 기능">구현</span>;
}

function Kicker({ k }: { k: number }) {
  return (
    <div className={f.kicker}>
      <span className={f.kickerKey}>04-{STEPS[k].key}</span>
      <span>{STEPS[k].kicker}</span>
      {k < 2 && <Status />}
    </div>
  );
}

/* ── A · simplify ── */
const A_METRIC = PLANT[0];
const A_LINES: ChartLine[] = [{ name: A_METRIC.label, color: A_METRIC.color, values: PLANT_DAYS.map((d) => A_METRIC.value(d)), tip: (_, v) => <><b>{fmt(v, 0)}</b> {A_METRIC.unit}</> }];

function SceneA() {
  const m = A_METRIC, lines = A_LINES;
  return (
    <div className={f.sceneA}>
      <div className={f.textCol}>
        <p className={f.label}>피드백 요지</p>
        <p className={f.voice}>여러 지표를 한꺼번에 보기보다, 필요한 지표를 골라 크게 보고 싶다.</p>
        <p className={f.label}>바뀐 점</p>
        <ul className={f.points}>
          <li>선택한 지표 하나를 큰 그래프로</li>
          <li>기간 선택 (7일 ~ 전체)</li>
          <li>툴팁으로 날짜별 수치 확인</li>
          <li>한 화면에 담는 정보의 양을 줄임</li>
        </ul>
      </div>
      <div className={f.ba}>
        <figure className={f.before}>
          <div className={f.frame} style={{ aspectRatio: "1466 / 641" }}>
            <ImageSlot id="odr-dashboard-before" src="/images/ai/production-report/odr-dashboard-before.webp" alt="개선 전 대시보드: 여러 지표를 작은 카드 여섯 개에 한꺼번에 보여 주는 화면" placeholder="개선 전 대시보드" sizes="(max-width: 899px) 100vw, 30vw" />
          </div>
          <figcaption>Before · 실제 화면 (수치 가림)</figcaption>
        </figure>
        <span className={f.arrow} aria-hidden>→</span>
        <figure className={f.after}>
          <div className={f.chartHead}><b>{m.label}</b> {m.unit}</div>
          <LineChart days={DAYS} idx={ALL} lines={lines} axes={[m.unit]} digits={0} height={190} compact label="개선 후: 선택한 지표 하나를 크게 보여 주는 그래프 (가상 데이터)" />
          <figcaption>After · Demo</figcaption>
        </figure>
      </div>
    </div>
  );
}

/* ── B · expand ── */
const B_WELLS = WELLS.filter((w) => ["A/A-2", "A/A-4", "B/B-1"].includes(w.id));
const B_LINES: ChartLine[] = B_WELLS.map((w) => ({ name: w.name, color: COLORS[WELLS.indexOf(w)], values: DAYS.map((_, i) => wellValue("oil", w.raw, i)), tip: (_, v) => <><b>{fmt(v, 0)}</b> bbl/d</> }));
const B_TOTAL: ChartLine[] = [{ name: "Oil 합계", color: "#0B1A2C", values: DAYS.map((_, i) => selectionTotal("oil", B_WELLS.map((w) => w.raw), i)[0]), tip: (_, v) => <><b>{fmt(v, 0)}</b> bbl/d</> }];

function SceneB() {
  const overlay = B_LINES, total = B_TOTAL;
  return (
    <div className={f.sceneB}>
      <p className={f.question}>여러 Well의 추세를, 목적에 맞게 비교할 수 있을까?</p>
      <div className={f.modes}>
        <figure>
          <figcaption><b>Split</b><span>Well별 개별 그래프</span></figcaption>
          <div className={f.splitMini}>
            {overlay.map((l) => <LineChart key={l.name} days={DAYS} idx={LAST60} lines={[l]} axes={["bbl/d"]} digits={0} height={56} bare label={`${l.name} Oil (가상 데이터)`} />)}
          </div>
        </figure>
        <figure>
          <figcaption><b>Overlay</b><span>한 그래프에 겹쳐 비교</span></figcaption>
          <LineChart days={DAYS} idx={LAST60} lines={overlay} axes={["bbl/d"]} digits={0} height={184} bare label="Well 3개 Oil Overlay (가상 데이터)" />
        </figure>
        <figure>
          <figcaption><b>Selection Total</b><span>선택한 Well의 합계</span></figcaption>
          <LineChart days={DAYS} idx={LAST60} lines={total} axes={["bbl/d"]} digits={0} height={184} bare label="선택한 Well 3개 Oil 합계 (가상 데이터)" />
        </figure>
      </div>
      <p className={f.path}><span>프로그램 안의 그래프</span><i>→</i><span>표현의 한계</span><i>→</i><b>브라우저 기반 대시보드로 확장</b></p>
    </div>
  );
}

/* ── C · refine ── */
const DR = PLANT.find((m) => m.key === "dil_ratio")!;
const C_RATIO: ChartLine[] = [{ name: DR.label, color: DR.color, values: PLANT_DAYS.map((d) => DR.value(d)), tip: (_, v) => <><b>{fmt(v, 1)}</b> %</> }];
const C_MANY: ChartLine[] = WELLS.map((w, k) => ({ name: w.name, color: COLORS[k], values: DAYS.map((_, i) => wellValue("oil", w.raw, i)), tip: (_, v) => <><b>{fmt(v, 0)}</b> bbl/d</> }));

/* ③ range comparison — its own short synthetic series so the worked example reads exactly:
   11-01 = 10,000 bbl/d → 11-10 = 11,000 bbl/d (+1,000 bbl/d, +10.0 %) */
const R_DAYS = Array.from({ length: 31 }, (_, k) => new Date(Date.UTC(2026, 9, 20 + k)).toISOString().slice(0, 10));
const R_FIXED: Record<string, number> = { "2026-11-01": 10000, "2026-11-10": 11000 };
const R_VALUES: Val[] = R_DAYS.map((d, k) => R_FIXED[d] ?? Math.round(10000 + (k - 12) * 105 + 160 * Math.sin(k / 2.3) + 70 * Math.cos(k * 1.7)));
const R_IDX = R_DAYS.map((_, i) => i);
const R_START: [number, number] = [R_DAYS.indexOf("2026-11-01"), R_DAYS.indexOf("2026-11-10")];
const R_LINE: ChartLine[] = [{ name: "Bitumen", color: "#2a78d6", values: R_VALUES, tip: (_, v) => <><b>{fmt(v, 0)}</b> bbl/d</> }];
const mdKo = (d: string) => `${+d.slice(5, 7)}월 ${+d.slice(8)}일`;

function RangeCompare() {
  const [range, setRange] = useState<[number, number]>(R_START);
  const [a, b] = range[0] <= range[1] ? range : [range[1], range[0]];
  const v0 = R_VALUES[a], v1 = R_VALUES[b];
  const { diff, pct } = pointChange(v0, v1);
  const tone = diff === null || diff === 0 ? "" : diff > 0 ? f.up : f.down;
  return (
    <>
      <LineChart days={R_DAYS} idx={R_IDX} lines={R_LINE} axes={["bbl/d"]} digits={0} height={176} compact range={range} onRange={setRange}
        label="Bitumen 추세에서 드래그로 시작일과 종료일을 고르는 그래프 (가상 데이터)" />
      <dl className={f.readout} aria-live="polite">
        <div><dt>선택 기간</dt><dd>{mdKo(R_DAYS[a])} ~ {mdKo(R_DAYS[b])}</dd></div>
        <div><dt>시작값</dt><dd>{fmt(v0, 0)} <small>bbl/d</small></dd></div>
        <div><dt>종료값</dt><dd>{fmt(v1, 0)} <small>bbl/d</small></dd></div>
        <div><dt>변화량</dt><dd className={tone}>{diff === null ? "계산 불가" : <>{signed(diff, 0)} <small>bbl/d</small></>}</dd></div>
        <div><dt>증감률</dt><dd className={tone}>{pct === null ? "계산 불가" : `${signed(pct, 1)}%`}</dd></div>
      </dl>
      <p className={f.cap}>Demo · 가상 데이터 · 그래프를 드래그해 보세요</p>
    </>
  );
}

const REQUESTS: { short: string; voice: string; answer: string; formula: string; status: "done" | "demo"; body: () => ReactNode }[] = [
  { short: "D/B 비율 그래프", voice: "Diluent / Bitumen 비율이 날짜별로 어떻게 변하는지 보고 싶다.", answer: "D/B 비율 지표 추가",
    formula: "Diluent Component ÷ Bitumen Component × 100 (%)", status: "done",
    body: () => <><LineChart days={DAYS} idx={ALL} lines={C_RATIO} axes={["%"]} digits={1} height={176} compact label="Diluent/Bitumen 비율 추세 (가상 데이터)" /><p className={f.cap}>Demo · 가상 데이터</p></> },
  { short: "Overlay 표시 제한 해제", voice: "선택한 Well을 개수 제한 없이 한 그래프에서 비교하고 싶다.", answer: "Overlay 표시 개수 제한 해제",
    formula: "개선 전: 일부 Well만 표시 → 개선 후: 선택한 Well 모두 표시", status: "done",
    body: () => <><LineChart days={DAYS} idx={LAST60} lines={C_MANY} axes={["bbl/d"]} digits={0} height={176} compact label="Well 12개 Oil Overlay (가상 데이터)" /><p className={f.cap}>Demo · 선택한 Well {WELLS.length}개 모두 표시</p></> },
  { short: "드래그 구간 비교", voice: "그래프에서 기간을 드래그하면, 시작점과 종료점의 값 차이와 증감률을 바로 확인하고 싶다.", answer: "드래그 구간 비교",
    formula: "변화량 = 종료일 값 − 시작일 값 · 증감률 = 변화량 ÷ 시작일 값 × 100 — 기간 누적량이 아닌 두 날짜의 값 비교", status: "demo",
    body: () => <RangeCompare /> },
];

function SceneC() {
  const [k, setK] = useState(0);
  return (
    <div className={f.sceneC}>
      <ol className={f.reqList} role="tablist" aria-label="사업부서 요청">
        {REQUESTS.map((r, i) => (
          <li key={r.short}>
            <button type="button" role="tab" aria-selected={k === i} className={k === i ? `${f.reqItem} ${f.reqOn}` : f.reqItem} onClick={() => setK(i)}>
              <span className={f.reqNum}>0{i + 1}</span>
              <span className={f.reqShort}>{r.short}</span>
              {r.status === "done" ? <span className={f.status}>구현</span> : <span className={f.statusDemo} title="홈페이지에서 가상 데이터로 재현한 화면">Demo</span>}
            </button>
          </li>
        ))}
      </ol>
      <div className={f.reqStage}>
        {REQUESTS.map((r, i) => (
          <div key={r.short} role="tabpanel" className={k === i ? `${f.reqPanel} ${f.reqPanelOn}` : f.reqPanel} aria-hidden={k !== i} inert={k !== i}>
            <p className={f.label}>요청 요지</p>
            <p className={f.voice}>{r.voice}</p>
            <p className={f.label}>반영</p>
            <p className={f.answer}>{r.answer} <span className={f.formula}>{r.formula}</span></p>
            {r.body()}
          </div>
        ))}
      </div>
    </div>
  );
}

const SCENES = [SceneA, SceneB, SceneC];

export function FeedbackStory({ head }: { head: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const [motion, setMotion] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const mq = matchMedia(MOTION);
    const on = () => setMotion(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!motion || !el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const total = el.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -el.getBoundingClientRect().top / total)) : 0;
      setStep(p < 1 / 3 ? 0 : p < 2 / 3 ? 1 : 2);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [motion]);

  /** Jump to a step by scrolling to the middle of its share of the runway */
  const go = (k: number) => {
    const el = track.current;
    if (!motion || !el) { document.getElementById(`feedback-${STEPS[k].key}`)?.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (el.offsetHeight - window.innerHeight) * ((k + 0.5) / 3), behavior: "smooth" });
  };

  return (
    <div ref={track} className={cx(f.track, motion && f.pinned)}>
      <div className={f.sticky}>
        <div className={f.inner}>
          {head}
          <div className={f.layout}>
            <nav className={f.nav} aria-label="개선 단계">
              {STEPS.map((st, k) => (
                <button key={st.key} type="button" className={cx(f.navItem, motion && step === k && f.navOn)} aria-current={motion && step === k ? "step" : undefined} onClick={() => go(k)}>
                  <span className={f.navKey}>04-{st.key}</span>
                  <span className={f.navTitle}>{st.title}</span>
                  <span className={f.navSub}>{st.kicker}</span>
                </button>
              ))}
              <p className={f.legend}><span className={f.status}>구현</span> 현재 프로그램 코드에 반영된 기능입니다. 사업부서 검증 완료를 뜻하지는 않습니다.</p>
            </nav>
            <div className={f.scenes}>
              {SCENES.map((Scene, k) => (
                <article key={k} id={`feedback-${STEPS[k].key}`} className={cx(f.scene, motion && step === k && f.sceneOn)} aria-hidden={motion && step !== k} inert={motion && step !== k}>
                  <Kicker k={k} />
                  <h3 className={f.sceneTitle}>{STEPS[k].title}</h3>
                  <Scene />
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
