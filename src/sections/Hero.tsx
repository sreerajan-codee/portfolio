"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import { ArrowUpRight, Code2, Sparkles, Send, Briefcase } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 18 },
    },
  };

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-start overflow-hidden px-6 md:px-12 lg:px-24 py-20 z-10 select-none">
      {/* Background gradients for ambient depth */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-accent-blue/10 blur-[100px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-purple/10 blur-[120px] pointer-events-none animate-pulse-slow" />

      {/* Hero Content Grid (Left-Aligned overlay) */}
      <motion.div
        className="w-full max-w-3xl flex flex-col justify-center text-left"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Holographic Intro Badge */}
        <motion.div 
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border-white/5 w-fit mb-6"
          variants={itemVariants}
        >
          <Sparkles className="w-3.5 h-3.5 text-accent-cyan animate-pulse" />
          <span className="text-xs font-mono text-accent-cyan tracking-widest uppercase">
            Product Launch Concept v2.0
          </span>
        </motion.div>

        {/* Big Name Title */}
        <motion.h1
          className="text-6xl sm:text-7xl lg:text-8xl font-black font-sans tracking-tight leading-none mb-4"
          variants={itemVariants}
        >
          <span className="text-gradient">Sree Rajan S</span>
        </motion.h1>

        {/* Subtitle / Role Badge */}
        <motion.div
          className="flex items-center gap-3.5 mb-6"
          variants={itemVariants}
        >
          <div className="w-8 h-[1px] bg-accent-purple" />
          <h2 className="text-xl sm:text-2xl font-bold font-mono tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple text-glow-blue uppercase">
            MERN Stack Developer
          </h2>
        </motion.div>

        {/* Statement Description */}
        <motion.p
          className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed max-w-2xl mb-12 font-sans"
          variants={itemVariants}
        >
          I build scalable, modern, and user-focused web applications with clean code, beautiful interfaces, and exceptional user experiences. Focused on full-stack optimization and futuristic frontends.
        </motion.p>

        {/* CTA Button Actions Group */}
        <motion.div
          className="flex flex-wrap items-center gap-4 sm:gap-6"
          variants={itemVariants}
        >
          {/* View Projects Button */}
          <MagneticButton>
            <button
              onClick={() => handleScroll("projects")}
              className="group relative flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold font-sans text-sm text-[#030303] bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(0,102,255,0.4)] hover:shadow-[0_0_30px_rgba(0,102,255,0.6)] cursor-pointer"
            >
              <Briefcase className="w-4 h-4" />
              <span>View Projects</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
          </MagneticButton>

          {/* Contact Me Button */}
          <MagneticButton>
            <button
              onClick={() => handleScroll("contact")}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold font-sans text-sm text-[#f5f5f7] border border-white/10 hover:border-accent-cyan/60 glass-panel hover:bg-white/5 transition-colors duration-300 cursor-pointer"
            >
              <Send className="w-4 h-4 text-accent-cyan" />
              <span>Contact Me</span>
            </button>
          </MagneticButton>

          {/* Interactive Floating Tech Badges */}
          <div className="flex items-center gap-3.5 ml-0 sm:ml-4 mt-4 sm:mt-0 opacity-60">
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Stack:</span>
            <div className="flex -space-x-1.5">
              <span className="w-6 h-6 rounded-full border border-white/10 bg-zinc-950 flex items-center justify-center text-[8px] font-bold text-accent-cyan">M</span>
              <span className="w-6 h-6 rounded-full border border-white/10 bg-zinc-950 flex items-center justify-center text-[8px] font-bold text-accent-purple">E</span>
              <span className="w-6 h-6 rounded-full border border-white/10 bg-zinc-950 flex items-center justify-center text-[8px] font-bold text-accent-blue">R</span>
              <span className="w-6 h-6 rounded-full border border-white/10 bg-zinc-950 flex items-center justify-center text-[8px] font-bold text-[#22c55e]">N</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Mouse Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-40">
        <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">Scroll to explore</span>
        <div className="w-5 h-8 rounded-full border border-zinc-500 flex justify-center p-1.5">
          <motion.div
            className="w-1 h-1.5 bg-accent-cyan rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
}
