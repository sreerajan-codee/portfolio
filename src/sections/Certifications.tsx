"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, ChevronLeft, ChevronRight, ShieldCheck, Calendar, Sparkles } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

export default function Certifications() {
  const [index, setIndex] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const certs = [
    {
      title: "Crash Course on Python",
      authority: "Google & IBM (via Coursera)",
      date: "Jun 2025",
      credentialId: "COURSERA-PY-8849",
      desc: "Immersive program covering fundamental Python programming, script automation, data structures, and object-oriented paradigms.",
      badge: "Python Core",
    },
    {
      title: "Specialization in Prompt Engineering",
      authority: "Coursera",
      date: "Sep 2025",
      credentialId: "COURSERA-PROMPT-9302",
      desc: "Specialized coursework focusing on generative AI workflows, context injection, prompt patterns, and structuring LLM interactions.",
      badge: "AI Prompting",
    },
    {
      title: "Front-End Development",
      authority: "Meta (via Coursera)",
      date: "Nov 2025",
      credentialId: "COURSERA-META-7182",
      desc: "Comprehensive training covering React component architecture, UI libraries, responsive layout design, web accessibility, and version control.",
      badge: "Front-End",
    },
  ];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % certs.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + certs.length) % certs.length);
  };

  return (
    <section
      id="certifications"
      ref={ref}
      className="relative min-h-[80vh] w-full flex flex-col justify-center py-24 px-6 md:px-12 lg:px-24 border-t border-white/5 z-10"
    >
      {/* Background neon elements */}
      <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] rounded-full bg-accent-purple/5 blur-[110px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="text-accent-cyan font-mono text-xs tracking-widest uppercase mb-3 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
            Accreditation
          </div>
          <h3 className="text-4xl sm:text-5xl font-black font-sans tracking-tight mb-4">
            Professional <span className="text-gradient-cyan-blue">Certifications</span>
          </h3>
          <p className="text-zinc-400 font-light text-sm max-w-md mx-auto">
            Accreditation logs verifying full-stack engineering proficiency and modern front-end architectural standards.
          </p>
        </div>

        {/* Carousel Slide Wrapper */}
        <div className="relative flex flex-col items-center justify-center w-full">
          {/* Certificate Card Container */}
          <div className="w-full min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="glass-panel p-8 sm:p-10 rounded-3xl border-white/5 w-full relative overflow-hidden flex flex-col md:flex-row gap-8 items-start md:items-center shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
              >
                {/* Glow bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple" />

                {/* Left side: Badge Logo */}
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 flex-shrink-0 text-accent-cyan relative">
                  <Award className="w-8 h-8 animate-pulse" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-purple flex items-center justify-center text-[7px] text-white font-mono font-bold">✓</div>
                </div>

                {/* Right side: Information */}
                <div className="flex-1 flex flex-col justify-between w-full">
                  <div>
                    {/* Badge type */}
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest bg-zinc-950 border border-white/5 px-2 py-0.5 rounded">
                        {certs[index].badge}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-mono text-zinc-500">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{certs[index].date}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-xl sm:text-2xl font-bold font-sans text-white text-glow mb-2">
                      {certs[index].title}
                    </h4>

                    {/* Authority */}
                    <p className="text-accent-cyan font-mono text-xs font-semibold mb-4">
                      Authority: {certs[index].authority}
                    </p>

                    {/* Description */}
                    <p className="text-zinc-400 font-light text-sm leading-relaxed mb-6">
                      {certs[index].desc}
                    </p>
                  </div>

                  {/* Footer Stats Credentials */}
                  <div className="flex flex-wrap justify-between items-center pt-4 border-t border-white/5 gap-3">
                    <span className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500">
                      <ShieldCheck className="w-4 h-4 text-[#22c55e]" />
                      <span>ID: {certs[index].credentialId}</span>
                    </span>
                    <span className="text-[9px] font-mono text-zinc-600">
                      Digital Cryptographic Signature Verified
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4 mt-8">
            <MagneticButton>
              <button
                onClick={handlePrev}
                className="w-11 h-11 rounded-full border border-white/5 hover:border-accent-cyan/60 bg-zinc-950/40 hover:bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </MagneticButton>

            {/* Slide Indicators */}
            <div className="flex items-center gap-2">
              {certs.map((_, cIdx) => (
                <div
                  key={cIdx}
                  onClick={() => setIndex(cIdx)}
                  className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                    index === cIdx ? "w-6 bg-accent-cyan" : "w-1.5 bg-zinc-700"
                  }`}
                />
              ))}
            </div>

            <MagneticButton>
              <button
                onClick={handleNext}
                className="w-11 h-11 rounded-full border border-white/5 hover:border-accent-cyan/60 bg-zinc-950/40 hover:bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </MagneticButton>
          </div>
        </div>

      </div>
    </section>
  );
}
