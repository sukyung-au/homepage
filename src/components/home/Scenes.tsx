import { ArrowCTA } from "@/components/ds/ArrowCTA";
import { Callout } from "@/components/ds/Callout";
import { ImageSlot } from "@/components/ds/ImageSlot";
import { TechViz } from "@/components/ds/TechViz";
import { Fact, Scene, SceneHead, sceneStyles as ss } from "@/components/site/scene";
import { FIRST_TOPIC_WITH_PAGE, topicHref } from "@/lib/technology";
import { getStage } from "@/lib/stages";
import { ReservoirScene } from "./ReservoirScene";
import s from "./Scenes.module.css";

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

function SurfaceScene() {
  const st = getStage("surface");
  return (
    <Scene stage={st} style={{ paddingBottom: 0 }}>
      <div className={ss.wrap} style={{ alignItems: "flex-end", marginBottom: 72 }}>
        <div className={s.textWide}><SceneHead stage={st} /></div>
        <div className={cx(s.facts, s.facts3)} style={{ flex: "1 1 360px", marginTop: 0 }}>
          <Fact v="12,400" l="분지 면적 (km²)" />
          <Fact v="3" l="원격탐사 데이터셋" />
          <Fact v="7" l="유망 지역 선별" />
        </div>
      </div>
      <div className={s.surfacePhoto}>
        <ImageSlot id="scene-surface" placeholder="Full-bleed photo — coastline / offshore acreage from above (21:9)" />
        <div className={s.rule} style={{ bottom: 0 }} />
      </div>
    </Scene>
  );
}

const ELEMENTS: [string, string][] = [
  ["Source rock", "근원암 — 유기물이 열과 압력으로 탄화수소가 됩니다."],
  ["Migration", "이동 — 부력으로 투수성 지층을 따라 위로 이동합니다."],
  ["Reservoir", "저류암 — 공극이 많은 사암·탄산염암이 유체를 담습니다."],
  ["Trap & Seal", "트랩·덮개암 — 불투수층이 이동을 멈추고 보존합니다."],
];

function PetroleumScene() {
  const st = getStage("petroleum");
  return (
    <Scene stage={st}>
      <div className={ss.wrap}>
        <div className={s.text}>
          <SceneHead stage={st}>
            <ol className={s.elements}>
              {ELEMENTS.map(([a, b], i) => (
                <li key={a}>
                  <span className={s.elNum}>{`0${i + 1}`}</span>
                  <div>
                    <div className={s.elTitle}>{a}</div>
                    <div className={s.elBody}>{b}</div>
                  </div>
                </li>
              ))}
            </ol>
          </SceneHead>
        </div>
        <div className={cx(s.visual, s.bleedRight)} style={{ height: 680 }}>
          <TechViz kind="strata" seed={5} label="Petroleum system cross-section" />
          <Callout x="40%" y="27%" label="Seal" sub="Shale cap rock" />
          <Callout x="40%" y="40%" label="Trapped hydrocarbons" sub="Anticline crest" />
          <Callout x="72%" y="58%" label="Normal fault" />
          <Callout x="22%" y="84%" label="Source rock" sub="Kitchen · Ro 0.9%" />
          <div className={s.rule} style={{ top: "10%" }} />
        </div>
      </div>
    </Scene>
  );
}

function SubsurfaceScene() {
  const st = getStage("subsurface");
  return (
    <Scene stage={st}>
      <div className={ss.wrap}>
        <div className={cx(s.visual, s.bleedLeft)} style={{ height: 600 }}>
          <TechViz kind="structure" seed={21} label="Depth-structure contour map" />
          <Callout x="46%" y="44%" label="Crest · 2,450 m" sub="Proposed well location" />
          <div className={cx(s.scale, s.scaleBox)}>
            <span>Depth (m TVDSS)</span>
            <span className={s.scaleBar} style={{ width: 120, background: "linear-gradient(90deg,#EEF4F8,#9AD7EA,#16A3D8,#1F4FD1,#0B1F6B)" }} />
            <span>2,400 → 2,900</span>
          </div>
        </div>
        <div className={s.text}>
          <SceneHead stage={st}>
            <div className={cx(s.facts, s.facts2)}>
              <Fact v="38 km²" l="구조 폐합 면적" />
              <Fact v="120 m" l="폐합 높이" />
            </div>
          </SceneHead>
        </div>
      </div>
    </Scene>
  );
}

const TRACKS: [string, string, string][] = [
  ["Depth", "m MD", "var(--ex-faint)"],
  ["GR", "0 – 150 API", "#C77A10"],
  ["Resistivity", "0.2 – 2000 Ω·m", "#0A5CDB"],
  ["Density · Neutron", "1.95 – 2.95 g/cc", "#D6402B"],
  ["Lithology", "", "var(--ex-navy)"],
];
const LITHOLOGY: [string, string][] = [["#F29A1F", "Hydrocarbon sand"], ["#E3D3AE", "Water sand"], ["#9DAFC2", "Shale"]];

function WellScene() {
  const st = getStage("well");
  return (
    <Scene stage={st}>
      <div className={ss.wrap} style={{ alignItems: "stretch" }}>
        <div className={s.text} style={{ alignSelf: "center" }}>
          <SceneHead stage={st}>
            <div className={s.legend} style={{ marginTop: 36 }}>
              {LITHOLOGY.map(([c, l]) => (
                <span key={l}><span className={s.swatch} style={{ background: c }} />{l}</span>
              ))}
            </div>
          </SceneHead>
        </div>
        <div className={s.logPanel}>
          <div className={s.tracks}>
            {TRACKS.map(([a, b, c]) => (
              <div key={a} className={s.track} style={{ borderTopColor: c }}>
                <div className={s.trackName}>{a}</div>
                <div className={s.trackUnit}>{b || " "}</div>
              </div>
            ))}
          </div>
          <div style={{ height: 620 }}><TechViz kind="log" seed={8} label="Well-log tracks, 2,400–2,700 m" /></div>
        </div>
      </div>
    </Scene>
  );
}

function SeismicScene() {
  const st = getStage("seismic");
  return (
    <Scene stage={st} style={{ padding: "140px 0" }}>
      <div className={ss.wrap} style={{ padding: "0 var(--gutter-page)", alignItems: "flex-end", marginBottom: 56 }}>
        <div className={s.textWide}><SceneHead stage={st} /></div>
        <div className={cx(s.facts, s.facts2)} style={{ flex: "0 1 360px", marginTop: 0 }}>
          <Fact dark v="1,240 km²" l="3D 탄성파 취득 면적" />
          <Fact dark v="12.5 m" l="빈(bin) 간격" />
        </div>
      </div>
      <div style={{ position: "relative", height: 560 }}>
        <TechViz kind="seismic" seed={4} label="Time-migrated seismic section, inline 1184" />
        <div className={s.sectionTag}>Inline 1184 · Time migrated</div>
        <Callout x="62%" y="46%" label="Top reservoir" sub="Interpreted horizon" />
      </div>
    </Scene>
  );
}

const CURVES: [string, string, boolean][] = [["#0A5CDB", "Oil rate", false], ["#12A4D9", "Water cut", false], ["#0B1A2C", "Reservoir pressure", true]];

function EngineeringScene() {
  const st = getStage("engineering");
  return (
    <Scene stage={st}>
      <div className={ss.wrap}>
        <div className={s.visual} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className={s.legend}>
            {CURVES.map(([c, l, dashed]) => (
              <span key={l}><span className={s.lineKey} style={{ borderTopStyle: dashed ? "dashed" : "solid", borderTopColor: c }} />{l}</span>
            ))}
          </div>
          <div style={{ height: 460 }}><TechViz kind="decline" seed={2} label="Production forecast: oil rate, water cut and reservoir pressure over 20 years" /></div>
        </div>
        <div className={s.text}>
          <SceneHead stage={st}>
            <div className={cx(s.facts, s.facts3)} style={{ gap: 20 }}>
              <Fact v="42%" l="예상 회수율" />
              <Fact v="6 yr" l="정점 생산 유지" />
              <Fact v="18" l="주입정" />
            </div>
          </SceneHead>
        </div>
      </div>
    </Scene>
  );
}

function ProductionScene() {
  const st = getStage("production");
  return (
    <Scene stage={st}>
      <div className={ss.wrap}>
        <div className={cx(s.visual, s.bleedLeft)} style={{ height: 640 }}>
          <ImageSlot id="scene-production" placeholder="Photo — FPSO / production facility at sea" sizes="(max-width: 900px) 100vw, 60vw" />
        </div>
        <div className={s.text}>
          <SceneHead stage={st}>
            <div className={cx(s.facts, s.facts2)}>
              <Fact v="120 kbbl/d" l="처리 용량" />
              <Fact v="2.1 MMbbl" l="저장 용량" />
              <Fact v="24" l="해저 생산정" />
              <Fact v="99.2%" l="설비 가동률" />
            </div>
          </SceneHead>
        </div>
      </div>
    </Scene>
  );
}

function FieldScene() {
  const st = getStage("field");
  return (
    <Scene stage={st} style={{ padding: 0, minHeight: 820, justifyContent: "flex-end" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <ImageSlot id="scene-field" placeholder="Wide photo — full field development, vessels and platforms at dusk" />
      </div>
      <div className={s.fieldCard}>
        <SceneHead stage={st}>
          <div style={{ marginTop: 36 }}>
            <ArrowCTA tone="blue" href={topicHref(FIRST_TOPIC_WITH_PAGE)}>Read the technical chapters</ArrowCTA>
          </div>
        </SceneHead>
      </div>
    </Scene>
  );
}

/** The nine journey scenes, in scroll order. */
export function JourneyScenes() {
  return (
    <>
      <SurfaceScene />
      <PetroleumScene />
      <SubsurfaceScene />
      <WellScene />
      <SeismicScene />
      <ReservoirScene />
      <EngineeringScene />
      <ProductionScene />
      <FieldScene />
    </>
  );
}
