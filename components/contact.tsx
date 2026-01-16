"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="bg-[#eadfd8]/80 px-6 py-24 pb-10" id="contact">
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <h2
            className={`text-3xl md:text-4xl font-bold text-black mb-6 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
          >
            Let's Work Together
          </h2>
          <p
            className={`text-[#634836] text-lg mb-8 leading-relaxed transition-all duration-700 delay-150 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            Have a project in mind? I'd love to hear about it and discuss how we
            can collaborate to bring your ideas to life.
          </p>
        </motion.div>

        <Link href="mailto:tsokkim556@gmail.com">
          <motion.button
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.97 }}
            className="md:ml-5 max-md:mb-3 px-10 py-4 bg-[#634836] text-white rounded-full font-semibold text-lg cursor-pointer"
          >
            Get In Touch
          </motion.button>
        </Link>

        <motion.button
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.97 }}
          className="md:ml-5 px-10 py-4 border-[#634836] border-3 text-[#634836] rounded-full font-semibold text-lg cursor-pointer"
        >
          Download CV
        </motion.button>

        <div className="mt-20 flex justify-center gap-8">
          <a
            href="https://www.linkedin.com"
            className="text-[#634836] hover:text-black font-medium transition-all duration-300 hover:-translate-y-1"
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
          >
            LinkedIn
          </a>
          <a
            href="https://x.com/im_telepathic"
            className="text-[#634836] hover:text-black font-medium transition-all duration-300 hover:-translate-y-1"
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
          >
            Twitter
          </a>
          <a
            href="https://github.com/Kim-Tsok"
            className="text-[#634836] hover:text-black font-medium transition-all duration-300 hover:-translate-y-1"
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
          >
            GitHub
          </a>
        </div>
        <div className="mt-4 flex justify-center gap-8">
          <a
            href="https://wa.me/2349139998904"
            className="text-[#634836] hover:text-black font-medium transition-all duration-300 hover:-translate-y-1"
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
          >
            Whatsapp
          </a>
          <a
            href="https://www.youtube.com/@pixelbluegames"
            className="text-[#634836] hover:text-black font-medium transition-all duration-300 hover:-translate-y-1"
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
          >
            Youtube
          </a>
          <a
            href="https://www.instagram.com/im_telepathic"
            className="text-[#634836] hover:text-black font-medium transition-all duration-300 hover:-translate-y-1"
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
          >
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
