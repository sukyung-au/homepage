import { sceneStyles as ss } from "@/components/site/scene";
import { Details } from "../fundamentals/Details";
import f from "../fundamentals/Fundamentals.module.css";
import { SectionHeading, topicStyles as t } from "../TopicParts";
import m from "./SimulatorSections.module.css";

/**
 * Topic 3.4, sections 06–08: how a simulator works, commercial simulators, open-source and Python simulators.
 * Qualitative text from the sources in SOURCES (MRST book, Wikipedia, vendor and project pages); product
 * descriptions follow each vendor's / project's own public description. No product is recommended.
 */

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

/* ── 06 Principles ── */
const PILLARS: [string, string, string][] = [
  ["Mass Conservation", "질량 보존", "각 셀에서 ‘쌓이는 양 = 들어온 양 − 나간 양 + 유정에서 주입·생산한 양’이 성립해야 합니다. 유체 상(오일·가스·물)마다 이 식을 세웁니다."],
  ["Darcy's Law", "다르시 법칙", "이웃한 셀 사이의 흐름을 압력 차이, 투과도, 유체 점성도로 계산합니다. 운동량 보존을 다공성 매질에 맞게 단순화한 경험 법칙입니다."],
  ["Constitutive Relations", "구성 관계식", "PVT(압력에 따른 유체 물성), 상대투과도, 모세관압, 암석 압축률이 식을 완성합니다 — 3.2에서 다룬 내용이 여기에 들어갑니다."],
];

const LOOP: [string, string][] = [
  ["Initialize", "초기 압력·포화도 분포 설정"],
  ["Advance Δt", "다음 시간 단계로 이동"],
  ["Build Equations", "모든 셀의 질량 보존식(잔차) 구성"],
  ["Newton Iteration", "자코비안 계산 → 선형 방정식 풀이 → 압력·포화도 갱신"],
  ["Converged?", "수렴하면 결과 저장 · 실패하면 Δt를 줄여 다시 계산"],
];

const PSEUDO = `# Conceptual pseudocode — not the API of any specific simulator
state = initialize(grid, fluids, contacts)        # pressure, saturations

for t in schedule.time_steps:                     # well controls change over time
    while True:
        R = residual(state, t)                    # mass balance in every cell
        if norm(R) < tolerance:                   # converged → keep this step
            break
        J = jacobian(state, t)                    # derivatives of R
        state = state - solve(J, R)               # Newton update (linear solve)
    report(state, wells)                          # rates, pressures, saturations`;

const MODELS: [string, string][] = [
  ["Black Oil", "오일·가스·물 세 성분으로 단순화하고, 압력에 따른 물성은 PVT 표로 표현합니다."],
  ["Compositional", "유체를 여러 탄화수소 성분으로 나누고 상태방정식(EOS)으로 상거동을 계산합니다. 유체 조성의 변화가 중요한 경우에 사용합니다."],
  ["Thermal", "에너지 보존식을 더해 저류층 온도 변화를 계산합니다. 주로 중질유의 증기 주입 같은 열 공법에 사용합니다."],
];

/* ── 07 Commercial simulators ── */
const COMMERCIAL: { vendor: string; product: string; models: string; body: string; href: string }[] = [
  { vendor: "SLB", product: "ECLIPSE", models: "Black oil · Compositional · Thermal · Streamline", href: "https://www.slb.com/products-and-services/delivering-digital-at-scale/software/eclipse-industry-reference-reservoir-simulator/eclipse",
    body: "30년 넘게 개발된 업계 표준(reference) 시뮬레이터입니다. 키워드 기반 입력 파일(‘Eclipse 형식’)은 다른 시뮬레이터에서도 널리 읽힙니다." },
  { vendor: "SLB", product: "INTERSECT", models: "High-resolution simulation", href: "https://www.slb.com/products-and-services/delivering-digital-at-scale/software/eclipse-industry-reference-reservoir-simulator/eclipse/eclipse-simulators",
    body: "물리 모델과 계산 성능을 결합한 고해상도 시뮬레이터로, 크고 복잡한 모델과 개발 시나리오에 사용합니다." },
  { vendor: "CMG", product: "IMEX · GEM · STARS", models: "Black oil · Compositional (EOS) · Thermal & advanced", href: "https://www.cmgl.ca/solutions/software/",
    body: "IMEX는 블랙오일, GEM은 상태방정식 기반 조성·비전통 저류층, STARS는 증기·열·화학적 EOR 같은 고급 공정용 시뮬레이터입니다." },
  { vendor: "Halliburton · Landmark", product: "Nexus", models: "Reservoir simulator", href: "https://en.wikipedia.org/wiki/Reservoir_simulation",
    body: "Amoco·Los Alamos 국립연구소·Cray가 개발한 ‘Falcon’에서 출발한 시뮬레이터로, Landmark의 이전 세대 VIP를 대체합니다." },
  { vendor: "Rock Flow Dynamics", product: "tNavigator", models: "Black oil · Compositional · Thermal compositional", href: "https://rfdyn.com/",
    body: "CPU와 GPU 가속을 지원하며, 지질·탄성파 해석·생산공학까지 하나의 플랫폼으로 통합한 것이 특징입니다." },
  { vendor: "Stone Ridge Technology", product: "ECHELON", models: "Black oil · Fully implicit", href: "https://en.wikipedia.org/wiki/Reservoir_simulation",
    body: "GPU에서 계산하도록 설계한 완전 내재적(fully implicit) 시뮬레이터입니다." },
];

/* ── 08 Open source & Python ── */
const OPEN: { name: string; by: string; lang: string; body: string; points: string[]; install?: string; href: string }[] = [
  {
    name: "open-DARTS", by: "TU Delft", lang: "Python API · C++ core", href: "https://open-darts.nl/",
    body: "Delft Advanced Research Terra Simulator. 물리 모델을 Python에서 정의하고 계산은 C++로 수행하는 다중물리 시뮬레이션 프레임워크입니다.",
    points: ["탄화수소 회수, 지열, CO₂·수소 저장", "열·유동·역학·화학(THMC) 연계 계산", "역모델링과 불확실성 분석 지원"],
    install: "pip install open-darts",
  },
  {
    name: "OPM Flow + Python", by: "Open Porous Media initiative", lang: "C++ simulator · Python bindings", href: "https://opm-project.org/",
    body: "완전 내재적 3상 블랙오일 시뮬레이터로, 업계 표준인 Eclipse 형식 입력을 읽고 씁니다. CO₂ 저장과 열 시뮬레이션도 지원합니다.",
    points: ["opm Python 패키지로 입력 덱·결과 파일을 읽고 쓰기", "pycopm 같은 Python 도구로 모델 조대화·세분화·부분 모델 추출", "ResInsight로 결과 시각화"],
    install: "pip install opm",
  },
  {
    name: "PorePy", by: "University of Bergen", lang: "Pure Python", href: "https://github.com/pmgbergen/porepy",
    body: "균열이 있고 변형하는 다공성 매질의 다중물리 현상을 연구하기 위한 Python 연구용 코드입니다.",
    points: ["2D·3D 균열 네트워크 자동 격자 생성", "유동·열·역학 연계 시뮬레이션", "새로운 수치 기법의 빠른 시험(prototyping)"],
  },
];

const PY_ROLES: [string, string][] = [
  ["Build Inputs", "격자·물성·유정 일정을 코드로 생성해 입력 파일을 만듭니다."],
  ["Run Scenarios", "여러 개발 대안과 불확실성 케이스를 자동으로 반복 실행합니다."],
  ["Read & Plot Results", "생산량·압력·포화도 결과를 읽어 분석하고 그래프로 그립니다."],
  ["Match & Optimize", "역모델링으로 히스토리 매칭과 최적화를 자동화합니다."],
];

const SOURCES: [string, string][] = [
  ["Lie · An Introduction to Reservoir Simulation Using MATLAB (MRST book, SINTEF)", "https://www.sintef.no/contentassets/8af8db2e42614f7fb94fb0c68f5bc256/mrst-book-2016.pdf"],
  ["Wikipedia · Reservoir simulation", "https://en.wikipedia.org/wiki/Reservoir_simulation"],
  ["SLB · Eclipse reservoir simulator", "https://www.slb.com/products-and-services/delivering-digital-at-scale/software/eclipse-industry-reference-reservoir-simulator/eclipse"],
  ["CMG · Software (IMEX, GEM, STARS)", "https://www.cmgl.ca/solutions/software/"],
  ["Rock Flow Dynamics · tNavigator", "https://rfdyn.com/"],
  ["Voskov et al. (2024) · open-DARTS, JOSS", "https://joss.theoj.org/papers/10.21105/joss.06737"],
  ["OPM · The Open Porous Media Initiative", "https://opm-project.org/"],
  ["PyPI · opm (OPM-Common Python bindings)", "https://pypi.org/project/opm/"],
  ["arXiv · pycopm: tailoring OPM Flow geological models", "https://arxiv.org/html/2602.11777"],
  ["GitHub · PorePy", "https://github.com/pmgbergen/porepy"],
];

function Head({ num, title, label, body }: { num: string; title: string; label: string; body: string }) {
  return (
    <div className={m.head}>
      <div>
        <SectionHeading num={num}>{title}</SectionHeading>
        <p className={m.label}>{label}</p>
      </div>
      <p className={`${ss.body} ${m.headBody}`}>{body}</p>
    </div>
  );
}

/** Two neighbouring cells: flux by Darcy's law across the shared face, mass balance per cell, a well in one cell */
function CellFlux() {
  return (
    <svg viewBox="0 0 560 250" className={m.svg} role="img" aria-label="Two neighbouring grid cells: fluid flows across the shared face from higher to lower pressure; each cell keeps a mass balance, and a well produces from one cell">
      <rect x="60" y="50" width="200" height="150" className={m.cellHigh} />
      <rect x="260" y="50" width="200" height="150" className={m.cellLow} />
      <text x="160" y="40" className={f.gNote} textAnchor="middle">Cell i · higher pressure</text>
      <text x="360" y="40" className={f.gNote} textAnchor="middle">Cell j · lower pressure</text>
      <path d="M200,125 H320" className={m.flux} markerEnd="url(#sim-flux)" />
      <defs>
        <marker id="sim-flux" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" className={m.fluxHead} />
        </marker>
      </defs>
      <text x="260" y="108" className={cx(f.gTinyBlue, m.halo)} textAnchor="middle">Flux ∝ k · Δp / μ</text>
      <text x="160" y="176" className={f.gTiny} textAnchor="middle">accumulation = in − out ± well</text>
      <line x1="420" y1="50" x2="420" y2="160" className={m.well} />
      <circle cx="420" cy="160" r="5" className={m.wellDot} />
      <text x="430" y="72" className={f.gTiny}>Well</text>
      <path d="M260,200 V214" className={m.tick} />
      <text x="260" y="232" className={f.gAxisLabel} textAnchor="middle">Shared face · transmissibility</text>
    </svg>
  );
}

export function SimulatorSections() {
  return (
    <>
      {/* 06 — How a simulator works */}
      <section id="principles" className={cx(t.section, m.anchor)} data-section="principles" data-step="06">
        <div className={t.inner}>
          <Head num="06" title="Inside the Simulator" label="Principles"
            body="시뮬레이터는 저류층 유동을 설명하는 편미분방정식을 격자 셀 단위의 대수 방정식으로 바꾸고, 시간 단계마다 이를 풀어 압력과 포화도를 계산합니다." />

          <ol className={m.pillars}>
            {PILLARS.map(([en, ko, body], i) => (
              <li key={en}>
                <span className={m.num}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={m.cardTitle}>{en}</h3>
                <span className={m.ko}>{ko}</span>
                <p className={m.cardBody}>{body}</p>
              </li>
            ))}
          </ol>

          <div className={m.duo}>
            <figure className={m.fig}>
              <CellFlux />
              <figcaption className={m.caption}>Finite-volume view of two grid cells · conceptual, no values</figcaption>
            </figure>
            <div>
              <h3 className={m.subTitle}>From Equations to Grid Cells</h3>
              <p className={m.cardBody}>저류층을 셀로 나누고 각 셀을 하나의 ‘통제 부피’로 봅니다. 이웃 셀 사이의 흐름은 두 셀의 압력 차이와 경계면의 전달도(transmissibility)로 계산하는데, 이 2점 유속 근사(two-point flux) 유한체적법이 현재 업계의 표준 방법입니다.</p>
              <p className={m.cardBody}>유정은 셀 안의 점으로 다루며, 셀 압력과 유정 바닥압의 관계를 유정 모델(예: Peaceman 모델)로 연결합니다.</p>
            </div>
          </div>

          <div className={m.loopBlock}>
            <h3 className={m.subTitle}>One Time Step at a Time</h3>
            <ol className={m.loop} aria-label="Simulation time-step loop">
              {LOOP.map(([en, ko], i) => (
                <li key={en} className={i === 3 ? m.loopKey : undefined}>
                  <span className={m.loopNum}>{String(i + 1).padStart(2, "0")}</span>
                  <strong>{en}</strong>
                  <span>{ko}</span>
                </li>
              ))}
            </ol>
            <p className={m.loopNote}>↻ 수렴한 시간 단계의 결과가 다음 단계의 시작점이 되고, 유정 일정이 끝날 때까지 반복합니다.</p>
            <pre className={m.code} aria-label="Conceptual pseudocode of the time-step loop"><code>{PSEUDO}</code></pre>
          </div>

          <div className={m.models}>
            {MODELS.map(([en, ko]) => (
              <div key={en}>
                <h3 className={m.cardTitle}>{en}</h3>
                <p className={m.cardBody}>{ko}</p>
              </div>
            ))}
          </div>

          <div className={m.more}>
            <Details summary="Why Newton's method — and why time steps get cut">
              <p className={f.p}>다상 유동 방정식은 물성(상대투과도, PVT 등)이 압력과 포화도에 따라 바뀌어 비선형입니다. 그래서 각 시간 단계에서 1차 도함수 행렬(자코비안)을 만들고, 뉴턴법으로 선형 방정식을 반복해 풀며 해를 점점 개선합니다. 압력·포화도·유정 방정식을 한 번에 함께 푸는 방식을 완전 내재적(fully implicit) 방법이라고 합니다.</p>
              <p className={f.pSmall}>반복이 수렴하지 않으면 시간 간격을 줄여 다시 계산합니다. 매 반복마다 큰 선형 방정식을 풀어야 하므로, 선형 해법과 병렬·GPU 계산이 시뮬레이터 성능에 큰 영향을 줍니다.</p>
            </Details>
          </div>
        </div>
      </section>

      {/* 07 — Commercial simulators */}
      <section id="commercial" className={cx(t.section, t.white, m.anchor)} data-section="commercial" data-step="07">
        <div className={t.inner}>
          <Head num="07" title="Commercial Simulators" label="Industry Software"
            body="현업에서는 상용 시뮬레이터를 주로 사용합니다. 제품마다 지원하는 유체 모델(블랙오일·조성·열)과 계산 방식, 함께 쓰는 모델링 플랫폼이 다릅니다." />
          <ul className={m.vendors}>
            {COMMERCIAL.map((c) => (
              <li key={c.product} className={m.vendor}>
                <span className={m.vendorName}>{c.vendor}</span>
                <h3 className={m.product}>{c.product}</h3>
                <span className={m.tags}>{c.models}</span>
                <p className={m.cardBody}>{c.body}</p>
                <a href={c.href} target="_blank" rel="noopener noreferrer" className={m.link}>Source ↗</a>
              </li>
            ))}
          </ul>
          <p className={m.disclaimer}>제품 설명은 각 제조사와 공개 자료의 소개를 요약한 것이며, 특정 제품을 추천하지 않습니다. 제품명은 각 회사의 상표입니다.</p>
        </div>
      </section>

      {/* 08 — Open source & Python */}
      <section id="open-source" className={cx(t.section, m.anchor)} data-section="open-source" data-step="08">
        <div className={t.inner}>
          <Head num="08" title="Open-Source Simulators in Python" label="Open Source · Python"
            body="오픈소스 시뮬레이터는 연구와 교육, 새로운 기법 개발에 쓰입니다. 계산 속도가 중요한 핵심부는 C++로 만들고, 모델 구성과 분석은 Python으로 다루는 구조가 많습니다." />
          <ul className={m.opens}>
            {OPEN.map((o) => (
              <li key={o.name} className={m.open}>
                <div className={m.openTop}>
                  <h3 className={m.product}>{o.name}</h3>
                  <span className={m.lang}>{o.lang}</span>
                </div>
                <span className={m.vendorName}>{o.by}</span>
                <p className={m.cardBody}>{o.body}</p>
                <ul className={m.points}>{o.points.map((p) => <li key={p}>{p}</li>)}</ul>
                {o.install && <code className={m.install}>$ {o.install}</code>}
                <a href={o.href} target="_blank" rel="noopener noreferrer" className={m.link}>Project ↗</a>
              </li>
            ))}
          </ul>

          <div className={m.roles}>
            <h3 className={m.subTitle}>Where Python Fits in a Simulation Study</h3>
            <ol className={m.roleList}>
              {PY_ROLES.map(([en, ko], i) => (
                <li key={en}>
                  <span className={m.loopNum}>{String(i + 1).padStart(2, "0")}</span>
                  <strong>{en}</strong>
                  <span>{ko}</span>
                </li>
              ))}
            </ol>
          </div>

          <p className={m.disclaimer}>참고: MATLAB 기반 오픈소스 도구로는 SINTEF의 MRST(MATLAB Reservoir Simulation Toolbox)가 있으며, 새로운 시뮬레이션 기법의 빠른 시험과 교육에 널리 쓰입니다.</p>

          <div className={m.more}>
            <Details summary="Sources">
              <p className={f.pSmall}>06–08의 설명은 아래 자료를 바탕으로 정성적으로 정리했습니다. 소프트웨어 버전과 기능은 바뀔 수 있으니 각 프로젝트의 최신 문서를 확인하세요.</p>
              <ul className={m.sourceList}>
                {SOURCES.map(([label, href]) => <li key={href}><a href={href} target="_blank" rel="noopener noreferrer">{label}</a></li>)}
              </ul>
            </Details>
          </div>
        </div>
      </section>
    </>
  );
}
