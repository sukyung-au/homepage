"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { playReelAudioV2, type ReelAudio } from "./reelAudioV2";
import { createRenderer } from "./reelV2Renderer";
import s from "./ShowReelV2.module.css";

/**
 * v2 intro reel: 15 s of 2D motion graphics on one canvas (reelV2Renderer.ts) with a synthesized 120 BPM
 * soundtrack (reelAudioV2.ts). The picture runs on the audio clock so hits stay locked to the beat.
 *
 * Hand-off to the homepage: the camera surfaces and comes to rest on the Hero photo's horizon; from 12.3 s
 * (`poster`) the photo fades in under the canvas, which crossfades into it by 13.5 s while the Hero title /
 * tagline / presenter fade in, and at 14.2 s the rest of the Hero comes in (`handoff`). The last frame of
 * the reel is the homepage itself.
 *
 * Space / Enter / click starts (the browser allows sound only after a gesture). Esc skips, R replays,
 * M toggles sound. Phase is mirrored on <html data-reel> for Hero.module.css.
 */

type Phase = "waiting" | "playing" | "poster" | "handoff" | "gone";
const POSTER_AT = 12.3;
const HANDOFF_AT = 14.2;
const END_AT = 15.2;

export function ShowReelV2() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<Phase>("waiting");
  const [muted, setMuted] = useState(false);
  const [run, setRun] = useState(0);
  const phaseRef = useRef<Phase>("waiting");
  const audio = useRef<ReelAudio | null>(null);
  const startedAt = useRef(0);

  const go = useCallback((p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  const start = useCallback(() => {
    window.scrollTo(0, 0);
    audio.current?.stop();
    audio.current = playReelAudioV2(muted);
    startedAt.current = performance.now();
    go("playing");
  }, [muted, go]);

  useEffect(() => {
    document.documentElement.dataset.reel = phase === "gone" ? "handoff" : phase;
  }, [phase]);
  useEffect(() => () => {
    delete document.documentElement.dataset.reel;
    audio.current?.stop();
  }, []);

  // Render loop (one per run). Phase changes are driven by the reel clock.
  const gone = phase === "gone";
  useEffect(() => {
    const el = canvas.current;
    if (gone || !el) return;
    const r = createRenderer(el);
    const onResize = () => r.resize();
    window.addEventListener("resize", onResize);
    let raf = 0;
    const frame = () => {
      const p = phaseRef.current, now = performance.now();
      if (p === "waiting") r.idle(now);
      else {
        const a = audio.current?.elapsed() ?? NaN;
        const t = Number.isFinite(a) ? Math.max(0, a) : (now - startedAt.current) / 1000;
        r.draw(t);
        if (p === "playing" && t >= POSTER_AT) go("poster");
        else if (p === "poster" && t >= HANDOFF_AT) go("handoff");
        else if (p === "handoff" && t >= END_AT) { go("gone"); return; }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [run, gone, go]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phase === "waiting" && (e.code === "Space" || e.code === "Enter")) {
        e.preventDefault();
        start();
      } else if (e.code === "Escape" && phase !== "gone" && phase !== "waiting") {
        audio.current?.stop();
        go("gone");
      } else if (e.code === "KeyR" && phase === "gone") {
        window.scrollTo(0, 0);
        setRun((n) => n + 1);
        go("waiting");
      } else if (e.code === "KeyM") {
        audio.current?.toggleMute();
        setMuted((m) => !m);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, start, go]);

  if (phase === "gone") return null;
  return (
    <div className={s.reel} data-phase={phase} onClick={phase === "waiting" ? start : undefined} role="presentation" aria-label="Intro reel">
      <canvas ref={canvas} className={s.canvas} />
      {phase === "waiting" && <p className={s.hint}>Press Space to begin · M sound {muted ? "off" : "on"}</p>}
    </div>
  );
}
