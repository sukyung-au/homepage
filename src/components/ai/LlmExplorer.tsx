"use client";
import { useState } from "react";
import { Choice } from "@/components/technology/fundamentals/Choice";
import f from "@/components/technology/fundamentals/Fundamentals.module.css";
import g from "./GenerativeAi.module.css";

/**
 * AI topic 01, "How an LLM Works": one sentence walked through tokens, self-attention, next-token probabilities
 * and appending. Follows the Google ML Crash Course and Anthropic glossary in SOURCES. The token split, attention
 * weights and probabilities are illustrative shapes, not output from a real model, so no values are shown.
 */

type Id = "tokens" | "attention" | "predict" | "append";
const STEPS: { id: Id; label: string; title: string; body: string }[] = [
  { id: "tokens", label: "1 · Tokens", title: "Text Becomes Tokens", body: "모델은 글을 토큰이라는 작은 단위로 나눠 처리합니다. 토큰은 단어일 수도, 단어의 일부나 문자일 수도 있습니다. 평소에는 보이지 않지만, 모델의 입력과 출력은 모두 토큰의 나열입니다." },
  { id: "attention", label: "2 · Attention", title: "Every Token Looks at the Others", body: "트랜스포머(Transformer) 구조의 셀프 어텐션은 각 토큰마다 ‘다른 토큰이 이 토큰의 뜻에 얼마나 영향을 주는가’를 따집니다. 여기서 ‘it’이 가리키는 것이 ‘well’이라는 문맥을 이렇게 파악합니다." },
  { id: "predict", label: "3 · Predict", title: "Probabilities for the Next Token", body: "모델은 앞의 모든 토큰을 보고 다음에 올 토큰 후보마다 확률을 계산합니다. 보통 가장 그럴듯한 후보를 고르지만, 온도(temperature) 설정에 따라 덜 흔한 후보를 고를 수도 있어 같은 질문에도 답이 조금씩 달라집니다." },
  { id: "append", label: "4 · Append & Repeat", title: "One Token at a Time", body: "고른 토큰을 문장 끝에 붙이고, 늘어난 문장 전체를 보고 다시 다음 토큰을 예측합니다. 이 과정을 답이 끝날 때까지 반복합니다. 긴 설명문이나 코드도 이렇게 한 토큰씩 만들어집니다." },
];

const TOKENS = ["The", "well", "stopped", "flowing", "because", "it", "lost"];
const NEXT = "pressure";
/** Illustrative attention from "it" to each earlier token (0–1). */
const ATTN = [0.08, 1, 0.22, 0.3, 0.12];
/** Illustrative next-token candidates, longest bar = most likely. */
const CANDIDATES: [string, number][] = [["pressure", 1], ["power", 0.34], ["its", 0.22], ["flow", 0.14]];

const CW = 8;
const width = (t: string) => 16 + t.length * CW;
function layout(tokens: string[]) {
  let x = 40;
  return tokens.map((t) => {
    const r = { t, x, w: width(t) };
    x += r.w + 8;
    return r;
  });
}

export function LlmExplorer() {
  const [id, setId] = useState<Id>("tokens");
  const s = STEPS.find((x) => x.id === id)!;
  const appended = id === "append";
  const chips = layout(appended ? [...TOKENS, NEXT, "?"] : [...TOKENS, "?"]);
  const it = chips[5];
  const cy = 120;
  return (
    <div>
      <Choice idBase="llm" label="How an LLM generates text" value={id} onChange={setId} options={STEPS.map((x) => ({ id: x.id, label: x.label }))} />
      <div id="llm-panel" role="tabpanel" aria-labelledby={`llm-tab-${id}`} className={g.explorer}>
        <figure className={g.fig}>
          <svg viewBox="0 0 640 300" className={f.graph} role="img" aria-label={`${s.title}: the sentence “The well stopped flowing because it lost …” shown as tokens`}>
            {id === "attention" && ATTN.map((w, i) => {
              const a = chips[i];
              const x1 = a.x + a.w / 2;
              const x2 = it.x + it.w / 2;
              const h = 26 + (x2 - x1) * 0.28;
              return <path key={i} d={`M${x2},${cy - 18} C${x2},${cy - 18 - h} ${x1},${cy - 18 - h} ${x1},${cy - 18}`} className={g.arc} style={{ strokeWidth: 1 + w * 5, strokeOpacity: 0.25 + w * 0.75 }} />;
            })}
            {chips.map((c, i) => {
              const isQ = c.t === "?";
              const isNew = appended && c.t === NEXT;
              const isIt = id === "attention" && i === 5;
              const cls = isQ ? g.chipQ : isNew ? g.chipNew : isIt ? g.chipKey : g.chip;
              return (
                <g key={i}>
                  <rect x={c.x} y={cy - 16} width={c.w} height="32" rx="6" className={cls} />
                  <text x={c.x + c.w / 2} y={cy + 5} className={isNew || isIt ? g.chipTextOn : g.chipText} textAnchor="middle">{c.t}</text>
                  {id === "tokens" && !isQ && <text x={c.x + c.w / 2} y={cy + 36} className={f.gTiny} textAnchor="middle">{i + 1}</text>}
                </g>
              );
            })}
            {id === "tokens" && <text x="40" y="190" className={f.gTiny}>Seven tokens, read in order · the next one is still unknown</text>}
            {id === "attention" && <text x={it.x + it.w / 2} y={cy + 40} className={f.gTinyBlue} textAnchor="middle">“it” → mostly “well”</text>}
            {id === "predict" && (
              <g>
                <path d={`M${chips[7].x + chips[7].w / 2},${cy + 18} V${cy + 44}`} className={g.drop} />
                {CANDIDATES.map(([t, p], i) => (
                  <g key={t}>
                    <text x="150" y={cy + 70 + i * 26} className={g.chipText} textAnchor="end">{t}</text>
                    <rect x="162" y={cy + 58 + i * 26} width={p * 300} height="16" rx="3" className={i === 0 ? g.barTop : g.bar} />
                  </g>
                ))}
                <text x="600" y="292" className={f.gAxisLabel} textAnchor="end">Probability (illustrative) →</text>
              </g>
            )}
            {appended && (
              <g>
                <path d={`M${chips[8].x + chips[8].w / 2},${cy + 20} C${chips[8].x + 10},${cy + 80} 120,${cy + 80} 80,${cy + 22}`} className={g.loopArc} markerEnd="url(#llm-head)" />
                <text x="330" y={cy + 96} className={f.gTinyBlue} textAnchor="middle">Read the whole sequence again → predict the next token</text>
                <defs><marker id="llm-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 Z" className={g.head2} /></marker></defs>
              </g>
            )}
          </svg>
          <figcaption className={g.where}>Illustrative only · token split, attention and probabilities are not from a real model</figcaption>
        </figure>
        <div className={g.panelText}>
          <h3 className={g.subTitle}>{s.title}</h3>
          <p className={g.body}>{s.body}</p>
        </div>
      </div>
    </div>
  );
}
