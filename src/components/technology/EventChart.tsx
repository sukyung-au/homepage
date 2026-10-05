import s from "./Topic.module.css";

/** [label, bars as [start %, width %] on a 200 Ma → 0 timeline, colour] */
export type PetroleumEvent = [string, [number, number][], string];

/** Petroleum-system event chart with the critical-moment marker. */
export function EventChart({ events, ticks, critical }: { events: PetroleumEvent[]; ticks: string[]; critical: string }) {
  return (
    <div className={s.chart}>
      <div className={s.axis}>
        <span />
        <div className={s.ticks}>{ticks.map((t) => <span key={t}>{t}</span>)}</div>
      </div>
      <div className={s.rows}>
        {events.map(([label, bars, color]) => (
          <div key={label} className={s.row}>
            <span className={s.rowLabel}>{label}</span>
            <div className={s.lane}>
              {bars.map(([a, w], i) => <span key={i} className={s.bar} style={{ left: `${a}%`, width: `${w}%`, background: color }} />)}
            </div>
          </div>
        ))}
        <div className={s.critical}><span className={s.criticalLabel}>{critical}</span></div>
      </div>
    </div>
  );
}
