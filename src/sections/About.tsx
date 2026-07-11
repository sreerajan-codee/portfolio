"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BookOpen, Award, CheckCircle, Code, Cpu, GraduationCap, Zap } from "lucide-react";

export default function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const stats = [
    { label: "Core Techs", value: "12+" },
    { label: "Projects Completed", value: "8+" },
    { label: "Hours Coding", value: "1500+" },
    { label: "System Uptime", value: "99.9%" },
  ];

  const milestones = [
    {
      year: "2024",
      title: "Core Foundations",
      desc: "Mastered algorithmic thinking, data structures, and advanced ES6 JavaScript fundamentals.",
      icon: GraduationCap,
    },
    {
      year: "2025",
      title: "Full-Stack Development",
      desc: "Built scalable web backends with Node.js and Express.js, and complex databases with MongoDB.",
      icon: Cpu,
    },
    {
      year: "2026",
      title: "Next-Gen 3D & Frameworks",
      desc: "Specializing in Next.js 15, React 19, Three.js, React Three Fiber, and high-performance applications.",
      icon: Zap,
    },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-6 md:px-12 lg:px-24 border-t border-white/5 z-10"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 right-10 w-[300px] h-[300px] rounded-full bg-accent-blue/5 blur-[90px] pointer-events-none" />

      {/* Grid structure */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Column: Story Bio */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="text-accent-cyan font-mono text-xs tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
              Developer Bio
            </div>
            <h3 className="text-4xl sm:text-5xl font-black font-sans tracking-tight mb-6">
              Engineering <span className="text-gradient-cyan-blue">Digital Ecosystems</span>
            </h3>
            
            <p className="text-zinc-400 font-light leading-relaxed mb-6">
              As a MERN Stack Developer, my mission is to design and develop highly optimized web platforms. I bridge the gap between robust system backends and immersive visual interfaces. Being a continuous learner, I stay on the cutting edge of JavaScript ecosystem shifts, incorporating Next.js App Router and real-time state synchronization.
            </p>
            
            <p className="text-zinc-400 font-light leading-relaxed">
              I focus heavily on clean structural layouts, modular code architecture, database optimization, and high performance scores. My goal is to build web products that stand out, load instantly, and solve complex real-world challenges.
            </p>
          </motion.div>

          {/* Quick stats panel */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                className="glass-panel p-5 rounded-2xl flex flex-col justify-center border-white/5 relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.03, borderColor: "rgba(0, 245, 255, 0.2)" }}
              >
                {/* Accent glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/0 via-accent-cyan/0 to-accent-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <span className="text-3xl font-bold font-mono text-white mb-1.5 tracking-tight group-hover:text-accent-cyan transition-colors duration-300">
                  {stat.value}
                </span>
                <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider leading-snug">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Timeline Milestones */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:pl-4">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-zinc-500 font-mono text-xs tracking-widest uppercase mb-6">
              Development Milestones
            </div>
            
            {/* Timeline wrapper */}
            <div className="relative border-l border-zinc-800/80 pl-8 flex flex-col gap-10">
              {milestones.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    className="relative group"
                    initial={{ opacity: 0, y: 15 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                  >
                    {/* Ring indicator */}
                    <div className="absolute -left-[41px] top-1 w-[26px] h-[26px] rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center group-hover:border-accent-cyan group-hover:bg-accent-blue/10 transition-colors duration-300">
                      <IconComponent className="w-3.5 h-3.5 text-zinc-500 group-hover:text-accent-cyan transition-colors duration-300" />
                    </div>
                    
                    {/* Timeline box content */}
                    <div className="glass-panel p-5 rounded-2xl border-white/5 relative overflow-hidden group-hover:border-white/10 transition-all duration-300">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-[10px] font-mono text-accent-cyan font-semibold uppercase tracking-wider mb-2.5">
                        {item.year}
                      </span>
                      <h4 className="text-lg font-bold font-sans text-white mb-2 group-hover:text-glow transition-all duration-300">
                        {item.title}
                      </h4>
                      <p className="text-zinc-400 font-light text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
