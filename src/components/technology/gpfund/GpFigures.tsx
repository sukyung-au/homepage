import f from "../fundamentals/Fundamentals.module.css";
import { rc, ricker, synth, wiggle, wiggleFill } from "./seismicModel";
import g from "./GpFund.module.css";

/** Topic 1.2 figures. Conceptual: synthetic traces are computed from normalized impedances; no axis values. */

/* ── Opening: source, receivers, reflections and the recorded trace ── */
const INTERFACES = [150, 236, 312];
const RECEIVERS = [200, 240, 280, 320, 360, 400, 440, 480];

export function RayPaths() {
  const trace = synth(120, [{ at: 38, r: 0.9 }, { at: 70, r: -0.7 }, { at: 98, r: 0.6 }], 0.07);
  return (
    <svg viewBox="0 0 640 380" className={f.graph} role="img" aria-label="Seismic reflection: energy from a source at the surface travels down, reflects at boundaries between rock layers and returns to receivers, which record it as a trace">
      <rect x="20" y="60" width="520" height="90" className={g.layer1} />
      <rect x="20" y="150" width="520" height="86" className={g.layer2} />
      <rect x="20" y="236" width="520" height="76" className={g.layer3} />
      <rect x="20" y="312" width="520" height="52" className={g.layer4} />
      {INTERFACES.map((y) => <path key={y} d={`M20,${y} H540`} className={g.interface} />)}
      <path d="M20,60 H540" className={g.surface} />
      <path d="M120,60 L200,150 L280,60" className={g.ray} />
      <path d="M120,60 L280,236 L440,60" className={g.ray} />
      <path d="M120,60 L300,312 L480,60" className={g.rayFaint} />
      {RECEIVERS.map((x) => <path key={x} d={`M${x - 6},54 L${x + 6},54 L${x},62 Z`} className={g.receiver} />)}
      <path d="M120,46 l3.5,7 7.5,1 -5.5,5 1.5,7.5 -7,-3.5 -7,3.5 1.5,-7.5 -5.5,-5 7.5,-1 Z" className={g.source} />
      <text x="120" y="32" className={f.gNote} textAnchor="middle">Source</text>
      <text x="340" y="32" className={f.gNote} textAnchor="middle">Receivers</text>
      <text x="532" y="228" className={f.gTinyBlue} textAnchor="end">Boundary · impedance changes</text>

      <path d="M600,60 V364" className={g.zero} />
      <path d={wiggleFill(trace, 600, 64, 2.5, 26)} className={g.fill} />
      <path d={wiggle(trace, 600, 64, 2.5, 26)} className={g.trace} />
      <text x="600" y="32" className={f.gNote} textAnchor="middle">Trace</text>
      <text x="628" y="364" className={f.gAxisLabel} textAnchor="end" transform="rotate(-90 628 364)">Time ↓</text>
    </svg>
  );
}

/* ── 03 P- and S-waves ── */
export function WaveTypes() {
  const cols = Array.from({ length: 22 }, (_, i) => i);
  return (
    <svg viewBox="0 0 560 262" className={f.graph} role="img" aria-label="P-wave: particles move back and forth along the direction the wave travels, making zones of compression and expansion. S-wave: particles move perpendicular to the direction of travel">
      <text x="20" y="24" className={f.gNote}>P-wave · compressional</text>
      {cols.map((i) => [0, 1, 2].map((r) => {
        const x0 = 40 + i * 22;
        const x = x0 + 7 * Math.sin((i / 21) * Math.PI * 4);
        return <circle key={`p${i}-${r}`} cx={x} cy={46 + r * 18} r="3.2" className={g.particle} />;
      }))}
      <path d="M40,104 H520" className={g.dir} markerEnd="url(#gp-head)" />
      <text x="520" y="120" className={f.gTiny} textAnchor="end">Travel direction · particles move ↔ along it</text>

      <text x="20" y="152" className={f.gNote}>S-wave · shear</text>
      {cols.map((i) => [0, 1, 2].map((r) => {
        const x = 40 + i * 22;
        const y = 172 + r * 18 + 10 * Math.sin((i / 21) * Math.PI * 4);
        return <circle key={`s${i}-${r}`} cx={x} cy={y} r="3.2" className={g.particleS} />;
      }))}
      <path d="M40,236 H520" className={g.dir} markerEnd="url(#gp-head)" />
      <text x="520" y="250" className={f.gTiny} textAnchor="end">Particles move ↕ across it</text>
      <defs><marker id="gp-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 Z" className={g.headNavy} /></marker></defs>
    </svg>
  );
}

/* ── 05 Convolution: impedance → reflectivity → ✱ wavelet → trace ── */
const Z = [1.0, 1.3, 1.15, 1.6, 1.4];
const TOPS = [25, 50, 62, 90];
const N = 120;
const DY = 2.4;
const Y0 = 50;
const W0 = 200 - 20 * DY;

export function ConvolutionFigure() {
  const spikes = TOPS.map((at, i) => ({ at, r: rc(Z[i], Z[i + 1]) }));
  const trace = synth(N, spikes, 0.06);
  const max = Math.max(...trace.map(Math.abs));
  const zx = (z: number) => 40 + (z - 0.9) * 140;
  const bounds = [0, ...TOPS, N];
  const zPath = "M" + Z.map((z, i) => `${zx(z)},${Y0 + bounds[i] * DY} L${zx(z)},${Y0 + bounds[i + 1] * DY}`).join(" L");
  const wav = Array.from({ length: 41 }, (_, k) => ricker(k - 20, 0.06));
  return (
    <svg viewBox="0 0 640 380" className={f.graph} role="img" aria-label="Convolution: an acoustic impedance log gives a series of reflection coefficients at each boundary; convolving them with a wavelet gives the seismic trace">
      <text x="80" y="30" className={f.gNote} textAnchor="middle">Impedance</text>
      <path d={zPath} className={g.zLog} />
      <text x="220" y="30" className={f.gNote} textAnchor="middle">Reflectivity</text>
      <path d={`M220,${Y0} V${Y0 + N * DY}`} className={g.zero} />
      {spikes.map((s) => <path key={s.at} d={`M220,${Y0 + s.at * DY} H${220 + s.r * 360}`} className={s.r > 0 ? g.spikePos : g.spikeNeg} />)}
      <text x="306" y="202" className={g.op} textAnchor="middle">✱</text>
      <text x="370" y="30" className={f.gNote} textAnchor="middle">Wavelet</text>
      <path d={`M370,${W0} V${W0 + 40 * DY}`} className={g.zero} />
      <path d={wiggleFill(wav, 370, W0, DY, 30)} className={g.fill} />
      <path d={wiggle(wav, 370, W0, DY, 30)} className={g.trace} />
      <text x="452" y="202" className={g.op} textAnchor="middle">=</text>
      <text x="540" y="30" className={f.gNote} textAnchor="middle">Seismic trace</text>
      <path d={`M540,${Y0} V${Y0 + N * DY}`} className={g.zero} />
      <path d={wiggleFill(trace.map((v) => v / max), 540, Y0, DY, 34)} className={g.fill} />
      <path d={wiggle(trace.map((v) => v / max), 540, Y0, DY, 34)} className={g.trace} />
      {TOPS.map((at) => <path key={at} d={`M40,${Y0 + at * DY} H290 M500,${Y0 + at * DY} H590`} className={g.guide} />)}
      <text x="628" y={Y0 + N * DY} className={f.gAxisLabel} textAnchor="end" transform={`rotate(-90 628 ${Y0 + N * DY})`}>Time ↓</text>
    </svg>
  );
}

/* ── 06 Wedge model and tuning ── */
const W_TRACES = 30;
const W_N = 92;
const W_DY = 2.6;
const W_TOP = 30;

export function WedgeFigure() {
  const traces = Array.from({ length: W_TRACES }, (_, i) => {
    const th = i * 0.9;
    return synth(W_N, [{ at: W_TOP, r: 0.5 }, { at: W_TOP + th, r: -0.5 }], 0.06);
  });
  const amps = traces.map((tr) => Math.max(...tr.map(Math.abs)));
  const peak = amps.indexOf(Math.max(...amps));
  const x = (i: number) => 74 + i * 18;
  const ampY = (a: number) => 410 - a * 80;
  return (
    <svg viewBox="0 0 640 440" className={f.graph} role="img" aria-label="Wedge model: a layer thins to the left; where it is thinner than about a quarter wavelength, the top and base reflections merge and the amplitude first grows to a maximum at the tuning thickness and then fades">
      <path d={`M${x(0)},${30 + W_TOP * W_DY} H${x(W_TRACES - 1)}`} className={g.wedgeTop} />
      <path d={`M${x(0)},${30 + W_TOP * W_DY} L${x(W_TRACES - 1)},${30 + (W_TOP + (W_TRACES - 1) * 0.9) * W_DY}`} className={g.wedgeBase} />
      {traces.map((tr, i) => (
        <g key={i}>
          <path d={wiggleFill(tr, x(i), 30, W_DY, 16)} className={g.fill} />
          <path d={wiggle(tr, x(i), 30, W_DY, 16)} className={g.traceThin} />
        </g>
      ))}
      <text x={x(W_TRACES - 1)} y="20" className={f.gTiny} textAnchor="end">Thicker →</text>
      <text x={x(0)} y="20" className={f.gTiny}>← Thinner</text>
      <path d={`M${x(peak)},40 V400`} className={g.tune} />
      <text x={x(peak) + 8} y="294" className={f.gTinyBlue}>Tuning thickness</text>

      <path d="M60,320 V410 H610" className={f.gAxis} />
      <path d={"M" + amps.map((a, i) => `${x(i)},${ampY(a / amps[peak])}`).join(" L")} className={g.amp} />
      <circle cx={x(peak)} cy={ampY(1)} r="5" className={g.ampDot} />
      <text x="610" y="430" className={f.gAxisLabel} textAnchor="end">Layer thickness →</text>
      <text x="56" y="330" className={f.gTiny} textAnchor="end">Amp.</text>
    </svg>
  );
}

/* ── 07 Depth vs time ── */
const DLAYERS: { label: string; cls: string }[] = [
  { label: "Slow layer", cls: "layer1" },
  { label: "Fast layer", cls: "layer3" },
  { label: "Slow layer", cls: "layer2" },
];

const DEPTH_H = [80, 80, 80];
const TIME_H = [96, 48, 96];
const top = (h: number[], i: number) => 40 + h.slice(0, i).reduce((a, b) => a + b, 0);
const ROWS = DLAYERS.map((l, i) => ({ ...l, d0: top(DEPTH_H, i), d1: top(DEPTH_H, i + 1), t0: top(TIME_H, i), t1: top(TIME_H, i + 1) }));

export function DepthTime() {
  const rows = ROWS;
  return (
    <svg viewBox="0 0 560 320" className={f.graph} role="img" aria-label="The same layers drawn in depth and in two-way time: a fast layer of equal thickness looks thinner in time, so converting time to depth needs a velocity model">
      <text x="110" y="26" className={f.gNote} textAnchor="middle">Depth</text>
      <text x="420" y="26" className={f.gNote} textAnchor="middle">Two-way time</text>
      {rows.map((r, i) => (
        <g key={i}>
          <rect x="40" y={r.d0} width="140" height={r.d1 - r.d0} className={g[r.cls]} />
          <rect x="350" y={r.t0} width="140" height={r.t1 - r.t0} className={g[r.cls]} />
          <text x="110" y={(r.d0 + r.d1) / 2 + 4} className={f.gTiny} textAnchor="middle">{r.label}</text>
          <text x="420" y={(r.t0 + r.t1) / 2 + 4} className={f.gTiny} textAnchor="middle">{r.label}</text>
          <path d={`M180,${r.d1} L350,${r.t1}`} className={g.guide} />
        </g>
      ))}
      <path d="M180,40 L350,40" className={g.guide} />
      <text x="265" y="160" className={f.gTinyBlue} textAnchor="middle">velocity model</text>
      <text x="265" y="176" className={f.gTinyBlue} textAnchor="middle">⇄</text>
      <text x="110" y="300" className={f.gTiny} textAnchor="middle">Equal thickness in depth</text>
      <text x="420" y="300" className={f.gTiny} textAnchor="middle">Fast layer looks thinner in time</text>
    </svg>
  );
}
