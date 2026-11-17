"use client";
import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { Maximize2, X } from "lucide-react";
import { RevealScope } from "../RevealScope";
import h from "./HandsOn.module.css";

/**
 * Reservoir Simulation — hands-on Petrel work on the Guillemont field (Dana UK), placed right after the hero.
 * One real capture (3D pressure model + production charts), shown whole; click opens it full size in a dialog.
 * Only what was actually done is described — no figures or results are added to the capture.
 */

const SRC = "/images/technology/engineering/re-sim-petrel-guillemont.webp";
const ALT = "Petrel 시뮬레이션 화면: 왼쪽은 Guillemont 필드 저류층 모델의 3D 압력 분포, 오른쪽은 유정의 압력·액체·오일·물 생산 그래프";

const WORK: [string, string][] = [
  ["Petrel Model Implementation", "Guillemont 필드의 저류층 모델 구현 및 실습"],
  ["Sensitivity Study", "History Matching이 완료된 모델에서 유체 물성과 입력 조건을 바꿔 시뮬레이션 결과 비교"],
  ["Production Forecast", "저류층 모델을 활용한 생산 예측 수행"],
];

export function HandsOn() {
  const dlg = useRef<HTMLDialogElement>(null);
  return (
    <RevealScope className={h.motion}>
      <section id="hands-on" className={h.section} data-section="hands-on" aria-labelledby="hands-on-title">
        <div className={h.inner}>
          <header className={h.head} data-reveal="up">
            <p className={h.label}>Hands-on Experience <i>·</i> Petrel</p>
            <h2 id="hands-on-title" className={h.title}>From Theory to Practice.</h2>
            <p className={h.sub}>Dana UK · Guillemont Field</p>
          </header>

          <figure className={h.figure} data-reveal="up" style={{ "--i": 1 } as CSSProperties}>
            <button type="button" className={h.shot} onClick={() => dlg.current?.showModal()} aria-label="Petrel 시뮬레이션 화면 크게 보기">
              <Image src={SRC} alt={ALT} width={1910} height={980} sizes="(max-width: 1440px) 100vw, 1360px" className={h.img} />
              <span className={h.zoom} aria-hidden><Maximize2 size={16} /> 크게 보기</span>
            </button>
          </figure>

          <ol className={h.work}>
            {WORK.map(([t, d], i) => (
              <li key={t} data-reveal="up" style={{ "--i": i + 2 } as CSSProperties}>
                <span className={h.num}>{String(i + 1).padStart(2, "0")}</span>
                <b>{t}</b>
                <span className={h.desc}>{d}</span>
              </li>
            ))}
          </ol>
        </div>

        <dialog ref={dlg} className={h.dialog} aria-label="Petrel 시뮬레이션 화면" onClick={(e) => e.target === e.currentTarget && dlg.current?.close()}>
          <Image src={SRC} alt={ALT} width={1910} height={980} sizes="96vw" className={h.full} />
          <button type="button" className={h.close} onClick={() => dlg.current?.close()} aria-label="닫기"><X size={20} /></button>
        </dialog>
      </section>
    </RevealScope>
  );
}
