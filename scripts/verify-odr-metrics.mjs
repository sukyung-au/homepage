// Checks the ODR demo's metric rules (src/components/ai/odr/metrics.ts) on small hand-computed cases.
// Run: node scripts/verify-odr-metrics.mjs   (Node 22+, which loads the .ts module directly)
import { BBL, PLANT, pointChange, selectionTotal, signed, wellValue } from "../src/components/ai/odr/metrics.ts";

let failed = 0;
const near = (a, b) => (a === null || b === null ? a === b : Math.abs(a - b) < 1e-9);
function check(name, got, want) {
  const ok = Array.isArray(want) ? near(got[0], want[0]) && got[1] === want[1] : near(got, want);
  console.log(`${ok ? "pass" : "FAIL"}  ${name}${ok ? "" : `  got ${JSON.stringify(got)}, want ${JSON.stringify(want)}`}`);
  if (!ok) failed++;
}

// Three wells on one day (index 0). C has no water reading; D is shut in (all zeros).
const A = { oil: [100], water: [250], steam: [300], bhp: [3000] };
const B = { oil: [50], water: [100], steam: [200], bhp: [2800] };
const C = { oil: [80], water: [null], steam: [240], bhp: [null] };
const Dz = { oil: [0], water: [0], steam: [0], bhp: [0] };
const all = [A, B, C, Dz];

check("well oil = m³ × 6.28981", wellValue("oil", A, 0), 100 * BBL);
check("well emulsion = (oil + water) × 6.28981", wellValue("emulsion", A, 0), 350 * BBL);
check("well emulsion is empty without water", wellValue("emulsion", C, 0), null);
check("well SOR = steam ÷ oil", wellValue("sor", A, 0), 3);
check("well SOR is empty when oil is 0", wellValue("sor", Dz, 0), null);

check("total oil: plain sum of available wells", selectionTotal("oil", all, 0), [230 * BBL, 4]);
check("total emulsion: only wells with oil and water", selectionTotal("emulsion", all, 0), [(100 + 250 + 50 + 100 + 0 + 0) * BBL, 3]);
check("total SOR = ΣSteam ÷ ΣOil (not a sum of ratios)", selectionTotal("sor", all, 0), [(300 + 200 + 240) / (100 + 50 + 80), 3]);
check("total WOR = ΣWater ÷ ΣOil over wells with water", selectionTotal("wor", all, 0), [(250 + 100) / (100 + 50), 2]);
check("total BHP = mean of values above 0", selectionTotal("bhp", all, 0), [(3000 + 2800) / 2, 2]);
check("SOR ratio differs from the average of ratios", Math.abs(selectionTotal("sor", [A, B], 0)[0] - (3 + 4) / 2) > 0.1 ? 1 : 0, 1);

const day = { bitumen: 1000, water: 2500, steam: 2700, pipeline: 9000, bitComp: 600, dilComp: 300 };
const plant = Object.fromEntries(PLANT.map((m) => [m.key, m.value(day)]));
check("plant WOR = produced water ÷ bitumen", plant.wor, 2.5);
check("plant SOR = steam ÷ bitumen", plant.sor, 2.7);
check("plant emulsion = (bitumen + water) × 6.28981", plant.emulsion, 3500 * BBL);
check("D/B ratio = diluent ÷ bitumen component × 100", plant.dil_ratio, 50);
check("D/B ratio is empty when bitumen component is 0", PLANT.find((m) => m.key === "dil_ratio").value({ ...day, bitComp: 0 }), null);

const ex = pointChange(10000, 11000);
check("range: change = end − start (10,000 → 11,000)", ex.diff, 1000);
check("range: % change = change ÷ start × 100", ex.pct, 10);
check("range: decrease keeps its sign", pointChange(11000, 10000).diff, -1000);
check("range: % change not computed when start is 0", pointChange(0, 500).pct, null);
check("range: nothing computed when start is missing", pointChange(null, 500).diff, null);
check("range: nothing computed when end is missing", pointChange(500, null).pct, null);
check("range: sign shown on increase", signed(1000, 0) === "+1,000" ? 1 : 0, 1);
check("range: sign shown on decrease", signed(-12.34, 1) === "-12.3" ? 1 : 0, 1);

console.log(failed ? `\n${failed} check(s) failed` : "\nall checks passed");
process.exit(failed ? 1 : 0);
