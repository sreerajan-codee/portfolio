"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Position of the mouse pointer
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring configuration for trailing outer circle
  const springConfig = { damping: 30, stiffness: 250, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable custom cursor on larger desktop screens
    if (typeof window === "undefined" || window.innerWidth < 1024) return;

    setIsVisible(true);
    document.body.classList.add("custom-cursor-active");

    const moveCursor = (e: MouseEvent) => {
      // Offset by half of cursor size to center it (w-8/h-8 = 32px, so offset by 16)
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const isInteractive = 
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("interactive");
        
      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      if (typeof document !== "undefined") {
        document.body.classList.remove("custom-cursor-active");
      }
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent-blue pointer-events-none z-[9999] mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovered ? 1.8 : 1,
          backgroundColor: isHovered ? "rgba(0, 245, 255, 0.1)" : "rgba(0, 0, 0, 0)",
          borderColor: isHovered ? "var(--accent-cyan)" : "var(--accent-blue)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
      {/* Inner Pinpoint Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-accent-cyan rounded-full pointer-events-none z-[10000] mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        // Add absolute translations so it aligns perfectly with the center of the outer ring
        // Mouse coordinate is set as clientX - 16. To center a 10px dot, we offset by additional 11px.
        // E.g. raw position + 11px.
        animate={{
          scale: isHovered ? 0.4 : 1,
          x: cursorX.get() + 11,
          y: cursorY.get() + 11,
        }}
        transition={{ type: "tween", duration: 0.05 }}
      />
    </>
  );
}
