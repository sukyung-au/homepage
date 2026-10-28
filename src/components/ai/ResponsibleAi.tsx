import Link from "next/link";
import type { ReactNode } from "react";
import { sceneStyles as ss } from "@/components/site/scene";
import { Details } from "@/components/technology/fundamentals/Details";
import f from "@/components/technology/fundamentals/Fundamentals.module.css";
import { SectionHeading, topicStyles as t } from "@/components/technology/TopicParts";
import g from "./GenerativeAi.module.css";
import r from "./ResponsibleAi.module.css";

/**
 * AI Technology topic 04 — the rules actually kept while building this site (CLAUDE.md, page source lists,
 * conceptual figures, image README files) and directions for using AI at work. Risk terms follow NIST AI 600-1.
 * Company-specific security rules are not described here: the page only says they take precedence.
 */

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

/* ── 01 Verify ── */
const VERIFY: [string, string][] = [
  ["Draft", "AI가 공개 자료를 찾아 설명 초안을 씁니다."],
  ["Cross-check", "용어집, 업계 표준(PRMS 등), 개발사 문서처럼 신뢰할 수 있는 공개 자료와 대조합니다."],
  ["Cite", "실제로 열어 확인한 자료만 페이지 끝 출처 목록에 남깁니다."],
  ["Cut or Soften", "출처로 확인되지 않는 내용은 빼거나, 단정하지 않는 표현으로 바꿉니다."],
];
const CUTS: [string, string][] = [
  ["“가장 널리 쓰이는 시뮬레이터”", "사용 비율을 뒷받침할 출처가 없어 삭제"],
  ["소프트웨어의 특징 설명", "각 개발사가 공개한 제품 설명의 범위로 제한"],
  ["열리지 않는 출처 링크", "접속해 내용을 확인할 수 있는 자료로 교체"],
];

/* ── 02 Numbers ── */
const NUMBER_RULES: [string, string][] = [
  ["Sourced", "수치는 출처에서 확인한 값만 씁니다."],
  ["Dated", "변하는 값(예: 커밋 수)은 기준일을 함께 적습니다."],
  ["Labelled", "추정치는 ‘추정’이라고 밝히고 추정 근거를 함께 적습니다."],
  ["Value-free Figures", "개념을 설명하는 그래프에는 축의 수치를 넣지 않습니다."],
];

/* ── 03 Data ── */
const NO_INPUT = ["실제 생산·시험 자료의 원본", "공개되지 않은 계약·경제성·평가 자료", "임직원과 거래처의 개인정보", "내부 시스템 화면, 계정과 접속 정보"];
const PUBLIC_RULES: [string, string][] = [
  ["Anonymized Examples", "업무 자동화 사례는 실제 생산 자료 대신 익명화한 예시와 가상 데이터로 보여 줍니다."],
  ["Fictional Images", "AI 생성 이미지는 가상의 장면이며, 실제 회사·현장·로고·글자를 재현하지 않도록 지시했습니다."],
  ["Recorded Provenance", "이미지마다 생성 날짜, 사용 도구, 프롬프트를 기록 파일로 남겼습니다."],
];

/* ── 04 Ahead ── */
const AHEAD: { title: string; body: string; href?: string; link?: string }[] = [
  { title: "Automate Repetitive Work", body: "문서를 읽어 표에 옮겨 적는 것처럼 규칙이 분명한 반복 업무부터 자동화를 넓혀 갈 수 있습니다.", href: "/ai-technology/production-report", link: "03 Daily Production Report" },
  { title: "Find and Organize Knowledge", body: "해외 논문과 기술 자료를 찾고 요약하는 일에 AI 검색·리서치 도구를 쓰되, 원문 확인을 절차로 묶어 둡니다.", href: "/ai-technology/generative-ai", link: "01 Generative AI at Work" },
  { title: "Draft Faster, Decide Carefully", body: "보고서와 설명 자료의 초안은 AI로 빠르게 만들고, 내용의 정확성과 공개 범위는 사람이 확정합니다." },
];
const HUMAN = ["매장량과 자원량의 평가", "개발·투자 의사결정", "안전과 환경에 관한 판단", "외부로 나가는 자료의 최종 확인"];

const SOURCES: [string, string][] = [
  ["NIST AI 600-1 — Generative Artificial Intelligence Profile (2024)", "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf"],
  ["NIST — AI Risk Management Framework", "https://www.nist.gov/itl/ai-risk-management-framework"],
  ["Wikipedia — Hallucination (artificial intelligence)", "https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence)"],
];

function Head({ num, title, children }: { num: string; title: string; children: ReactNode }) {
  return (
    <div className={g.head}>
      <SectionHeading num={num}>{title}</SectionHeading>
      <p className={cx(ss.body, g.headBody)}>{children}</p>
    </div>
  );
}

export function ResponsibleAi() {
  return (
    <>
      <section id="verify" className={cx(t.section, t.white, g.anchor)} data-section="verify">
        <div className={t.inner}>
          <Head num="01" title="Verify, Then Trust">
            AI가 쓴 기술 설명은 그럴듯해 보여도 틀릴 수 있습니다. 그래서 이 사이트의 기술 내용은 모두 공개 자료와 대조하고, 각 토픽 페이지 끝에 출처 목록을 남겼습니다.
          </Head>
          <ol className={g.loop}>
            {VERIFY.map(([en, ko], i) => (
              <li key={en}><span className={g.num}>{String(i + 1).padStart(2, "0")}</span><strong>{en}</strong><span className={g.body}>{ko}</span></li>
            ))}
          </ol>
          <h3 className={cx(g.subTitle, g.gap)}>What Was Cut or Changed</h3>
          <ul className={r.cuts}>
            {CUTS.map(([what, why]) => (
              <li key={what}><span className={r.cutWhat}>{what}</span><span className={g.body}>{why}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section id="no-invented-numbers" className={cx(t.section, g.anchor)} data-section="no-invented-numbers">
        <div className={t.inner}>
          <Head num="02" title="No Invented Numbers">
            생성형 AI는 사실이 아닌 내용을 사실처럼 자신 있게 만들어 낼 수 있습니다. 이를 환각(hallucination), 또는 NIST는 confabulation이라고 부릅니다. 특히 그럴듯한 수치는 눈에 잘 띄지 않아 더 위험합니다.
          </Head>
          <div className={r.rule}>
            <span className={g.tag}>Project Rule · CLAUDE.md</span>
            <p className={r.ruleText}>“기술 내용(수치·설명)을 임의로 추가하지 말 것”</p>
            <p className={g.body}>이 문장을 프로젝트 지침 파일에 적어 두어, AI가 작업할 때마다 이 규칙을 먼저 읽고 따르게 했습니다.</p>
          </div>
          <ul className={r.rules}>
            {NUMBER_RULES.map(([en, ko]) => (
              <li key={en}><strong>{en}</strong><span className={g.body}>{ko}</span></li>
            ))}
          </ul>
          <div className={r.duo}>
            <figure className={r.fig}>
              <svg viewBox="0 0 320 180" className={f.graph} role="img" aria-label="A conceptual decline curve with no axis values">
                <path d="M30,14 V156 H306" className={r.axis} />
                <path d="M36,30 C90,90 170,124 300,140" className={r.curve} />
                <text x="306" y="174" className={f.gAxisLabel} textAnchor="end">Time →</text>
                <text x="18" y="14" className={f.gAxisLabel} transform="rotate(-90 18 14)" textAnchor="end">Rate →</text>
              </svg>
              <figcaption className={g.where}>Conceptual · shapes only, no values</figcaption>
            </figure>
            <div className={g.promptText}>
              <span className={g.tag}>Why No Values</span>
              <p className={g.body}>이 사이트의 그래프에는 축의 숫자가 없습니다. 개념을 설명하는 그림에 임의의 값을 넣으면, 보는 사람은 그것을 실제 유전의 자료로 오해할 수 있기 때문입니다. 그래서 개념도 설명에 ‘no values’라고 함께 표시했습니다.</p>
              <p className={g.body}>반대로 값을 보여 준 곳은 기록에서 직접 센 값입니다 — 예: <Link href="/ai-technology/vibe-coding#numbers" className={g.caseLink}>02 Vibe Coding · By the Numbers</Link>의 기준일과 출처.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="protect-data" className={cx(t.section, t.white, g.anchor)} data-section="protect-data">
        <div className={t.inner}>
          <Head num="03" title="Protect the Data">
            AI 도구에 입력한 내용은 외부 서버로 전송됩니다. 이 사이트도 누구나 볼 수 있는 공개 사이트입니다. 그래서 무엇을 AI에 넣고, 무엇을 사이트에 올릴지 기준을 먼저 정했습니다.
          </Head>
          <div className={g.fit}>
            <div>
              <h3 className={g.subTitle}>Never Put Into AI Tools</h3>
              <ul className={cx(g.points, g.pointsWarn)}>{NO_INPUT.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div>
              <h3 className={g.subTitle}>On This Public Site</h3>
              <dl className={r.defs}>{PUBLIC_RULES.map(([k, d]) => <div key={k}><dt>{k}</dt><dd>{d}</dd></div>)}</dl>
            </div>
          </div>
          <p className={g.note}>회사의 정보보안 규정과 AI 활용 지침이 있다면 언제나 그것이 우선합니다. 위 기준은 그 안에서 이 프로젝트가 스스로 지킨 원칙입니다.</p>
        </div>
      </section>

      <section id="ahead" className={cx(t.section, g.anchor)} data-section="ahead">
        <div className={t.inner}>
          <Head num="04" title="Looking Ahead">
            인턴십에서 확인한 것은, AI가 일을 대신하기보다 사람이 더 많은 일을 더 넓게 할 수 있게 돕는다는 점입니다. 석유개발 업무에 넓혀 적용할 방향을 제안합니다.
          </Head>
          <ol className={g.cases} style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            {AHEAD.map((a, i) => (
              <li key={a.title}>
                <span className={g.num}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={g.cardTitle}>{a.title}</h3>
                <p className={g.body}>{a.body}</p>
                {a.href && <Link href={a.href} className={g.caseLink}>{a.link} →</Link>}
              </li>
            ))}
          </ol>
          <div className={g.handoff}>
            <span className={g.tag}>Decisions That Stay Human</span>
            <ul className={g.checks}>{HUMAN.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>

          <div className={g.more}>
            <Details summary="Sources">
              <p className={f.pSmall}>생성형 AI의 위험 요소에 관한 용어는 아래 자료를, 이 사이트에서 지킨 원칙은 프로젝트 지침 파일(CLAUDE.md)과 저장소 기록을 기준으로 했습니다.</p>
              <ul className={g.sourceList}>
                {SOURCES.map(([label, href]) => <li key={href}><a href={href} target="_blank" rel="noopener noreferrer">{label}</a></li>)}
              </ul>
            </Details>
          </div>
        </div>
      </section>
    </>
  );
}
