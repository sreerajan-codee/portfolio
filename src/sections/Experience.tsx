"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, Briefcase, GitBranch, GraduationCap, Award } from "lucide-react";

export default function Experience() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const timelineData = [
    {
      role: "Freelance Full-Stack Developer",
      company: "Independent Client Engagements",
      period: "2025 - Present",
      type: "contract",
      desc: "Delivering responsive MERN Stack applications and single-page apps. Implemented secure JWT login procedures, integrated Stripe payment flows, and engineered optimized MongoDB database schemas.",
      skills: ["React.js", "Express.js", "MongoDB", "Tailwind CSS"],
      icon: Briefcase,
    },
    {
      role: "Open Source Contributor",
      company: "GitHub Ecosystem Projects",
      period: "2025 - Present",
      type: "open-source",
      desc: "Refining UI component codebases, optimizing server response middleware utilities, and submitting code cleanup patches to modern frontend frameworks. Actively building public tools.",
      skills: ["Git", "GitHub Hooks", "TypeScript", "NodeJS"],
      icon: GitBranch,
    },
    {
      role: "MERN Stack Specialist Bootcamper",
      company: "Advanced Software Academy",
      period: "2024 - 2025",
      type: "training",
      desc: "6-month immersive coding bootcamp focusing on model-view-controller (MVC) structures, database scaling, API load tests, async routing, and state synchronization.",
      skills: ["MERN Stack", "RESTful APIs", "JWT Authentication", "Postman"],
      icon: GraduationCap,
    },
  ];

  return (
    <section
      id="experience"
      ref={ref}
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-6 md:px-12 lg:px-24 border-t border-white/5 z-10"
    >
      {/* Background ambient light overlay */}
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] rounded-full bg-accent-blue/5 blur-[95px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="text-accent-purple font-mono text-xs tracking-widest uppercase mb-3 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-pulse" />
            My Journey
          </div>
          <h3 className="text-4xl sm:text-5xl font-black font-sans tracking-tight mb-4">
            Experience & <span className="text-gradient-purple-blue">Timeline</span>
          </h3>
          <p className="text-zinc-400 font-light text-sm max-w-lg mx-auto">
            A review of my learning progression, independent work cycles, code contributions, and full-stack specialized training.
          </p>
        </div>

        {/* Vertical Timeline Track */}
        <div className="relative border-l border-zinc-800/60 ml-4 md:ml-32 pl-8 md:pl-12 flex flex-col gap-12">
          {timelineData.map((item, index) => {
            const Icon = item.icon;
            
            // Badge style colors
            const badgeColors = {
              contract: "bg-accent-cyan/15 border-accent-cyan/20 text-accent-cyan",
              "open-source": "bg-accent-purple/15 border-accent-purple/20 text-accent-purple",
              training: "bg-accent-blue/15 border-accent-blue/20 text-accent-blue",
            }[item.type];

            return (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                {/* Year tag aligned on the left for desktop */}
                <div className="absolute -left-[48px] md:-left-[152px] top-1.5 hidden md:flex items-center gap-2 text-zinc-500 font-mono text-xs w-[96px] justify-end">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.period}</span>
                </div>

                {/* Floating timeline dot */}
                <div className="absolute -left-[49px] md:-left-[61px] top-1 w-7 h-7 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center group-hover:border-accent-cyan group-hover:bg-accent-blue/10 transition-colors duration-300">
                  <Icon className="w-3.5 h-3.5 text-zinc-500 group-hover:text-accent-cyan transition-colors duration-300" />
                </div>

                {/* Timeline Card */}
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border-white/5 relative overflow-hidden group-hover:border-white/10 transition-all duration-300">
                  {/* Subtle timeline card hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent-cyan/0 to-accent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4">
                    <div>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[9px] font-mono font-semibold uppercase tracking-wider mb-2 ${badgeColors}`}>
                        {item.type}
                      </span>
                      <h4 className="text-xl font-bold font-sans text-white group-hover:text-glow-blue transition-all duration-200">
                        {item.role}
                      </h4>
                      <span className="text-zinc-500 font-mono text-xs mt-1 block">
                        {item.company}
                      </span>
                    </div>

                    {/* Period tag for mobile (since left aligned is hidden on smaller screens) */}
                    <span className="md:hidden inline-flex items-center gap-1.5 text-zinc-500 font-mono text-xs">
                      <Calendar className="w-3 h-3" />
                      <span>{item.period}</span>
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-zinc-400 font-light text-xs leading-relaxed mb-5">
                    {item.desc}
                  </p>

                  {/* Technologies tags for the experience */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {item.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[9px] font-mono text-zinc-500 px-2 py-0.5 rounded-md bg-zinc-950 border border-white/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
