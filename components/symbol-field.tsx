"use client";

import { useEffect, useRef } from "react";

export default function SymbolField() {
  const field = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = field.current;
    if (!element) return;
    const hero = element.parentElement?.querySelector(".playing-intro");
    if (!hero) return;
    const measure = () => {
      const shell = element.parentElement;
      if (shell) element.style.setProperty("--opening-height", `${hero.getBoundingClientRect().bottom - shell.getBoundingClientRect().top}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(hero);
    window.addEventListener("resize", measure);
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let x = -1000, y = -1000;
    const paint = () => {
      frame = 0;
      element.style.setProperty("--mouse-x", `${x}px`);
      element.style.setProperty("--mouse-y", `${y}px`);
    };
    const move = (event: PointerEvent) => {
      if (!pointer.matches || event.pointerType === "touch") return;
      const bounds = element.getBoundingClientRect();
      x = event.clientX - bounds.left;
      y = event.clientY - bounds.top;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const leave = () => { x=-1000; y=-1000; if(!frame) frame=requestAnimationFrame(paint); };
    window.addEventListener("pointermove", move, {passive:true});
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("blur", leave);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("blur", leave);
    };
  }, []);
  return <div className="symbol-field" ref={field} aria-hidden="true"><div className="symbol-light"/></div>;
}
