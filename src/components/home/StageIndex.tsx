import { STAGES, sceneId } from "@/lib/stages";
import s from "./StageIndex.module.css";

/** Row of all five stages directly under the hero; each jumps to its scene. */
export function StageIndex() {
  return (
    <nav className={s.index} aria-label="Journey stages">
      <div className={s.grid}>
        {STAGES.map((st) => (
          <a key={st.id} href={`#${sceneId(st.id)}`} className={s.item}>
            <span className={s.num}>{st.num}</span>
            <span className={s.label}>{st.label}</span>
            <span className={s.sub}>{st.sub}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
