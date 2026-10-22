"use client";
import { useEffect } from "react";
import { applyFit, clearFit, FIT_BOOT } from "./presentationFit";

/** Keeps /presentation fitted to the window (see presentationFit.ts); removes the zoom when leaving the page. */
export function PresentationFit() {
  useEffect(() => {
    applyFit();
    window.addEventListener("resize", applyFit);
    return () => {
      window.removeEventListener("resize", applyFit);
      clearFit();
    };
  }, []);
  return <script dangerouslySetInnerHTML={{ __html: FIT_BOOT }} />;
}
