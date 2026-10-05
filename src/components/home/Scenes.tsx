import type { CSSProperties } from "react";
import { ArrowCTA } from "@/components/ds/ArrowCTA";
import { TechViz } from "@/components/ds/TechViz";
import { Scene, SceneHead, sceneStyles as ss } from "@/components/site/scene";
import { getStage } from "@/lib/stages";
import { DeviatedWell, FieldSection, H, OWC, Platform, Rig, SeismicSurvey, VerticalWell, horizonPath, wellPoint, type Camera } from "./FieldSection";
import fs from "./FieldSection.module.css";
import s from "./Scenes.module.css";

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

/**
 * Viewport fit for the right/left visual column (desktop): its height is roughly ratio⁻¹ × width + extra,
 * so capping width at (available height − extra) × ratio keeps the whole visual above the floating nav.
 */
const FIT: Record<string, CSSProperties> = {
  exploration: { "--fit-ratio": "1.239", "--fit-extra": "64px" } as CSSProperties,
  appraisal: { "--fit-ratio": "1.667", "--fit-extra": "92px" } as CSSProperties,
  production: { "--fit-ratio": "1.667", "--fit-extra": "262px" } as CSSProperties,
  decommissioning: { "--fit-ratio": "2.083", "--fit-extra": "0px" } as CSSProperties,
};

/** Destination of the FDP technical page. Undefined until that page exists → the CTA renders inert. */
const FDP_HREF: string | undefined = undefined;

/** Numbered narrative list (V1 element-list style). Each row carries data-step for future reveal. */
function Steps({ items, arrows }: { items: [string, string][]; arrows?: boolean }) {
  return (
    <ol className={cx(s.elements, arrows && s.flow)}>
      {items.map(([a, b], i) => (
        <li key={a} data-step={i + 1}>
          <span className={s.elNum}>{String(i + 1).padStart(2, "0")}</span>
          <div>
            <div className={s.elTitle}>{a}</div>
            {b && <div className={s.elBody}>{b}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Horizontal "A → B → C" sequence with thin rules. */
function Sequence({ items, label, attr }: { items: string[]; label: string; attr: string }) {
  return (
    <ol className={s.sequence} aria-label={label}>
      {items.map((t, i) => (
        <li key={t} {...{ [`data-${attr}`]: i + 1 }}>
          <span className={s.seqNum}>{String(i + 1).padStart(2, "0")}</span>
          <span className={s.seqLabel}>{t}</span>
        </li>
      ))}
    </ol>
  );
}

/* ───────────── 01 Exploration ───────────── */

const EXPLORATION: [string, string][] = [
  ["Regional Geological Study", "분지의 형성과 퇴적 환경, 석유 시스템을 검토해 유망 지역을 고릅니다."],
  ["Seismic Survey", "음원에서 보낸 탄성파가 지층 경계에서 반사되어 돌아오는 신호를 기록합니다."],
  ["Seismic Interpretation", "반사면(horizon)과 단층을 해석해 트랩이 될 수 있는 구조(prospect)를 정의합니다."],
  ["Exploration Drilling", "유망 구조에 탐사정을 시추해 탄화수소가 있는지 직접 확인합니다."],
];

/** Basin-scale plan view: the regional starting point the camera later zooms into. */
function RegionalMap() {
  return (
    <div className={s.regional} data-step="1" data-layer="regional-map">
      <svg viewBox="0 0 600 150" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Illustrative regional basin map with candidate prospects">
        <path d="M0,118 C80,104 120,126 190,112 S300,92 360,106 S500,128 600,110" className={s.coast} />
        <path d="M40,96 C70,40 180,18 300,24 S520,34 560,80 C540,104 470,92 400,98 S180,104 120,108 S50,112 40,96Z" className={s.basin} />
        {[[0.82, 0.7], [0.64, 0.5], [0.46, 0.3]].map(([a, o], i) => (
          <path key={i} transform={`translate(${300 * (1 - a)} ${60 * (1 - a)}) scale(${a})`} d="M40,96 C70,40 180,18 300,24 S520,34 560,80 C540,104 470,92 400,98 S180,104 120,108 S50,112 40,96Z" className={s.contour} opacity={o} />
        ))}
        {[[170, 62], [250, 46], [455, 70]].map(([x, y]) => <ellipse key={x} cx={x} cy={y} rx={16} ry={8} className={s.lead} />)}
        <ellipse cx={380} cy={58} rx={16} ry={8} className={s.prospect} />
        <rect x={360} y={44} width={40} height={28} className={s.zoomBox} />
      </svg>
      <span className={s.mapTag}><b>01</b> Regional basin view</span>
      <span className={s.mapNote}>Leads · Prospect</span>
    </div>
  );
}

function ExplorationScene() {
  const st = getStage("exploration");
  const cam: Camera = { x: 0, y: 0, w: 1000, h: 560 };
  return (
    <Scene stage={st}>
      <div className={cx(ss.wrap, s.rowTop)}>
        <div className={s.text}>
          <SceneHead stage={st}>
            <p className={s.purpose}><span>Purpose</span>유망한 지하 구조를 찾고, 탄화수소가 실제로 있는지 확인합니다.</p>
            <Steps items={EXPLORATION} arrows />
          </SceneHead>
        </div>
        <div className={cx(s.visual, s.fit, s.fitRight)} style={FIT.exploration}>
          <RegionalMap />
          <svg className={s.zoom} viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden>
            <path d="M60,0 L0,40 M66.7,0 L100,40" />
          </svg>
          <FieldSection
            camera={cam}
            label="Illustrative offshore cross-section: seismic survey, interpreted horizons and an exploration well at the structure crest"
            tags={[
              { x: 200, y: 66, label: "Seismic Survey", step: "02", sub: "Source · streamer · reflections", seq: 2 },
              { x: 300, y: H.seal(300), label: "Seismic Interpretation", step: "03", sub: "Interpreted horizons · prospect", side: "left", seq: 3 },
              { x: 520, y: 322, label: "Exploration Drilling", step: "04", sub: "Exploration well · discovery", seq: 4 },
            ]}
          >
            <SeismicSurvey x={170} />
            <g data-layer="interpretation" data-sequence="3">
              <path d={horizonPath(H.seal, 250, 800)} className={cx(fs.line, s.interp)} />
              <path d={horizonPath(H.resTop, 250, 800)} className={cx(fs.line, s.interp)} />
            </g>
            <g data-layer="exploration-drilling" data-sequence="4">
              <Rig x={520} />
              <VerticalWell x={520} to={325} />
              <circle cx={520} cy={322} r={5} className={s.discovery} />
            </g>
          </FieldSection>
        </div>
      </div>
    </Scene>
  );
}

/* ───────────── 02 Appraisal ───────────── */

const APPRAISAL: [string, string][] = [
  ["Appraisal Well", "발견 구조의 범위와 유체 경계를 확인하려고 추가로 시추합니다."],
  ["Core & Wireline", "암석 시료와 검층으로 암상, 공극률, 유체 포화도를 평가합니다."],
  ["PVT Analysis", "저류층 유체 시료의 압력·부피·온도 거동을 분석합니다."],
  ["Well Test / DST", "유체를 실제로 흘려 보며 생산성과 저류층 특성을 확인합니다."],
  ["3D Seismic", "구조와 저류층 분포를 3차원으로 영상화합니다."],
  ["Initial Reservoir Model", "자료를 통합해 부존량과 그 불확실성 범위를 추정합니다."],
];

const AW = 650; // appraisal well x

function AppraisalScene() {
  const st = getStage("appraisal");
  const cam: Camera = { x: 330, y: 100, w: 600, h: 360 };
  const top = H.resTop(AW);
  // illustrative wireline trace beside the wellbore
  const log = Array.from({ length: 31 }, (_, i) => {
    const y = top - 25 + i * 2.6;
    return `${AW + 9 + (y > top && y < OWC ? 9 : 3) + ((i * 7) % 5)},${y.toFixed(1)}`;
  }).join(" ");
  return (
    <Scene stage={st}>
      <div className={cx(ss.wrap, s.rowTop)}>
        <div className={cx(s.visual, s.fit, s.fitLeft)} style={FIT.appraisal}>
          <FieldSection
            camera={cam}
            label="Illustrative close-up of the reservoir: an appraisal well penetrates the reservoir while datasets are acquired around it"
            depthMarks={[[150, "Seabed"], [OWC, "Fluid contact"]]}
            tags={[
              { x: 520, y: 300, label: "Discovery well", side: "left", minor: true },
              { x: AW, y: 190, label: "Appraisal Well", step: "01", seq: 1 },
              { x: AW + 24, y: top + 8, label: "Core & Wireline", step: "02", seq: 2 },
              { x: AW, y: 352, label: "PVT Analysis", step: "03", side: "left", seq: 3 },
              { x: AW + 10, y: 384, label: "Well Test / DST", step: "04", seq: 4 },
              { x: 880, y: 236, label: "3D Seismic", step: "05", side: "left", seq: 5 },
              { x: 790, y: 436, label: "Initial Reservoir Model", step: "06", side: "left", seq: 6 },
            ]}
          >
            <g data-layer="3d-seismic" data-sequence="5" className={s.survey}>
              {Array.from({ length: 13 }, (_, i) => 380 + i * 42).map((x) => <line key={x} x1={x} x2={x} y1={160} y2={455} />)}
              <rect x={380} y={160} width={504} height={295} />
            </g>
            <g data-layer="reservoir-model" data-sequence="6" className={s.model}>
              {Array.from({ length: 22 }, (_, i) => 400 + i * 20).map((x) => (
                <line key={x} x1={x} x2={x} y1={H.resTop(x)} y2={H.resBase(x)} />
              ))}
              <path d={horizonPath((x) => (H.resTop(x) + H.resBase(x)) / 2, 400, 820)} />
            </g>
            <line x1={330} x2={930} y1={OWC} y2={OWC} className={s.contact} data-layer="fluid-contact" />
            <VerticalWell x={520} to={325} faded />
            <g data-layer="appraisal-well" data-sequence="1">
              <VerticalWell x={AW} to={402} kind="appraisal" />
            </g>
            <polyline points={log} className={s.wireline} data-layer="core-wireline" data-sequence="2" />
            <rect x={AW - 4} y={top + 4} width={8} height={14} className={s.core} data-layer="core" data-sequence="2" />
            <circle cx={AW} cy={352} r={4.5} className={s.pvt} data-layer="pvt" data-sequence="3" />
            <path d={`M${AW + 8},${top + 30} h6 v24 h-6`} className={s.dst} data-layer="dst" data-sequence="4" />
          </FieldSection>
          <Sequence label="Appraisal logic" attr="phase" items={["Discovery", "Data Acquisition", "Reservoir Understanding", "Commerciality Assessment"]} />
        </div>
        <div className={s.text}>
          <SceneHead stage={st}>
            <Steps items={APPRAISAL} />
          </SceneHead>
        </div>
      </div>
    </Scene>
  );
}

/* ───────────── 03 Development & Drilling ───────────── */

const DISCIPLINES: [string, string][] = [
  ["Geology & Geophysics", "구조 · 저류층 분포"],
  ["Reservoir Engineering", "부존량 · 생산 예측"],
  ["Drilling Engineering", "시추 계획 · 정 설계"],
  ["Production Engineering", "완결 · 인공채유"],
  ["Facilities Engineering", "처리 · 운송 설비"],
  ["HSE", "안전 · 보건 · 환경"],
  ["Project Schedule", "단계 · 일정"],
  ["Economic Evaluation", "비용 · 경제성"],
];
const OUTCOMES: [string, string][] = [
  ["Development Decision", "FDP를 바탕으로 개발 여부와 개발안을 결정합니다."],
  ["Wells", "생산정과 주입정을 시추하고 완결합니다."],
  ["Facilities", "유체를 처리하고 내보낼 설비를 설치합니다."],
  ["Production System", "저류층에서 출하까지 하나의 시스템으로 연결됩니다."],
];

/** Fan of thin curves between a column of n rows and a single centre point. */
function Fan({ n, dir, attr }: { n: number; dir: "in" | "out"; attr: string }) {
  const H2 = n * 100;
  return (
    <div className={s.fan} aria-hidden>
      <svg viewBox={`0 0 100 ${H2}`} preserveAspectRatio="none">
        {Array.from({ length: n }, (_, i) => {
          const y = i * 100 + 50, c = H2 / 2;
          const d = dir === "in" ? `M0,${y} C55,${y} 45,${c} 100,${c}` : `M0,${c} C55,${c} 45,${y} 100,${y}`;
          return <path key={i} d={d} {...{ [`data-${attr}`]: i + 1 }} />;
        })}
      </svg>
      <span className={s.fanArrow} />
    </div>
  );
}

function DevelopmentScene() {
  const st = getStage("development");
  const cam: Camera = { x: 0, y: 10, w: 1000, h: 480 };
  return (
    <Scene stage={st}>
      <div className={ss.wrap} style={{ alignItems: "flex-end" }}>
        <div className={s.textWide}><SceneHead stage={st} /></div>
        <p className={s.aside}>
          <span>Field Development Plan</span>
          탐사와 평가에서 얻은 이해를 바탕으로 무엇을, 어떻게, 언제 개발할지를 정하는 통합 계획입니다.
        </p>
      </div>

      <div className={s.fdp} data-layer="fdp-diagram" data-nav-anchor>
        <ul className={s.disciplines} aria-label="Disciplines integrated into the FDP">
          {DISCIPLINES.map(([a, b], i) => (
            <li key={a} data-discipline={i + 1}>
              <span className={s.elNum}>{String(i + 1).padStart(2, "0")}</span>
              <span className={s.discName}>{a}</span>
              <span className={s.discSub}>{b}</span>
            </li>
          ))}
        </ul>
        <Fan n={DISCIPLINES.length} dir="in" attr="converge" />
        <div className={s.fdpNode} data-layer="fdp-node">
          <span className={s.fdpKicker}>Field Development Plan</span>
          <span className={s.fdpMark}>FDP</span>
          <p className={s.fdpBody}>여러 분야의 자료와 판단을 하나의 개발 계획으로 통합합니다.</p>
          <ArrowCTA tone="blue" href={FDP_HREF} title={FDP_HREF ? undefined : "FDP technical page — coming soon"} style={{ marginTop: 28 }}>
            Explore the FDP
          </ArrowCTA>
        </div>
        <Fan n={OUTCOMES.length} dir="out" attr="expand" />
        <ol className={s.outcomes} aria-label="From FDP to production system">
          {OUTCOMES.map(([a, b], i) => (
            <li key={a} data-expand-step={i + 1}>
              <span className={s.elNum}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <div className={s.elTitle}>{a}</div>
                <div className={s.elBody}>{b}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className={s.devField}>
        <FieldSection
          camera={cam}
          label="Illustrative field development: platform, development wells, subsea injector and export line"
          tags={[
            { x: 520, y: 30, label: "Facilities", sub: "Fixed platform", step: "03", seq: 3 },
            { x: 430, y: 300, label: "Wells", sub: "Development wells", step: "02", side: "left", seq: 2 },
            { x: 900, y: 150, label: "Production System", sub: "Flowlines · injection · export", step: "04", side: "left", seq: 4 },
          ]}
        >
          <g data-layer="facilities" data-sequence="3"><Platform x={520} /></g>
          <g data-layer="wells" data-sequence="2">
            <DeviatedWell from={520} tx={430} ty={338} />
            <DeviatedWell from={520} tx={470} ty={330} />
            <DeviatedWell from={520} tx={590} ty={332} />
            <DeviatedWell from={520} tx={690} ty={356} />
            <DeviatedWell from={860} tx={800} ty={410} kind="injector" />
          </g>
          <g data-layer="production-system" data-sequence="4" className={s.flowlines}>
            <path d={`M520,${H.seabed(520) - 1} L860,${H.seabed(860) - 1}`} />
            <path d={`M546,${H.seabed(546) - 1} C600,${H.seabed(600) + 6} 820,${H.seabed(820) + 6} 1000,${H.seabed(1000) + 4}`} className={s.export} />
            <rect x={852} y={H.seabed(860) - 8} width={16} height={8} className={s.tree} />
          </g>
        </FieldSection>
      </div>
    </Scene>
  );
}

/* ───────────── 04 Production ───────────── */

const LOOP: { k: string; items: [string, string][] }[] = [
  { k: "Monitor", items: [["Production Monitoring", "Pressure · Production Rate · WC · GOR"]] },
  { k: "Understand", items: [["Reservoir Management", "PTA · RTA로 압력·유량 거동을 해석하고 저류층 모델을 갱신합니다."]] },
  {
    k: "Act",
    items: [
      ["Artificial Lift", "저류층 압력만으로 부족할 때 펌프나 가스 리프트로 생산을 돕습니다."],
      ["Water / Gas Injection", "주입으로 저류층 압력을 유지하고 유체를 생산정 쪽으로 밀어냅니다."],
      ["Production Optimization", "정별·필드 전체의 생산 조건을 조정합니다."],
      ["Additional Development", "필요하면 추가 시추(infill)나 설비 보강을 검토합니다."],
    ],
  },
];
const CURVES: [string, string, boolean][] = [["#0A5CDB", "Production rate", false], ["#0B1A2C", "Pressure", true], ["#12A4D9", "WC", false], ["#C77A10", "GOR", false]];

function ProductionScene() {
  const st = getStage("production");
  const cam: Camera = { x: 150, y: 10, w: 850, h: 510 };
  const [lx, ly] = wellPoint(520, 470, 330, 0.75);
  const [px, py] = wellPoint(520, 590, 332, 0.8);
  const [ix, iy] = wellPoint(520, 360, 356, 0.55);
  const flow: [number, number, number][] = [[330, 352, 0], [380, 345, 0], [640, 350, 180], [740, 360, 180]];
  return (
    <Scene stage={st}>
      <div className={cx(ss.wrap, s.rowTop)}>
        <div className={s.text}>
          <SceneHead stage={st}>
            <div className={s.loop}>
              {LOOP.map((g) => (
                <div key={g.k} className={s.loopGroup} data-loop={g.k.toLowerCase()}>
                  <span className={s.loopKey}>{g.k}</span>
                  <ul>
                    {g.items.map(([a, b]) => (
                      <li key={a}><span className={s.elTitle}>{a}</span><span className={s.elBody}>{b}</span></li>
                    ))}
                  </ul>
                </div>
              ))}
              <p className={s.loopNote}>↻ 새 자료는 다시 모니터링과 저류층 모델로 돌아갑니다.</p>
            </div>
          </SceneHead>
        </div>
        <div className={cx(s.visual, s.fit, s.fitRight)} style={FIT.production}>
          <FieldSection
            camera={cam}
            label="Illustrative producing field: fluids move toward producers, water is injected, and the fluid contact shifts over time"
            depthMarks={[[70, "Sea level"], [150, "Seabed"]]}
            tags={[
              { x: px, y: py, label: "Producers", sub: "Fluid moves toward the wells", seq: 1 },
              { x: lx, y: ly, label: "Artificial Lift", minor: true, seq: 2 },
              { x: 820, y: 404, label: "Water Injection", sub: "Pressure support", side: "left", seq: 3 },
              { x: ix, y: iy, label: "Additional Development", sub: "Planned infill (if needed)", side: "left", seq: 4 },
              { x: 960, y: OWC - 10, label: "Initial → current contact", sub: "Understanding is updated", side: "left", minor: true, seq: 5 },
            ]}
          >
            <Platform x={520} />
            <DeviatedWell from={520} tx={430} ty={338} />
            <DeviatedWell from={520} tx={470} ty={330} />
            <DeviatedWell from={520} tx={590} ty={332} />
            <DeviatedWell from={520} tx={690} ty={356} />
            <DeviatedWell from={860} tx={800} ty={410} kind="injector" />
            <DeviatedWell from={520} tx={360} ty={356} kind="infill" dashed seq={4} />
            <rect x={lx - 4} y={ly - 6} width={8} height={12} className={s.esp} data-layer="artificial-lift" />
            <g data-layer="fluid-flow" data-sequence="1" className={s.flow}>
              {flow.map(([x, y, rot]) => (
                <path key={x} d="M-7,-4 L0,0 L-7,4" transform={`translate(${x} ${y}) rotate(${rot})`} />
              ))}
              {[[790, 425], [770, 432]].map(([x, y]) => (
                <path key={x} d="M-7,-4 L0,0 L-7,4" transform={`translate(${x} ${y}) rotate(200)`} className={s.inject} />
              ))}
            </g>
            <line x1={150} x2={1000} y1={OWC} y2={OWC} className={s.contact} data-layer="contact-initial" />
            <line x1={150} x2={1000} y1={OWC - 10} y2={OWC - 10} className={s.contactNow} data-layer="contact-current" />
          </FieldSection>
          <div className={s.monitor} data-layer="monitoring" data-sequence="1">
            <div className={s.monitorHead}>
              <span className={s.monitorTitle}>Production monitoring · illustrative</span>
              <div className={s.legend}>
                {CURVES.map(([c, l, dashed]) => (
                  <span key={l}><span className={s.lineKey} style={{ borderTopStyle: dashed ? "dashed" : "solid", borderTopColor: c }} />{l}</span>
                ))}
              </div>
            </div>
            <div style={{ height: 170 }}><TechViz kind="monitor" seed={6} label="Illustrative monitoring curves: production rate, pressure, water cut and GOR over time" /></div>
          </div>
        </div>
      </div>
    </Scene>
  );
}

/* ───────────── 05 Decommissioning ───────────── */

const DECOM: [string, string][] = [
  ["Plug & Abandonment", "시멘트 플러그로 시추공을 영구적으로 밀폐합니다."],
  ["Facility Removal", "해상 구조물과 해저 설비를 철거합니다."],
  ["Environmental Restoration", "해저면과 주변 환경을 복원하고 모니터링합니다."],
];

function DecommissioningScene() {
  const st = getStage("decommissioning");
  const cam: Camera = { x: 0, y: 0, w: 1000, h: 480 };
  const wells: [number, number][] = [[430, 338], [470, 330], [590, 332], [690, 356]];
  return (
    <Scene stage={st}>
      <div className={cx(ss.wrap, s.rowTop)}>
        <div className={s.text}>
          <SceneHead stage={st}>
            <Steps items={DECOM} arrows />
          </SceneHead>
        </div>
        <div className={cx(s.visual, s.fit, s.fitRight)} style={FIT.decommissioning}>
          <FieldSection
            camera={cam}
            muted
            label="Illustrative decommissioned field: plugged wells, platform removed, seabed restored"
            tags={[
              { x: 520, y: 40, label: "Facility Removal", step: "02", seq: 2 },
              { x: 520, y: 196, label: "Plug & Abandonment", step: "01", side: "left", seq: 1 },
              { x: 830, y: H.seabed(830) - 2, label: "Environmental Restoration", step: "03", side: "left", seq: 3 },
            ]}
          >
            <g data-layer="facility-removal" data-sequence="2"><Platform x={520} ghost /></g>
            <g data-layer="plug-abandonment" data-sequence="1">
              {wells.map(([tx, ty]) => <DeviatedWell key={tx} from={520} tx={tx} ty={ty} kind="abandoned" dashed />)}
              <rect x={515} y={170} width={10} height={14} className={s.plug} />
              {wells.map(([tx, ty]) => <rect key={`p${tx}`} x={tx - 5} y={ty - 22} width={10} height={12} className={s.plug} />)}
            </g>
            <path d={horizonPath((x) => H.seabed(x) - 1)} className={s.restored} data-layer="restoration" data-sequence="3" />
          </FieldSection>
        </div>
      </div>
    </Scene>
  );
}

/** The five journey scenes, in scroll order. */
export function JourneyScenes() {
  return (
    <>
      <ExplorationScene />
      <AppraisalScene />
      <DevelopmentScene />
      <ProductionScene />
      <DecommissioningScene />
    </>
  );
}
