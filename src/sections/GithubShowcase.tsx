"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, GitFork, BookOpen, Terminal, Sparkles } from "lucide-react";


// Inline Github Icon SVG (since brand icons are removed from newer lucide-react versions)
const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function GithubShowcase() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Procedural contribution graph layout (18 columns x 7 rows)
  // Commits weight: 0 (zinc-950), 1 (green-900), 2 (green-700), 3 (green-500), 4 (accent-cyan)
  const columns = 24;
  const rows = 7;
  const contributionGrid = Array.from({ length: columns * rows }, () => {
    const weights = [0, 0, 0, 1, 1, 2, 2, 2, 3, 3, 4];
    return weights[Math.floor(Math.random() * weights.length)];
  });

  const topLanguages = [
    { name: "JavaScript", percent: 55, color: "bg-yellow-500" },
    { name: "Node.js & Express", percent: 30, color: "bg-green-500" },
    { name: "HTML & CSS", percent: 15, color: "bg-orange-500" },
  ];

  const highlights = [
    {
      name: "mern-ecommerce-engine",
      desc: "Robust full-stack shopping core API including administration controller analytics, Stripe, and Mongoose database model integrations.",
      stars: 48,
      forks: 12,
      lang: "TypeScript",
      langColor: "bg-blue-500",
    },
    {
      name: "socket-messaging-server",
      desc: "Real-time communication broker running over Socket.io express processes to pipe synchronized messages, likes, and profile updates.",
      stars: 36,
      forks: 8,
      lang: "JavaScript",
      langColor: "bg-yellow-500",
    },
  ];

  return (
    <section
      id="github"
      ref={ref}
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-6 md:px-12 lg:px-24 border-t border-white/5 z-10"
    >
      {/* Glow decorations */}
      <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] rounded-full bg-accent-blue/5 blur-[95px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-16 text-left">
          <div className="text-accent-cyan font-mono text-xs tracking-widest uppercase mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
            GitHub Activity
          </div>
          <h3 className="text-4xl sm:text-5xl font-black font-sans tracking-tight mb-4">
            Code Showcase & <span className="text-gradient-cyan-blue">Metrics</span>
          </h3>
          <p className="text-zinc-400 font-light text-sm max-w-lg">
            Direct telemetry logs from developer commit lines, language weight parameters, and repository statistics.
          </p>
        </div>

        {/* main profile shell */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          
          {/* Left panel: stats & graph */}
          <div className="lg:col-span-8 flex flex-col gap-6 w-full">
            {/* Graph Card */}
            <motion.div
              className="glass-panel p-6 rounded-3xl border-white/5 w-full overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-between items-center mb-6">
                <span className="flex items-center gap-2 text-xs font-mono text-white">
                  <GithubIcon className="w-4 h-4 text-accent-cyan" />
                  <span>Contribution Matrix (584 commits this year)</span>
                </span>
                <span className="text-[10px] font-mono text-zinc-500">sreerajansr / profile</span>
              </div>

              {/* Grid block */}
              <div className="flex flex-col gap-1 w-full overflow-x-auto pb-2">
                <div 
                  className="grid gap-1"
                  style={{ 
                    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                    width: "100%",
                    minWidth: "480px"
                  }}
                >
                  {contributionGrid.map((weight, idx) => {
                    const colorClass = {
                      0: "bg-zinc-950/80 border border-white/5",
                      1: "bg-emerald-950/60 border border-emerald-900/10",
                      2: "bg-emerald-800/60",
                      3: "bg-emerald-500/80",
                      4: "bg-accent-cyan shadow-[0_0_10px_rgba(0,245,255,0.4)]",
                    }[weight];

                    return (
                      <motion.div
                        key={idx}
                        className={`aspect-square w-full rounded-[2.5px] transition-colors duration-300 ${colorClass}`}
                        whileHover={{ scale: 1.25, zIndex: 10 }}
                      />
                    );
                  })}
                </div>
              </div>
              
              {/* Graph Legend */}
              <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500 mt-4">
                <span>Jan 2026</span>
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  <div className="w-2.5 h-2.5 rounded-[1.5px] bg-zinc-950 border border-white/5" />
                  <div className="w-2.5 h-2.5 rounded-[1.5px] bg-emerald-950/60" />
                  <div className="w-2.5 h-2.5 rounded-[1.5px] bg-emerald-800/60" />
                  <div className="w-2.5 h-2.5 rounded-[1.5px] bg-emerald-500/80" />
                  <div className="w-2.5 h-2.5 rounded-[1.5px] bg-accent-cyan" />
                  <span>More</span>
                </div>
                <span>Dec 2026</span>
              </div>
            </motion.div>

            {/* Repos highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {highlights.map((repo, idx) => (
                <motion.div
                  key={idx}
                  className="glass-panel p-6 rounded-3xl border-white/5 flex flex-col justify-between hover:border-accent-cyan/20 group transition-all duration-300 h-[220px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 + idx * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div>
                    <div className="flex items-center gap-2 text-white font-bold font-mono text-sm mb-3">
                      <BookOpen className="w-4 h-4 text-accent-purple" />
                      <span className="group-hover:text-glow-blue transition-colors duration-200">{repo.name}</span>
                    </div>
                    <p className="text-zinc-400 text-xs font-light leading-relaxed">
                      {repo.desc}
                    </p>
                  </div>

                  {/* Repo Stats */}
                  <div className="flex justify-between items-center pt-4 border-t border-white/5 text-[10px] font-mono text-zinc-500">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${repo.langColor}`} />
                      <span>{repo.lang}</span>
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                        <Star className="w-3.5 h-3.5" />
                        <span>{repo.stars}</span>
                      </span>
                      <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                        <GitFork className="w-3.5 h-3.5" />
                        <span>{repo.forks}</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right panel: Lang stats */}
          <div className="lg:col-span-4 w-full">
            <motion.div
              className="glass-panel p-6 rounded-3xl border-white/5 w-full flex flex-col h-[400px] justify-between"
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div>
                <span className="flex items-center gap-2 text-xs font-mono text-white mb-6">
                  <Terminal className="w-4 h-4 text-accent-purple" />
                  <span>Language Distribution</span>
                </span>
                
                {/* Languages bars */}
                <div className="flex flex-col gap-5">
                  {topLanguages.map((lang, idx) => (
                    <div key={idx} className="flex flex-col gap-2 font-mono">
                      <div className="flex justify-between text-[10px] text-zinc-400">
                        <span>{lang.name}</span>
                        <span className="text-white font-bold">{lang.percent}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-900">
                        <motion.div
                          className={`h-full ${lang.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${lang.percent}%` } : {}}
                          transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* HUD Badge */}
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/5 text-[9px] font-mono text-zinc-400 mt-6">
                <Sparkles className="w-4 h-4 text-accent-cyan animate-pulse" />
                <span>Compiler: Node.js runtime active, Vercel edge optimized</span>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
