/** The nine Journey stages (homepage scenes). Order = scroll order. */
export interface StageTransition {
  /** How the scene enters (for future scroll-driven motion) */
  in: string;
  /** What happens while the scene is pinned */
  hold: string;
  /** How the scene hands off to the next one */
  out: string;
  /** Element that persists across the seam */
  persist: string;
}

export interface Stage {
  id: string;
  num: string;
  label: string;
  sub: string;
  depth: string;
  bg: string;
  dark: boolean;
  title: string;
  kr: string;
  t: StageTransition;
}

export const STAGES: Stage[] = [
  {
    id: "surface", num: "01", label: "Surface", sub: "Remote sensing · Gravity · Magnetics", depth: "0 m", bg: "#F6F8FB", dark: false,
    title: "The journey begins at the Earth's surface.",
    kr: "위성 영상, 지표 지질조사, 중력·자력 탐사로 수천 km²의 분지에서 탐사할 가치가 있는 지역을 좁혀 갑니다.",
    t: {
      in: "히어로 사진이 확대되어 full-bleed 장면이 됩니다. 수평선(sea level seam)은 같은 높이에 고정.",
      hold: "사진 위 관측 지점 라벨이 순서대로 나타납니다.",
      out: "카메라가 해수면 아래로 하강. 사진은 위로 밀려나고 지층 단면이 아래에서 올라옵니다.",
      persist: "Sea level seam · Depth ruler 0 m",
    },
  },
  {
    id: "petroleum", num: "02", label: "Petroleum System", sub: "Source · Migration · Trap", depth: "0 – 4,000 m", bg: "#F6F8FB", dark: false,
    title: "From source rock to trapped hydrocarbons.",
    kr: "근원암에서 생성된 탄화수소는 이동하여 저류암에 모이고, 덮개암과 트랩에 의해 보존됩니다. 요소와 타이밍이 모두 맞아야 석유 시스템이 성립합니다.",
    t: {
      in: "지층 단면이 아래에서 차오릅니다(wipe up). 배경은 그대로.",
      hold: "근원암 → 이동 → 저류암 → 덮개암 → 트랩 순으로 라벨과 레이어가 하이라이트.",
      out: "단면이 뒤로 기울며 위에서 내려다보는 평면(구조도)으로 회전합니다.",
      persist: "Strata layer colors · Depth ruler",
    },
  },
  {
    id: "subsurface", num: "03", label: "Subsurface", sub: "Geology · Structure · Characterization", depth: "2,450 m", bg: "#EEF2F7", dark: false,
    title: "Reading the structure beneath.",
    kr: "지층의 형태, 단층과 습곡을 해석해 탄화수소가 모일 수 있는 닫힌 구조를 찾습니다. 결과는 깊이 구조도로 정리됩니다.",
    t: {
      in: "단면 → 평면 회전이 끝나며 등고선이 그려집니다.",
      hold: "스크롤에 따라 등고선 깊이 값이 바뀝니다(depth slicing).",
      out: "구조 정점(crest)에 시추 위치 핀이 꽂히고, 수직선이 아래로 내려갑니다.",
      persist: "Well location pin",
    },
  },
  {
    id: "well", num: "04", label: "Well & Logging", sub: "Drilling · Petrophysics", depth: "2,400 – 2,700 m", bg: "#E6ECF3", dark: false,
    title: "Data reveals the story below.",
    kr: "시추공에서 측정한 감마선·비저항·밀도·중성자 검층이 암상과 유체를 구분합니다. 지하를 직접 확인하는 1차원의 창입니다.",
    t: {
      in: "시추 궤적(수직선)이 넓어지며 검층 트랙으로 펼쳐집니다.",
      hold: "트랙이 깊이 방향으로 스크롤되고 탄화수소 구간이 하이라이트.",
      out: "검층 트랙이 옆으로 복제되어 수많은 트레이스가 되며 탄성파 단면으로 이어집니다.",
      persist: "Wellbore line",
    },
  },
  {
    id: "seismic", num: "05", label: "Seismic", sub: "Acquisition · Processing · Interpretation", depth: "0 – 4.0 s TWT", bg: "#0B1A2C", dark: true,
    title: "Imaging the invisible.",
    kr: "지표에서 발생시킨 탄성파가 지층 경계에서 반사되어 돌아옵니다. 수백만 개의 트레이스를 처리해 지하를 3차원 영상으로 재구성합니다.",
    t: {
      in: "트레이스가 펼쳐지고 배경이 navy로 어두워집니다 — 여정의 가장 깊은 지점.",
      hold: "단면이 수평으로 패닝되고 해석 horizon 라인이 그려집니다.",
      out: "해석된 horizon이 저류층 상부면이 되어 3D 속성 모델로 돌출(extrude)됩니다.",
      persist: "Interpreted horizon line",
    },
  },
  {
    id: "reservoir", num: "06", label: "Reservoir", sub: "Modeling · Properties", depth: "2,450 m", bg: "#13263D", dark: true,
    title: "From structure to property.",
    kr: "검층과 탄성파 자료를 결합해 공극률·투과도·포화도의 3차원 분포를 모델링합니다. 정적 모델은 모든 개발 계획의 기준이 됩니다.",
    t: {
      in: "horizon surface가 돌출되어 속성 맵이 됩니다.",
      hold: "공극률 → 투과도 → 포화도로 속성이 전환됩니다(같은 형태, 다른 색).",
      out: "맵 위로 유선(streamline)이 흐르고 배경이 다시 밝아지기 시작 — 상승.",
      persist: "Field outline",
    },
  },
  {
    id: "engineering", num: "07", label: "Reservoir Engineering", sub: "Simulation · Recovery", depth: "Reservoir", bg: "#F6F8FB", dark: false,
    title: "Optimizing flow and recovery.",
    kr: "동적 시뮬레이션으로 압력과 유체의 흐름을 예측하고, 주입·생산 전략을 비교해 회수율을 높입니다.",
    t: {
      in: "배경이 밝아지고 곡선이 시간 축을 따라 그려집니다.",
      hold: "시나리오(자연 생산 / 워터플러딩) 비교 토글.",
      out: "생산 곡선의 끝점이 생산 설비 사진으로 연결됩니다.",
      persist: "Oil rate curve (blue)",
    },
  },
  {
    id: "production", num: "08", label: "Production", sub: "Wells · Facilities · Operations", depth: "0 m", bg: "#FFFFFF", dark: false,
    title: "Turning resources into energy.",
    kr: "생산정과 인공채유, 해상 생산설비를 통해 저류층 유체를 지표로 끌어올리고 분리·처리하여 출하합니다.",
    t: {
      in: "사진이 아래에서 올라오며 수면 위로 복귀. Depth ruler가 0 m로.",
      hold: "운영 지표가 순서대로 나타납니다.",
      out: "설비 사진이 축소되어 필드 전체 레이아웃 안의 한 지점이 됩니다.",
      persist: "Sea level seam",
    },
  },
  {
    id: "field", num: "09", label: "Field Development", sub: "Plan · Infrastructure · Production", depth: "0 m", bg: "#F6F8FB", dark: false,
    title: "Connecting technology, people and the future.",
    kr: "지질·공학·시설·경제성을 하나의 개발 계획으로 통합합니다. 수십 년의 운영과 감축 목표까지 함께 설계합니다.",
    t: {
      in: "와이드 줌아웃으로 필드 전체가 보입니다.",
      hold: "—",
      out: "푸터로 이어지고 StageNav가 9/9 완료 상태가 됩니다.",
      persist: "StageNav",
    },
  },
];

export const sceneId = (stageId: string) => `scene-${stageId}`;

export function getStage(id: string): Stage {
  const s = STAGES.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown stage: ${id}`);
  return s;
}
