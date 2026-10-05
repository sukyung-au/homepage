import Link from "next/link";
import { STAGES, sceneId } from "@/lib/stages";
import s from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={s.footer}>
      <div className={s.row}>
        <div className={s.brand}>
          <b>Oil &amp; Gas</b> <span>Development</span>
          <p className={s.note}>From Subsurface to Field Development. 본 사이트의 수치는 설명을 위한 예시입니다.</p>
        </div>
        <nav className={s.links} aria-label="Journey stages">
          {STAGES.map((st) => (
            <Link key={st.id} href={`/#${sceneId(st.id)}`}><span>{st.num}</span>{st.label}</Link>
          ))}
        </nav>
      </div>
      <div className={s.legal}>© 2026 Oil &amp; Gas Development</div>
    </footer>
  );
}
