"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Shield, Sparkles, Terminal, Code2, Database, Wrench } from "lucide-react";

interface SkillItem {
  name: string;
  level: number; // percentage
  desc: string;
}

interface SkillCategories {
  [key: string]: {
    icon: React.ComponentType<any>;
    skills: SkillItem[];
  };
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState<string>("frontend");
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categories: SkillCategories = {
    frontend: {
      icon: Code2,
      skills: [
        { name: "React.js", level: 92, desc: "Virtual DOM, state management, hooks, and component lifecycle." },
        { name: "Next.js", level: 88, desc: "Server components, App Router, SSR, SSG, and file-based routing." },
        { name: "JavaScript (ES6+)", level: 95, desc: "Asynchronous programming, DOM manipulation, scopes, and closures." },
        { name: "Tailwind CSS", level: 92, desc: "Utility-first layout design, responsive configurations, and v4 theme systems." },
        { name: "HTML5 & CSS3", level: 95, desc: "Semantic tags, SEO foundations, flexbox, grid, and canvas APIs." },
      ],
    },
    backend: {
      icon: Terminal,
      skills: [
        { name: "Node.js", level: 90, desc: "Event loop, streams, file systems, npm module ecosystem, and servers." },
        { name: "Express.js", level: 92, desc: "REST APIs, router patterns, custom middlewares, and CORS configurations." },
        { name: "JWT Auth & Security", level: 85, desc: "Secure token protocols, hashing, encryption, and route protection." },
      ],
    },
    database: {
      icon: Database,
      skills: [
        { name: "MongoDB", level: 88, desc: "NoSQL architecture, Mongoose schemas, aggregations, and indexing." },
        { name: "REST APIs / RESTful CRUD", level: 94, desc: "Robust controller patterns, status codes, and input validation schemas." },
      ],
    },
    tools: {
      icon: Wrench,
      skills: [
        { name: "Git & GitHub", level: 90, desc: "Version control, branching, merge conflict resolution, and hooks." },
        { name: "Postman", level: 92, desc: "API endpoint testing, authorization configurations, and environments." },
        { name: "VS Code", level: 95, desc: "Productive setup, debugging, source-control integration, and snippets." },
      ],
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 120, damping: 15 },
    },
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-6 md:px-12 lg:px-24 border-t border-white/5 z-10"
    >
      {/* Background radial accent glow */}
      <div className="absolute top-1/3 left-10 w-[350px] h-[350px] rounded-full bg-accent-purple/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="text-accent-purple font-mono text-xs tracking-widest uppercase mb-3 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-pulse" />
            Skill Matrix
          </div>
          <h3 className="text-4xl sm:text-5xl font-black font-sans tracking-tight mb-4 text-glow">
            Tech <span className="text-gradient-purple-blue">Stack Breakdown</span>
          </h3>
          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider max-w-md mx-auto">
            Interact below or check the orbiting skill planets in the 3D scene above
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 w-full max-w-2xl">
          {Object.keys(categories).map((tab) => {
            const Icon = categories[tab].icon;
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-3 rounded-full font-mono text-xs uppercase tracking-wider flex items-center gap-2.5 transition-all duration-300 border cursor-pointer select-none ${
                  isActive
                    ? "bg-accent-purple/10 border-accent-purple text-white shadow-[0_0_15px_rgba(189,0,255,0.25)]"
                    : "border-white/5 glass-panel text-zinc-400 hover:text-white hover:border-white/10"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-accent-cyan" : "text-zinc-500"}`} />
                <span>{tab}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 rounded-full border border-accent-cyan/35 pointer-events-none"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Panel Content */}
        <div className="w-full min-h-[380px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
            >
              {categories[activeTab].skills.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="glass-panel p-6 rounded-2xl border-white/5 flex flex-col justify-between hover:border-accent-purple/30 group relative overflow-hidden transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  {/* Subtle hover background accent */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/0 via-accent-purple/0 to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <div>
                    {/* Title */}
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-lg font-bold font-sans text-white group-hover:text-glow transition-all duration-200">
                        {skill.name}
                      </h4>
                      <span className="text-xs font-mono font-semibold text-accent-cyan group-hover:text-accent-purple transition-colors duration-300">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Skill progress bar */}
                    <div className="h-1 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-900 mb-4">
                      <motion.div
                        className="h-full bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.1 }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-zinc-400 font-light text-xs leading-relaxed mt-2.5">
                    {skill.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
