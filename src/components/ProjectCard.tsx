"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, ShieldAlert, Sparkles, Check, Server } from "lucide-react";

// Inline Github Icon SVG (since brand icons are removed from newer lucide-react versions)
const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);


interface Project {
  title: string;
  desc: string;
  tags: string[];
  features: string[];
  architecture: string;
  github: string;
  live: string;
  renderVisual: () => React.ReactNode;
}

export default function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position values for 3D rotation matrix
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring animations for smooth tilt transitions
  const springConfig = { damping: 22, stiffness: 180, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;

    // Normalised coordinates (-0.5 to 0.5)
    const mouseX = (clientX - left) / width - 0.5;
    const mouseY = (clientY - top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="glass-panel p-6 rounded-3xl border-white/5 relative flex flex-col justify-between w-full h-[620px] overflow-hidden group cursor-pointer transition-colors duration-300 hover:border-accent-cyan/30 shadow-[0_15px_35px_rgba(0,0,0,0.5)] z-10"
    >
      {/* Tilt light reflection shine overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none transition-transform duration-300"
        style={{
          transform: `translate(${x.get() * 20}px, ${y.get() * 20}px)`,
        }}
      />

      {/* Visual Mockup Dashboard Slot */}
      <div 
        className="relative w-full h-48 rounded-2xl bg-zinc-950/80 border border-white/5 overflow-hidden flex items-center justify-center mb-6"
        style={{ transform: "translateZ(30px)" }}
      >
        {project.renderVisual()}
        {/* Border glow wrapper */}
        <div className="absolute inset-0 border border-white/5 rounded-2xl group-hover:border-accent-cyan/20 transition-all duration-300 pointer-events-none" />
      </div>

      {/* Text Info Container */}
      <div className="flex-1 flex flex-col justify-between" style={{ transform: "translateZ(20px)" }}>
        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3.5">
            {project.tags.map((tag, idx) => (
              <span 
                key={idx} 
                className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase px-2 py-0.5 rounded bg-zinc-950 border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h4 className="text-xl font-bold font-sans text-white group-hover:text-glow-blue transition-all duration-300 mb-2">
            {project.title}
          </h4>

          {/* Bio Description */}
          <p className="text-zinc-400 font-light text-xs leading-relaxed mb-4">
            {project.desc}
          </p>

          {/* Features Checklist */}
          <div className="flex flex-col gap-1.5 mb-4">
            {project.features.slice(0, 3).map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-zinc-400 font-mono text-[10px]">
                <Check className="w-3 h-3 text-accent-cyan" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Details & Links */}
        <div>
          {/* Architecture info */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[9px] font-mono text-zinc-500 mb-5 w-fit">
            <Server className="w-3 h-3 text-accent-purple" />
            <span>Architecture: {project.architecture}</span>
          </div>

          {/* Action Links */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-200 text-xs font-mono interactive"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Repository</span>
            </a>
            
            <a 
              href={project.live} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 text-accent-cyan hover:text-accent-purple transition-all duration-300 text-xs font-mono font-semibold interactive group"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
