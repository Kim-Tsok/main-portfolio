"use client";

import { useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react";

const slideTransition = {
  x: {
    type: "tween" as const,
    duration: 0.18,
    ease: [0.32, 0.72, 0, 1] as const,
  },
  opacity: { duration: 0.12 },
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction >= 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  tech_stack: string[];
  link?: string;
  github_url?: string;
  custom_links?: { label: string; url: string }[];
}

interface ShowcaseProps {
  projects: Project[];
}

export default function Showcase({ projects = [] }: ShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : slideTransition;

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  const onDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const threshold = 48;
      if (info.offset.x < -threshold) nextSlide();
      else if (info.offset.x > threshold) prevSlide();
    },
    [nextSlide, prevSlide]
  );

  if (!projects || projects.length === 0) {
    return (
      <section className="bg-[#eadfd8]/80 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-4">
            Featured Projects
          </h2>
          <p className="text-center text-[#bfa18e]">
            No projects added yet. Check back soon!
          </p>
        </div>
      </section>
    );
  }

  const activeProject = projects[currentIndex];

  return (
    <section className="bg-[#eadfd8] px-6 py-12 md:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-4">
            Featured Projects
          </h2>
          <p className="text-center text-[#634836] max-w-2xl mx-auto">
            A selection of recent work showcasing design and development
            expertise
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            className="overflow-hidden [-webkit-tap-highlight-color:transparent]"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            dragDirectionLock
            onDragEnd={onDragEnd}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeProject.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
                className="w-full"
              >
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <div className="flex-1 w-full min-w-0">
                    <div className="rounded-2xl overflow-hidden bg-[#d4cfc5] aspect-video flex items-center justify-center relative group">
                      {activeProject.image_url ? (
                            <img
                              src={activeProject.image_url || "/placeholder.svg"}
                              alt={activeProject.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="text-[#bfa18e]">No image</div>
                          )}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        </div>
                      </div>

                  <div className="flex-1 w-full min-w-0">
                    <h3 className="text-3xl font-bold text-black mb-4 transition-colors">
                      {activeProject.title}
                    </h3>
                    <p className="text-[#634836] text-lg mb-6 leading-relaxed">
                      {activeProject.description}
                    </p>

                    {activeProject.tech_stack &&
                      activeProject.tech_stack.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-8">
                            {activeProject.tech_stack.map((tech: string) => (
                              <span
                                key={tech}
                                className="bg-[#ab8164] text-white px-4 py-2 rounded-full text-sm font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                    <div className="flex flex-wrap gap-3">
                      {activeProject.link && (
                            <a
                              href={activeProject.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-6 py-3 bg-[#634836] text-white rounded-full font-semibold hover:bg-[#4a3628] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                            >
                              View Project <ExternalLink size={16} />
                            </a>
                            )}

                      {activeProject.github_url && (
                            <a
                              href={activeProject.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                            >
                              <Github size={18} /> GitHub
                            </a>
                          )}

                      {activeProject.custom_links?.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-[#634836] text-white rounded-full font-semibold hover:bg-[#4a3628] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div className="flex items-center justify-between mt-12 animate-in fade-in duration-700 delay-300">
            <button
              onClick={prevSlide}
              className="bg-[#634836] hover:bg-[#4a3628] text-white rounded-full p-3 transition-all duration-300 hover:shadow-lg hover:scale-110 active:scale-95"
              aria-label="Previous project"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex justify-center gap-3">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-[#634836] w-8 h-2"
                      : "bg-[#ab8164] w-2 h-2 hover:bg-[#9b8b7e]"
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="bg-[#634836] hover:bg-[#4a3628] text-white rounded-full p-3 transition-all duration-300 hover:shadow-lg hover:scale-110 active:scale-95"
              aria-label="Next project"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
