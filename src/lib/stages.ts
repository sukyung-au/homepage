/**
 * The five Journey stages (homepage scenes) — how an oil & gas development project progresses.
 * Order = scroll order. Technology (the knowledge used along the way) lives in technology.ts.
 */
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
  /** Depth range the scene's camera covers (qualitative) */
  depth: string;
  bg: string;
  dark: boolean;
  /** Main question / message — the scene headline */
  title: string;
  kr: string;
  /** Future motion concept key, exposed as data-motion on the scene */
  motion: string;
  t: StageTransition;
}

export const STAGES: Stage[] = [
  {
    id: "exploration", num: "01", label: "Exploration", sub: "Regional study · Seismic · Exploration well", depth: "Basin → Prospect", bg: "#F6F8FB", dark: false,
    title: "Where could hydrocarbons exist?",
    kr: "넓은 퇴적분지에서 출발해 탄화수소가 모일 수 있는 지하 구조를 좁혀 갑니다. 지역 지질 연구로 유망 지역을 고르고, 탄성파 탐사와 해석으로 구조를 그린 뒤, 탐사정을 시추해 탄화수소의 존재를 직접 확인합니다.",
    motion: "seismic-acquisition-reveal",
    t: {
      in: "분지 규모의 지역 지도에서 시작해 유망 구조로 줌인합니다.",
      hold: "탐사선이 탄성파를 취득하고, 반사면이 위에서 아래로 차례로 드러난 뒤 해석 horizon이 그려집니다. 마지막으로 탐사정이 구조 정점까지 내려갑니다.",
      out: "탐사정이 발견(discovery) 지점에 고정되고 카메라가 저류층 쪽으로 다가갑니다.",
      persist: "Field section · Exploration well · Depth scale",
    },
  },
  {
    id: "appraisal", num: "02", label: "Appraisal", sub: "Appraisal well · Data · Reservoir model", depth: "Seabed → Reservoir", bg: "#EEF2F7", dark: false,
    title: "How much is there — and can it produce?",
    kr: "발견 이후에는 불확실성을 줄이는 단계입니다. 평가정을 시추해 코어·검층·유체·유동 자료를 얻고, 3D 탄성파와 함께 초기 저류층 모델을 만들어 상업성을 판단합니다.",
    motion: "well-descent-datasets",
    t: {
      in: "카메라가 저류층으로 다가가고 평가정이 해저면에서 내려옵니다.",
      hold: "평가정이 저류층을 관통하면서 Core & Wireline → PVT → Well test → 3D seismic → Reservoir model 순으로 자료가 나타납니다.",
      out: "초기 저류층 모델이 개발 계획(FDP)의 입력이 됩니다.",
      persist: "Field section · Discovery & appraisal wells",
    },
  },
  {
    id: "development", num: "03", label: "Development & Drilling", sub: "FDP · Wells · Facilities", depth: "Surface → Reservoir", bg: "#FFFFFF", dark: false,
    title: "From discovery to development.",
    kr: "상업성이 확인되면 개발 계획을 세웁니다. 여러 분야의 자료와 판단이 하나의 필드 개발 계획(FDP)으로 모이고, 개발이 결정되면 생산정과 설비, 그리고 이를 잇는 생산 시스템이 만들어집니다.",
    motion: "disciplines-converge-fdp-expand",
    t: {
      in: "각 분야의 자료가 선을 따라 FDP로 모입니다(converge).",
      hold: "FDP가 Development Decision → Wells → Facilities → Production System으로 펼쳐집니다(expand).",
      out: "필드 단면에 개발정과 설비가 세워진 상태로 생산 단계로 넘어갑니다.",
      persist: "Field section · Platform · Development wells",
    },
  },
  {
    id: "production", num: "04", label: "Production", sub: "Monitoring · Reservoir management · Optimization", depth: "Surface → Reservoir", bg: "#EEF2F7", dark: false,
    title: "Manage the reservoir. Optimize the field.",
    kr: "생산이 시작되어도 저류층에 대한 이해는 계속 바뀝니다. 압력·생산량·수분율(WC)·가스유비(GOR)를 모니터링하고, 압력·유량 거동 분석으로 저류층 모델을 갱신하며, 인공채유와 주입, 필요하면 추가 개발로 필드를 최적화합니다.",
    motion: "fluid-flow-data",
    t: {
      in: "생산정으로 유체가 흐르기 시작하고 모니터링 곡선이 시간 축을 따라 그려집니다.",
      hold: "주입수가 저류층을 밀고, 유체 경계면이 움직이며, 곡선과 단면이 함께 갱신됩니다.",
      out: "생산 곡선이 끝에 다다르고 설비가 하나씩 정리되기 시작합니다.",
      persist: "Field section · Wells · Monitoring curves",
    },
  },
  {
    id: "decommissioning", num: "05", label: "Decommissioning", sub: "P&A · Removal · Restoration", depth: "Seabed", bg: "#F6F8FB", dark: false,
    title: "End of production is not the end of responsibility.",
    kr: "경제적인 생산이 끝나면 필드를 안전하게 정리합니다. 시추공을 영구적으로 막고, 설비를 철거하고, 주변 환경을 복원하는 것까지가 개발의 마지막 단계입니다.",
    motion: "pa-removal-restoration",
    t: {
      in: "생산이 멈추고 장면이 조용해집니다.",
      hold: "P&A → Facility removal → Environmental restoration 순으로 진행됩니다.",
      out: "푸터로 이어지고 StageNav가 5/5 완료 상태가 됩니다.",
      persist: "Field section (restored) · StageNav",
    },
  },
];

export const sceneId = (stageId: string) => `scene-${stageId}`;

export function getStage(id: string): Stage {
  const s = STAGES.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown stage: ${id}`);
  return s;
}
