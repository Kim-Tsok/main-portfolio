"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Header() {
  return (
    <div className="w-screen flex justify-center">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="border-b-2 border-b-[#ab8164] px-2 py-2 flex justify-between items-center w-[95%]"
      >
        {/* Logo */}
        <div
          className="font-bold text-3xl italic text-black"
          id="Variable-font"
          style={{ fontFamily: "var(--font-newsreader)" }}
        >
          Kim.
        </div>

        <div>
          {/* Navigation Links */}
          <ul className="md:flex space-x-4 hidden">
            <li>
              <a href="#about" className="hover:text-[#634836] text-black">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-[#634836] text-black">
                Services
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-[#634836] text-black">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <Link href="mailto:tsokkim556@gmail.com">
            <motion.button
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.97 }}
              className="border border-[#ab8164] px-4 py-2 rounded-3xl text-black cursor-pointer"
            >
              Get In Touch
            </motion.button>
          </Link>
        </div>
      </motion.nav>
    </div>
  );
}
