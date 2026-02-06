"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, [role=\"button\"], input, textarea, select, summary, [data-cursor=\"pointer\"]";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    if (!media.matches) {
      return;
    }

    const body = document.body;
    body.classList.add("custom-cursor-enabled");

    let x = 0;
    let y = 0;
    let rafId = 0;

    const updatePosition = () => {
      rafId = 0;
      if (dotRef.current) {
        dotRef.current.style.left = `${x}px`;
        dotRef.current.style.top = `${y}px`;
      }
      if (haloRef.current) {
        haloRef.current.style.left = `${x}px`;
        haloRef.current.style.top = `${y}px`;
      }
    };

    const onMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      body.classList.add("custom-cursor-visible");
      if (!rafId) {
        rafId = window.requestAnimationFrame(updatePosition);
      }
    };

    const onLeave = () => {
      body.classList.remove("custom-cursor-visible");
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && target.closest(INTERACTIVE_SELECTOR)) {
        body.classList.add("custom-cursor-hover");
      }
    };

    const onOut = (event: MouseEvent) => {
      const related = event.relatedTarget as HTMLElement | null;
      if (related && related.closest(INTERACTIVE_SELECTOR)) {
        return;
      }
      body.classList.remove("custom-cursor-hover");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseenter", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });

    return () => {
      body.classList.remove(
        "custom-cursor-enabled",
        "custom-cursor-visible",
        "custom-cursor-hover"
      );
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseenter", onMove);
      window.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div className="custom-cursor" aria-hidden="true">
      <div ref={haloRef} className="custom-cursor-halo" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </div>
  );
}
