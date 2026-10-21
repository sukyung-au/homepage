/** Static content of topic 3.2 shared by server-rendered parts (kept out of the "use client" modules). */

/** Variables of the pressure-drawdown equation: symbol, meaning, unit */
export const VARIABLES: [string, string, string][] = [
  ["Pr", "Average Reservoir Pressure", "psi"],
  ["Pwf", "Flowing Bottomhole Pressure", "psi"],
  ["q", "Oil Production Rate", "STB/day"],
  ["B", "Formation Volume Factor", "RB/STB"],
  ["μ", "Viscosity", "cP"],
  ["k", "Permeability", "mD"],
  ["h", "Net Pay Thickness", "ft"],
  ["re", "Drainage Radius", "ft"],
  ["rw", "Wellbore Radius", "ft"],
  ["s", "Skin Factor", "dimensionless"],
];

/** Recovery stages (07) */
export const STAGES = [
  {
    key: "Primary Recovery", ko: "1차 회수",
    body: "저류층이 가진 자연 에너지(유체·암석 팽창, 용해가스, 가스캡, 대수층, 중력)로 생산합니다.",
    tag: "Natural reservoir energy",
  },
  {
    key: "Secondary Recovery", ko: "2차 회수",
    body: "물(waterflood)이나 가스를 주입해 저류층 압력을 지지하고, 원유를 생산정 쪽으로 밀어냅니다.",
    tag: "Injection for pressure support & displacement",
  },
  {
    key: "Tertiary / Enhanced Oil Recovery", ko: "3차 회수 · EOR",
    body: "유체의 이동도, 점도, 계면장력, 혼화성 등을 바꿔 1·2차 회수 후 남은 원유를 추가로 회수합니다.",
    tag: "Change fluid / rock–fluid interactions",
  },
];
