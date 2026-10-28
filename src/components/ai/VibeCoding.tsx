import type { ReactNode } from "react";
import Link from "next/link";
import { sceneStyles as ss } from "@/components/site/scene";
import { Details } from "@/components/technology/fundamentals/Details";
import f from "@/components/technology/fundamentals/Fundamentals.module.css";
import { SectionHeading, topicStyles as t } from "@/components/technology/TopicParts";
import v from "./VibeCoding.module.css";

/**
 * AI Technology topic 02 — vibe coding, and how this website was built with it.
 * The definition follows the sources in SOURCES; everything about this site comes from its own repository
 * (GitHub history, package.json, lib/*.ts). Figures in 04 are counted from GitHub as of AS_OF — update them
 * together with the date, never one without the other.
 */

const AS_OF = "2026-10-28";

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

/* ── 01 What ── */
const COMPARE: [string, string, string][] = [
  ["입력", "프로그래밍 언어로 코드를 직접 작성", "원하는 결과를 자연어로 설명"],
  ["코드 작성", "사람", "AI(대규모 언어 모델)"],
  ["사람의 역할", "설계와 구현", "요구 설명 · 결과 확인 · 판단"],
  ["확인 방법", "코드를 읽고 테스트", "실행 결과와 화면을 보고 후속 요청"],
];
const FITS = ["프로토타입과 화면 구성처럼 결과를 바로 눈으로 확인할 수 있는 일", "글·그림·레이아웃을 여러 번 고쳐 가며 다듬는 일", "정해진 틀(페이지·컴포넌트)을 반복해서 늘려 가는 일"];
const CAUTIONS = ["코드를 충분히 검토하지 않고 받아들이면, 이해하지 못한 코드와 오류가 쌓일 수 있음", "보안 · 개인정보 · 내부 자료가 걸린 기능", "기술 설명과 수치처럼 정확성이 중요한 내용 — AI가 그럴듯하게 지어낼 수 있음"];

/* ── 02 Workflow ── */
const LOOP: [string, string, string][] = [
  ["Request", "요청", "원하는 화면과 내용을 한국어로 설명합니다. 어느 페이지의 어느 섹션인지 위치를 함께 적습니다."],
  ["Generate", "생성", "AI 코딩 도구가 작업 브랜치에서 코드를 작성하고, 필요한 자료는 공개 출처에서 찾아 확인합니다."],
  ["Verify", "확인", "타입 검사 · 린트 · 빌드를 통과하는지, 데스크톱과 모바일 화면이 깨지지 않는지 확인합니다."],
  ["Revise", "수정", "화면을 보고 고칠 점을 다시 요청합니다. 만족할 때까지 이 과정을 반복합니다."],
];
const EXAMPLE: [string, string][] = [
  ["요청", "“RTA 내용을 더 풍성하게 만들어주면 좋겠어, Type Curve를 종류별로 보여주고, Flowing Material Balance로 OGIP 예측하는 것도 보여줘”"],
  ["생성", "Type curve 다섯 종류(Fetkovich · Blasingame · Agarwal-Gardner · NPI · Wattenbarger)를 고를 수 있는 탭과 개념도, FMB로 OGIP를 구하는 3단계 그림을 작성"],
  ["확인", "빌드를 통과한 뒤 화면을 캡처해 보니 Fetkovich 그림의 곡선 라벨이 서로 겹침"],
  ["수정", "라벨 위치를 옮기고 글자 뒤에 흰 테두리를 넣어 다시 확인 → 커밋 · PR · 배포"],
];

/* ── 03 This site ── */
const SECTIONS: [string, string, string][] = [
  ["Journey", "/", "탐사부터 폐광까지, 하나의 필드 단면으로 보는 석유개발 5단계"],
  ["Petroleum Technology", "/technology", "지구물리 · 지질 · 저류공학 등 개발 과정에서 쓰이는 기술 지식"],
  ["AI Technology", "/ai-technology", "생성형 AI 활용, 바이브 코딩, 업무 자동화, AI 활용 원칙"],
  ["Beyond the Field", "/beyond-the-field", "KNOC 인턴십 이야기 — 울산에서의 시간과 만난 사람들"],
];
const STACK: [string, string][] = [
  ["Next.js 16", "App Router 기반 웹 프레임워크"],
  ["React 19 · TypeScript", "화면 구성 요소와 타입 검사"],
  ["CSS Modules", "디자인 토큰(CSS 변수) 기반 스타일"],
  ["GitHub", "코드 저장 · 변경 이력 · PR 검토"],
  ["Vercel", "main 브랜치에 병합되면 자동 배포"],
];
const TOOLS: [string, string][] = [
  ["Claude Code", "코드 작성 · 수정, 기술 자료 출처 확인"],
  ["Codex", "설명용 이미지 생성 (작업 지시서 기반)"],
  ["Playwright", "브라우저 화면 캡처로 결과 확인"],
  ["Notion", "발표 구성 정리"],
];
const DEPLOY: [string, string][] = [
  ["Branch", "작업 브랜치 생성"],
  ["Commit", "변경 저장"],
  ["Pull Request", "변경 내용 검토"],
  ["Merge", "main에 병합"],
  ["Deploy", "Vercel 자동 배포"],
];

/* ── 04 Numbers ── (counted from GitHub, see AS_OF) */
const STATS: [string, string, string][] = [
  ["30", "days", "첫 커밋 2026-09-29부터 기준일까지"],
  ["73", "commits", "main 브랜치 커밋 (병합 커밋 포함)"],
  ["13", "pull requests", "그중 12건 병합, 1건 열림"],
  ["5", "journey stages", "Exploration → Decommissioning"],
  ["6", "technology topics", "페이지가 있는 Petroleum Technology 토픽"],
  ["4", "AI topics", "AI Technology 토픽"],
];

/* ── 05 Lessons ── */
const LESSONS: [string, string][] = [
  ["Be Specific About Where", "“3.2의 06 Drive Mechanisms에 ○○를 추가”처럼 위치와 범위를 정확히 적을수록 원하는 결과가 한 번에 나왔습니다."],
  ["Verify Every Change", "빌드 통과만으로는 부족했습니다. 겹친 라벨이나 모바일에서 넘치는 레이아웃은 화면을 직접 봐야 찾을 수 있었습니다."],
  ["Write the Rules Down", "‘기술 내용(수치·설명)을 임의로 추가하지 말 것’ 같은 원칙을 프로젝트 지침 파일(CLAUDE.md)에 적어 두면, AI가 매 작업마다 그 규칙을 따릅니다."],
  ["Keep Changes Small", "주제 하나를 PR 하나로 나누니 검토가 쉬웠고, 문제가 생겨도 해당 변경만 되돌릴 수 있었습니다."],
  ["The Judgement Stays Human", "무엇을 담을지, 무엇이 맞는지, 무엇을 공개해도 되는지는 AI가 대신 정할 수 없었습니다 — 구성과 검증은 사람의 몫입니다."],
];

const SOURCES: [string, string][] = [
  ["Andrej Karpathy — “vibe coding” post on X (2 Feb 2025)", "https://x.com/karpathy/status/1886192184808149383"],
  ["Wikipedia — Vibe coding", "https://en.wikipedia.org/wiki/Vibe_coding"],
  ["IBM — What is vibe coding?", "https://www.ibm.com/think/topics/vibe-coding"],
  ["Google Cloud — What is vibe coding?", "https://cloud.google.com/discover/what-is-vibe-coding"],
  ["Next.js documentation", "https://nextjs.org/docs"],
  ["Vercel — Deploying Git repositories", "https://vercel.com/docs/git"],
];

function Head({ num, title, children }: { num: string; title: string; children: ReactNode }) {
  return (
    <div className={v.head}>
      <SectionHeading num={num}>{title}</SectionHeading>
      <p className={cx(ss.body, v.headBody)}>{children}</p>
    </div>
  );
}

export function VibeCoding() {
  return (
    <>
      <section id="what" className={cx(t.section, t.white, v.anchor)} data-section="what">
        <div className={t.inner}>
          <Head num="01" title="What Is Vibe Coding">
            바이브 코딩은 코드를 직접 쓰는 대신 원하는 결과를 자연어로 설명하고, 대규모 언어 모델(LLM)이 만든 코드를 실행해 보며 후속 요청으로 다듬는 개발 방식입니다. 2025년 2월 AI 연구자 Andrej Karpathy가 처음 이 이름을 붙였습니다.
          </Head>

          <figure className={v.quote}>
            <blockquote>“There’s a new kind of coding I call ‘vibe coding’, where you fully give in to the vibes, embrace exponentials, and forget that the code even exists.”</blockquote>
            <figcaption>Andrej Karpathy, X, 2 February 2025 · 같은 글에서 그는 이 방식이 “주말에 만들고 버릴 프로젝트(throwaway weekend projects)”에는 나쁘지 않다고 덧붙였습니다.</figcaption>
          </figure>

          <div className={v.compare} role="table" aria-label="기존 개발 방식과 바이브 코딩 비교">
            <div className={cx(v.row, v.rowHead)} role="row">
              <span role="columnheader" />
              <span role="columnheader">Traditional Coding</span>
              <span role="columnheader">Vibe Coding</span>
            </div>
            {COMPARE.map(([k, a, b]) => (
              <div key={k} className={v.row} role="row">
                <span role="rowheader" className={v.rowKey}>{k}</span>
                <span role="cell">{a}</span>
                <span role="cell" className={v.rowVibe}>{b}</span>
              </div>
            ))}
          </div>

          <div className={v.fit}>
            <div>
              <h3 className={v.subTitle}>Works Well For</h3>
              <ul className={v.points}>{FITS.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div>
              <h3 className={v.subTitle}>Needs Care</h3>
              <ul className={cx(v.points, v.pointsWarn)}>{CAUTIONS.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          </div>
          <p className={v.note}>이 사이트는 “코드의 존재를 잊는” 방식 대신, AI가 만든 결과를 매번 빌드와 화면으로 확인하고 기술 내용은 공개 출처와 대조하는 방식으로 만들었습니다.</p>
        </div>
      </section>

      <section id="workflow" className={cx(t.section, v.anchor)} data-section="workflow">
        <div className={t.inner}>
          <Head num="02" title="The Workflow">
            작업은 요청 → 생성 → 확인 → 수정의 짧은 반복으로 진행됩니다. 한 번에 완성하기보다 화면을 보며 여러 번 고치는 것이 기본입니다.
          </Head>
          <ol className={v.loop}>
            {LOOP.map(([en, ko, body], i) => (
              <li key={en}>
                <span className={v.num}>{String(i + 1).padStart(2, "0")}</span>
                <strong>{en} <span className={v.ko}>{ko}</span></strong>
                <span className={v.body}>{body}</span>
              </li>
            ))}
          </ol>
          <p className={v.loopBack}>↻ 수정 요청은 다시 01 요청으로 돌아갑니다</p>

          <div className={v.example}>
            <span className={v.exampleLabel}>Example · 3.3 Pressure &amp; Rate Transient Analysis</span>
            <dl className={v.exampleList}>
              {EXAMPLE.map(([k, d]) => (
                <div key={k}><dt>{k}</dt><dd>{d}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="this-site" className={cx(t.section, t.white, v.anchor)} data-section="this-site">
        <div className={t.inner}>
          <Head num="03" title="Building This Website">
            지금 보고 있는 사이트 전체를 이 방식으로 만들었습니다. 디자인 시안을 시각적 기준으로 삼고, 내용과 화면을 하나씩 요청하며 쌓아 올렸습니다.
          </Head>

          <h3 className={v.subTitle}>What’s on the Site</h3>
          <ul className={v.sitemap}>
            {SECTIONS.map(([name, href, body]) => (
              <li key={name}>
                <Link href={href} className={v.siteName}>{name}</Link>
                <span className={v.body}>{body}</span>
              </li>
            ))}
          </ul>

          <div className={v.duo}>
            <div>
              <h3 className={v.subTitle}>Tech Stack</h3>
              <dl className={v.defs}>{STACK.map(([k, d]) => <div key={k}><dt>{k}</dt><dd>{d}</dd></div>)}</dl>
            </div>
            <div>
              <h3 className={v.subTitle}>AI &amp; Tools</h3>
              <dl className={v.defs}>{TOOLS.map(([k, d]) => <div key={k}><dt>{k}</dt><dd>{d}</dd></div>)}</dl>
            </div>
          </div>

          <h3 className={cx(v.subTitle, v.deployTitle)}>From Change to Live Site</h3>
          <ol className={v.deploy}>
            {DEPLOY.map(([en, ko]) => <li key={en}><strong>{en}</strong><span>{ko}</span></li>)}
          </ol>
          <p className={v.note}>main 브랜치에 병합되면 Vercel이 자동으로 사이트를 다시 빌드해 배포합니다. 배포 후에는 실제 주소에서 변경 내용이 반영됐는지 한 번 더 확인합니다.</p>
        </div>
      </section>

      <section id="numbers" className={cx(t.section, v.anchor)} data-section="numbers">
        <div className={t.inner}>
          <Head num="04" title="By the Numbers">
            GitHub 저장소 기록에서 직접 센 값입니다. 추정치는 넣지 않았습니다.
          </Head>
          <ul className={v.stats}>
            {STATS.map(([n, unit, body]) => (
              <li key={unit}>
                <span className={v.statNum}>{n}</span>
                <span className={v.statUnit}>{unit}</span>
                <span className={v.body}>{body}</span>
              </li>
            ))}
          </ul>
          <p className={v.asOf}>기준일 {AS_OF} · 출처: github.com/sukyung-au/homepage 커밋 · PR 기록, 사이트 구성 파일</p>
        </div>
      </section>

      <section id="lessons" className={cx(t.section, t.white, v.anchor)} data-section="lessons">
        <div className={t.inner}>
          <Head num="05" title="Lessons">
            AI가 코드를 써 주더라도, 좋은 결과는 요청과 확인의 질에서 나왔습니다.
          </Head>
          <ol className={v.lessons}>
            {LESSONS.map(([title, body], i) => (
              <li key={title}>
                <span className={v.num}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={v.lessonTitle}>{title}</h3>
                <p className={v.body}>{body}</p>
              </li>
            ))}
          </ol>

          <div className={v.more}>
            <Details summary="Sources">
              <p className={f.pSmall}>바이브 코딩의 정의와 유래는 아래 자료를 바탕으로 정리했고, 이 사이트에 관한 내용은 저장소 기록을 기준으로 했습니다.</p>
              <ul className={v.sourceList}>
                {SOURCES.map(([label, href]) => <li key={href}><a href={href} target="_blank" rel="noopener noreferrer">{label}</a></li>)}
              </ul>
            </Details>
          </div>
        </div>
      </section>
    </>
  );
}
