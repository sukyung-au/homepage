"use client";
import { useEffect, useRef, type CSSProperties } from "react";
import { RASTER, VECTOR, rng, type VizKind } from "@/lib/techviz";

export interface TechVizProps {
  /** seismic = polarity section · strata = cross-section with trap · reservoir = masked property map · structure = depth-contour map · log = well-log tracks · decline = production curves */
  kind?: VizKind;
  /** Deterministic seed — same seed, same picture */
  seed?: number;
  /** Seismic/strata: draw a normal fault */
  fault?: boolean;
  /** Reservoir: clip to an irregular field outline */
  mask?: boolean;
  /** Raster resolution factor 0.25–1 (pixel kinds) */
  resolution?: number;
  label?: string;
  style?: CSSProperties;
}

/** Procedural technical visualization (canvas). Fills its container. */
export function TechViz({ kind = "seismic", seed = 7, fault = true, mask = true, resolution = 0.5, label, style }: TechVizProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = wrap.current, c = cv.current;
    if (!el || !c) return;
    let raf = 0;
    const draw = () => {
      const w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      const ctx = c.getContext("2d");
      if (!ctx) return;
      const r = rng(seed);
      const vector = VECTOR[kind];
      if (vector) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        vector(ctx, w, h, r);
        return;
      }
      const W = Math.max(80, Math.round(w * resolution)), H = Math.max(60, Math.round(h * resolution));
      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const octx = off.getContext("2d");
      if (!octx) return;
      RASTER[kind]?.(octx, W, H, r, { fault, mask });
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.drawImage(off, 0, 0, c.width, c.height);
    };
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [kind, seed, fault, mask, resolution]);

  return (
    <div ref={wrap} role="img" aria-label={label || `${kind} visualization`} style={{ position: "relative", width: "100%", height: "100%", minHeight: 80, ...style }}>
      <canvas ref={cv} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}
