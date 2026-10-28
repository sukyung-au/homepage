import Image from "next/image";
import Link from "next/link";
import { Details } from "@/components/technology/fundamentals/Details";
import f from "@/components/technology/fundamentals/Fundamentals.module.css";
import { SectionHeading, topicStyles as t } from "@/components/technology/TopicParts";
import { sceneStyles as ss } from "@/components/site/scene";
import type { ReactNode } from "react";
import g from "./GenerativeAi.module.css";

/**
 * AI Technology topic 01 — generative AI during the internship. The definition follows the sources in SOURCES;
 * tools and cases are only what this project's own records show (repository history, docs/codex task files,
 * public/images README files). Add other tools or cases only when the user supplies them.
 */

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

/* ── 01 What ── */
const KINDS: { tag: string; title: string; ko: string; body: string; out: string }[] = [
  { tag: "Text · Code", title: "Language Models", ko: "대규모 언어 모델(LLM)", body: "많은 양의 글과 코드에서 패턴을 학습해, 질문이나 지시(프롬프트)에 이어질 글을 만들어 냅니다. 설명문, 요약, 번역, 코드 작성에 쓰입니다.", out: "글 · 표 · 코드" },
  { tag: "Image", title: "Image Generation Models", ko: "이미지 생성 모델", body: "글로 묘사한 장면을 이미지로 만들어 냅니다. 이미 만든 이미지의 일부만 고치도록 지시할 수도 있습니다.", out: "사진풍 이미지 · 일러스트" },
];
const LOOP: [string, string][] = [
  ["Prompt", "원하는 결과와 조건을 글로 지시"],
  ["Generate", "AI가 글·코드·이미지를 생성"],
  ["Check", "사람이 내용과 품질을 확인"],
  ["Refine", "고칠 점을 다시 지시"],
];

/* ── 02 Tools ── */
const TOOLS: { name: string; maker: string; kind: string; uses: string[] }[] = [
  { name: "Claude Code", maker: "Anthropic", kind: "AI 코딩 도구 (언어 모델)", uses: ["웹사이트 코드 작성 · 수정", "공개 기술 자료 검색과 출처 확인", "이미지 작업 지시서 작성", "Notion에 발표 구성안 정리"] },
  { name: "Codex", maker: "OpenAI", kind: "AI 코딩 도구 · 내장 이미지 생성", uses: ["작업 지시서를 받아 설명용 이미지 생성", "생성한 이미지를 웹용 크기·형식으로 변환해 페이지에 연결"] },
];

/* ── 03 Use cases ── */
const CASES: { title: string; body: string; href?: string; link?: string }[] = [
  { title: "Researching Technical Material", body: "매장량 분류(PRMS), 감퇴곡선, 유형곡선처럼 공개된 기술 자료를 찾아 핵심을 한국어로 정리하고, 각 페이지 끝에 출처 목록을 남겼습니다.", href: "/technology/reserves/rs-estimation", link: "04 Reserves Estimation" },
  { title: "Conceptual Diagrams", body: "그래프와 모식도를 코드(SVG)로 그렸습니다. 특정 유전의 값처럼 보이지 않도록 축의 수치를 넣지 않은 개념도로 만들었습니다.", href: "/technology/engineering/re-well-test", link: "3.3 PTA · RTA" },
  { title: "Explanatory Images", body: "실험실 장비, 탄성파 탐사, 물리검층처럼 사진이 필요한 곳에는 가상의 장면을 AI로 생성했습니다. 이 사이트의 AI 생성 이미지는 9장입니다.", href: "/technology/geophysics/gp-fdp-role", link: "1.1 Geophysics" },
  { title: "Building This Website", body: "자연어로 요청하고 AI가 코드를 작성하는 방식으로 사이트 전체를 만들었습니다.", href: "/ai-technology/vibe-coding", link: "02 Vibe Coding" },
];
const GALLERY: { src: string; alt: string; where: string }[] = [
  { src: "/images/technology/geophysics/gp-acquisition.webp", alt: "해상 탄성파 탐사 장면을 표현한 AI 생성 이미지", where: "1.1 Geophysics" },
  { src: "/images/technology/geology/ge-log-toolstring.webp", alt: "물리검층 장비를 표현한 AI 생성 이미지", where: "2.1 Geology" },
  { src: "/images/technology/engineering/re-pvt-lab.webp", alt: "PVT 실험 장비를 표현한 AI 생성 이미지", where: "3.2 Fundamentals" },
];
const PROMPT = "4:3 landscape editorial photograph-style visualization of a clean modern PVT laboratory: a stainless-steel high-pressure visual cell with a small glass sight window showing an amber crude oil sample with a thin gas cap … No readable text, no numbers on gauges or screens, no logos, no brand names … Fictional laboratory, not a real facility or manufacturer.";
const FIXES = [
  "가운데 암석 시료가 밖으로 드러나 있던 부분을 닫힌 금속 코어 홀더로 바꾸기",
  "압력계와 장비 표면에 생긴 숫자·눈금·글자 같은 무늬를 모두 지우기",
  "시료병 안의 액체를 오일층과 물층이 뚜렷하게 나뉜 모습으로 고치기",
];

/* ── 04 Takeaways ── */
const WORKED = ["초안을 빠르게 만들고, 여러 번 고쳐 가며 다듬을 수 있었습니다.", "영어로 된 기술 자료를 폭넓게 찾아 한국어로 정리할 수 있었습니다.", "사진을 구하기 어려운 장면도 설명용 이미지로 만들 수 있었습니다."];
const LIMITS = ["이미지에 글자처럼 보이는 무늬나 물리적으로 맞지 않는 장비가 섞여 나와, 고쳐 달라고 다시 지시해야 했습니다.", "그래프의 라벨이 서로 겹치는 등, 화면을 직접 봐야 찾을 수 있는 문제가 있었습니다.", "‘가장 널리 쓰이는’처럼 출처로 확인되지 않는 표현이 들어가, 찾아서 지웠습니다."];
const HUMAN = ["기술 내용과 수치가 맞는지", "출처가 실제로 그 내용을 말하는지", "공개 사이트에 올려도 되는 자료인지"];

const SOURCES: [string, string][] = [
  ["Wikipedia — Generative artificial intelligence", "https://en.wikipedia.org/wiki/Generative_artificial_intelligence"],
  ["IBM — What is generative AI?", "https://www.ibm.com/think/topics/generative-ai"],
  ["Anthropic — Claude Code overview", "https://docs.claude.com/en/docs/claude-code/overview"],
  ["OpenAI — Codex", "https://developers.openai.com/codex"],
];

function Head({ num, title, children }: { num: string; title: string; children: ReactNode }) {
  return (
    <div className={g.head}>
      <SectionHeading num={num}>{title}</SectionHeading>
      <p className={cx(ss.body, g.headBody)}>{children}</p>
    </div>
  );
}

export function GenerativeAi() {
  return (
    <>
      <section id="what" className={cx(t.section, t.white, g.anchor)} data-section="what">
        <div className={t.inner}>
          <Head num="01" title="What Generative AI Is">
            생성형 AI는 학습한 자료의 패턴을 바탕으로 글, 코드, 이미지 같은 새로운 결과물을 만들어 내는 AI입니다. 사람이 글로 원하는 것을 지시하면, 그에 맞는 결과를 만들어 돌려줍니다.
          </Head>
          <div className={g.kinds}>
            {KINDS.map((k) => (
              <article key={k.title} className={g.kind}>
                <span className={g.tag}>{k.tag}</span>
                <h3 className={g.cardTitle}>{k.title}</h3>
                <span className={g.ko}>{k.ko}</span>
                <p className={g.body}>{k.body}</p>
                <span className={g.out}>Output · {k.out}</span>
              </article>
            ))}
          </div>
          <h3 className={cx(g.subTitle, g.gap)}>How It Is Used</h3>
          <ol className={g.loop}>
            {LOOP.map(([en, ko], i) => (
              <li key={en}><span className={g.num}>{String(i + 1).padStart(2, "0")}</span><strong>{en}</strong><span className={g.body}>{ko}</span></li>
            ))}
          </ol>
          <p className={g.note}>생성형 AI는 그럴듯한 결과를 만들 뿐, 그 내용이 사실인지 스스로 보장하지 않습니다. 그래서 마지막 확인은 언제나 사람의 몫입니다 — <Link href="/ai-technology/responsible-ai">04 Using AI Responsibly</Link>.</p>
        </div>
      </section>

      <section id="tools" className={cx(t.section, g.anchor)} data-section="tools">
        <div className={t.inner}>
          <Head num="02" title="Tools Used During the Internship">
            이 사이트를 만드는 동안 두 가지 AI 도구를 역할을 나눠 사용했습니다. 코드와 글은 언어 모델 기반 코딩 도구가, 설명용 이미지는 이미지 생성 기능이 맡았습니다.
          </Head>
          <ul className={g.tools}>
            {TOOLS.map((tool) => (
              <li key={tool.name} className={g.tool}>
                <span className={g.maker}>{tool.maker}</span>
                <h3 className={g.toolName}>{tool.name}</h3>
                <span className={g.kindTag}>{tool.kind}</span>
                <ul className={g.points}>{tool.uses.map((u) => <li key={u}>{u}</li>)}</ul>
              </li>
            ))}
          </ul>
          <div className={g.handoff}>
            <span className={g.tag}>Hand-off</span>
            <p className={g.body}>두 도구는 <b>작업 지시서</b>로 이어졌습니다. Claude Code가 필요한 이미지의 내용·비율·금지 사항(글자, 숫자, 로고, 실제 회사 재현 금지)을 문서로 정리하면, Codex가 그 문서를 읽고 이미지를 생성해 페이지에 연결했습니다. 생성 날짜, 사용 도구, 프롬프트 전문은 이미지 폴더의 기록 파일에 남겼습니다.</p>
          </div>
        </div>
      </section>

      <section id="use-cases" className={cx(t.section, t.white, g.anchor)} data-section="use-cases">
        <div className={t.inner}>
          <Head num="03" title="Use Cases">
            인턴십 결과물인 이 사이트에서 생성형 AI가 맡은 일은 크게 네 가지입니다.
          </Head>
          <ol className={g.cases}>
            {CASES.map((c, i) => (
              <li key={c.title}>
                <span className={g.num}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={g.cardTitle}>{c.title}</h3>
                <p className={g.body}>{c.body}</p>
                {c.href && <Link href={c.href} className={g.caseLink}>{c.link} →</Link>}
              </li>
            ))}
          </ol>

          <h3 className={cx(g.subTitle, g.gap)}>AI-Generated Images on This Site</h3>
          <ul className={g.gallery}>
            {GALLERY.map((img) => (
              <li key={img.src}>
                <div className={g.frame}><Image src={img.src} alt={img.alt} fill sizes="(max-width: 640px) 100vw, 33vw" className={g.img} /></div>
                <span className={g.where}>{img.where} · AI-generated, fictional scene</span>
              </li>
            ))}
          </ul>

          <div className={g.prompt}>
            <div className={g.promptFig}>
              <div className={g.frameWide}><Image src="/images/technology/engineering/re-coreflood.webp" alt="코어 홀더와 펌프, 배관으로 이루어진 코어 유동 실험 장치를 표현한 AI 생성 이미지" fill sizes="(max-width: 1099px) 100vw, 50vw" className={g.img} /></div>
              <span className={g.where}>3.2 Fundamentals · core-flood apparatus, after a correction prompt</span>
            </div>
            <div className={g.promptText}>
              <span className={g.tag}>From Prompt to Image</span>
              <p className={g.body}>이미지는 장면, 구도, 색감, 그리고 넣지 말아야 할 것까지 영어 프롬프트로 자세히 지시했습니다. 아래는 PVT 실험실 이미지의 프롬프트 일부입니다.</p>
              <blockquote className={g.code}>{PROMPT}</blockquote>
              <p className={g.body}>첫 결과가 바로 쓰이지는 않았습니다. 왼쪽 코어 유동 장치 이미지는 다음 세 가지를 다시 지시해 고쳤습니다.</p>
              <ol className={g.fixes}>{FIXES.map((x) => <li key={x}>{x}</li>)}</ol>
            </div>
          </div>
        </div>
      </section>

      <section id="takeaways" className={cx(t.section, g.anchor)} data-section="takeaways">
        <div className={t.inner}>
          <Head num="04" title="What Worked, What Didn't">
            생성형 AI는 작업의 속도와 범위를 넓혀 주었지만, 결과를 그대로 쓸 수 있는 경우는 많지 않았습니다.
          </Head>
          <div className={g.fit}>
            <div>
              <h3 className={g.subTitle}>What Worked</h3>
              <ul className={g.points}>{WORKED.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div>
              <h3 className={g.subTitle}>What Needed Fixing</h3>
              <ul className={cx(g.points, g.pointsWarn)}>{LIMITS.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          </div>
          <div className={g.handoff}>
            <span className={g.tag}>Always Checked by a Person</span>
            <ul className={g.checks}>{HUMAN.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>

          <div className={g.more}>
            <Details summary="Sources">
              <p className={f.pSmall}>생성형 AI의 정의와 도구 설명은 아래 자료를, 사용 사례는 이 사이트의 저장소 기록(이미지 생성 기록 파일, 작업 지시서, 변경 이력)을 기준으로 했습니다.</p>
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
