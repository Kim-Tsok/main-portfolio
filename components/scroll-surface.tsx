"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
  as?: "div" | "article" | "footer";
  treatment?: "deal" | "footer" | "image";
  index?: number;
};

export default function ScrollSurface({ children, className, id, labelledBy, as="div", treatment="deal", index=0 }:Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({target:ref,offset:["start end","start 0.42"]});
  const y = useTransform(scrollYProgress,[0,1],[treatment==="image"?18:treatment==="footer"?55:44, treatment==="image"?-8:0]);
  const rotate = useTransform(scrollYProgress,[0,1],[treatment==="deal"?(index%2===0?-2.4:2.4):0,0]);
  const scale = useTransform(scrollYProgress,[0,1],[treatment==="footer"?.94:treatment==="deal"?.97:1,1]);
  const Component = as==="article"?motion.article:as==="footer"?motion.footer:motion.div;
  return <Component ref={ref} id={id} aria-labelledby={labelledBy} className={className} style={reduced?undefined:{y,rotate,scale,transformOrigin:"50% 70%"}}>{children}</Component>;
}
