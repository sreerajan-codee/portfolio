"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  "Initializing portfolio experience...",
  "Loading 3D workstation scene...",
  "Compiling MERN Stack components...",
  "Generating neural network grids...",
  "Structuring glassmorphism UI elements...",
  "Connecting secure mail pathways...",
  "Systems Online. Sree Rajan S.",
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Percentage ticker
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsDone(true);
          return 100;
        }
        // Random increments to look dynamic
        const diff = Math.floor(Math.random() * 10) + 2;
        return Math.min(prev + diff, 100);
      });
    }, 60);

    // Quote rotation
    const quoteTimer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(quoteTimer);
    };
  }, []);

  useEffect(() => {
    if (isDone) {
      const finishTimer = setTimeout(() => {
        onComplete();
      }, 700); // Match fadeout animation length
      return () => clearTimeout(finishTimer);
    }
  }, [isDone, onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="fixed inset-0 bg-[#030303] z-[99999] flex flex-col items-center justify-center font-mono px-6 select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Futuristic Glowing Spin Core */}
          <div className="relative mb-12 flex items-center justify-center">
            {/* Spinning Outer Ring */}
            <motion.div
              className="w-24 h-24 rounded-full border border-t-accent-cyan border-r-accent-purple/20 border-b-accent-blue border-l-accent-cyan/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            {/* Pulsing Inner Core */}
            <motion.div 
              className="absolute w-14 h-14 rounded-full bg-gradient-to-tr from-accent-blue/10 to-accent-purple/20 border border-white/5 flex items-center justify-center"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-sm font-bold font-sans tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-blue text-glow-blue">
                SRS
              </span>
            </motion.div>
          </div>

          {/* Progress Bar & Log Messages */}
          <div className="w-full max-w-sm flex flex-col gap-3">
            <div className="flex justify-between items-end text-sm">
              <div className="text-zinc-500 text-xs tracking-wider uppercase font-mono">
                System Boot
              </div>
              <div className="text-accent-cyan font-semibold text-lg tabular-nums">
                {progress}%
              </div>
            </div>
            
            {/* Progress Bar Background */}
            <div className="h-1 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-900 relative">
              <motion.div
                className="h-full bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-purple rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Changing Quotes */}
            <div className="h-6 flex items-center justify-center mt-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={quoteIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="text-zinc-400 text-xs text-center font-medium tracking-wide max-w-[280px]"
                >
                  {quotes[quoteIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
