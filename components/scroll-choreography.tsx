"use client";

import { useEffect } from "react";

// Enhance the server-rendered page after hydration. Text never starts hidden.
export default function ScrollChoreography() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;
    const elements = document.querySelectorAll<HTMLElement>(".section-top,.about-heading,.about-content,.post-row,.hobby-list>div,.closing-topline,.closing-connect,.closing-bottom");
    const observer = new IntersectionObserver(entries => {
      for(const entry of entries) {
        if(!entry.isIntersecting) continue;
        const element=entry.target as HTMLElement;
        element.classList.add("has-entered");
        observer.unobserve(element);
      }
    },{threshold:.15});
    elements.forEach((element,index)=>{
      element.style.setProperty("--entry-delay",`${element.matches(".post-row,.hobby-list>div")?(index%3)*65:0}ms`);
      // Only enhance things still below the fold; restored scroll positions remain readable.
      if(element.getBoundingClientRect().top>window.innerHeight*.92) {
        element.classList.add("scroll-detail");
        observer.observe(element);
      }
    });
    const reset=()=>{if(reduced.matches) elements.forEach(e=>e.classList.remove("scroll-detail"));};
    reduced.addEventListener("change",reset);
    return()=>{observer.disconnect();reduced.removeEventListener("change",reset);elements.forEach(e=>e.classList.remove("scroll-detail","has-entered"));};
  },[]);
  return null;
}
