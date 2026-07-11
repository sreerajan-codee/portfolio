"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ProjectCard from "@/components/ProjectCard";
import { ShoppingBag, TrendingUp, Users, MessageSquare, Brain, CheckSquare } from "lucide-react";

export default function Projects() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  const projectsData = [
    {
      title: "AI-Powered MERN E-Commerce Platform",
      desc: "Developed a full-stack AI-powered e-commerce platform using MongoDB, Express.js, React, and Node.js. Implemented JWT authentication, Razorpay payment integration, shopping cart, wishlist, order management, admin dashboard, and an AI chatbot for product recommendations and customer support.",
      tags: ["MERN Stack", "Razorpay", "Redux Toolkit", "AI Chatbot", "MongoDB Atlas"],
      features: [
        "JWT Authentication & Role-Based Access Control (User/Admin)",
        "Razorpay Payment Gateway Integration",
        "AI Chatbot for Product Recommendations & Support",
        "Shopping Cart & Wishlist Management",
        "Admin Dashboard with Revenue & Order Analytics",
      ],
      architecture: "MERN MVC + Redux Toolkit + AI Chatbot",
      github: "https://github.com/sreerajan-codee/mernproject.git",
      live: "https://github.com",
      renderVisual: () => (
        <div className="absolute inset-0 w-full h-full flex flex-col justify-between p-4 bg-gradient-to-br from-zinc-950 to-zinc-900 font-mono text-[9px] text-zinc-400 select-none">
          {/* Top Info Bar */}
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="flex items-center gap-1.5 text-accent-cyan">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>AI_SHOP_CORE v2.0</span>
            </span>
            <span className="text-zinc-600">Secure Protocol SSL</span>
          </div>
          
          {/* Custom Sales Trend Line Graph */}
          <div className="flex-1 flex items-end gap-1.5 px-2 py-4 relative">
            {/* Background grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between py-4 pointer-events-none opacity-20">
              <div className="border-b border-white/10 w-full" />
              <div className="border-b border-white/10 w-full" />
              <div className="border-b border-white/10 w-full" />
            </div>
            
            {/* Curving neon line graph representation */}
            <svg className="absolute inset-0 w-full h-full p-2 overflow-visible" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M 10 90 Q 50 20 90 70 T 170 30 T 250 10" 
                fill="none" 
                stroke="var(--accent-cyan)" 
                strokeWidth="1.8" 
                className="drop-shadow-[0_0_8px_rgba(0,245,255,0.5)]"
              />
              <circle cx="250" cy="10" r="3.5" fill="#ffffff" className="animate-ping" />
            </svg>
          </div>

          {/* Bottom HUD Stat box */}
          <div className="flex justify-between items-center bg-white/5 border border-white/5 rounded-lg p-2 mt-2">
            <span className="flex items-center gap-1 text-[8px] text-zinc-500">
              <TrendingUp className="w-3 h-3 text-[#22c55e]" />
              <span>Monthly Sales:</span>
            </span>
            <span className="text-white font-bold font-mono">$48,250.00</span>
          </div>
        </div>
      ),
    },
    {
      title: "SmartPM – AI-Powered Project Management System",
      desc: "Built a full-stack AI-powered project management system using the MERN stack. Implemented JWT authentication, role-based access, project, task, and team management (CRUD), AI chat assistant, analytics dashboard, and secure REST APIs.",
      tags: ["React.js", "Redux Toolkit", "Node.js", "Express.js", "MongoDB", "JWT", "AI Chat"],
      features: [
        "Project, Task & Team CRUD Management",
        "AI Chat Assistant Integration",
        "JWT Authentication & Role-Based Access Control",
        "Interactive Task Analytics Dashboard",
        "Secure Backend REST API Architecture",
      ],
      architecture: "MERN Stack + Redux Toolkit + AI Assistant",
      github: "https://github.com",
      live: "https://github.com",
      renderVisual: () => (
        <div className="absolute inset-0 w-full h-full flex flex-col justify-between p-4 bg-gradient-to-br from-zinc-950 to-zinc-900 font-mono text-[9px] text-zinc-400 select-none">
          {/* Top Info Bar */}
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="flex items-center gap-1.5 text-accent-blue">
              <Users className="w-3.5 h-3.5" />
              <span>SMART_PM_CORE</span>
            </span>
            <span className="text-zinc-600">Scheduler Syncing</span>
          </div>

          {/* Procedural Kanban Blocks */}
          <div className="flex-1 grid grid-cols-3 gap-1.5 py-3.5">
            {/* Column 1 */}
            <div className="bg-white/5 border border-white/5 rounded-lg p-1.5 flex flex-col gap-1.5">
              <span className="text-[7px] text-zinc-500 font-bold uppercase tracking-wider">Backlog</span>
              <div className="bg-zinc-900 p-1 rounded border border-white/5 text-[7px] text-white">Auth API</div>
            </div>
            
            {/* Column 2 */}
            <div className="bg-accent-blue/5 border border-accent-blue/10 rounded-lg p-1.5 flex flex-col gap-1.5">
              <span className="text-[7px] text-accent-blue font-bold uppercase tracking-wider">Active</span>
              <div className="bg-zinc-900 p-1 rounded border border-accent-blue/20 text-[7px] text-white flex flex-col gap-1">
                <span>AI Agent</span>
                <div className="w-full h-0.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-accent-blue" />
                </div>
              </div>
            </div>

            {/* Column 3 */}
            <div className="bg-white/5 border border-white/5 rounded-lg p-1.5 flex flex-col gap-1.5">
              <span className="text-[7px] text-[#22c55e] font-bold uppercase tracking-wider">Done</span>
              <div className="bg-zinc-900 p-1 rounded border border-[#22c55e]/20 text-[7px] text-zinc-500 line-through">API Routes</div>
            </div>
          </div>

          {/* Bottom HUD Efficiency Rate */}
          <div className="flex justify-between items-center text-[8px] text-zinc-500">
            <span className="flex items-center gap-1">
              <CheckSquare className="w-3 h-3 text-accent-purple" />
              <span>Task Efficiency:</span>
            </span>
            <span className="text-[#22c55e] font-bold">98% Optimal</span>
          </div>
        </div>
      ),
    },
    {
      title: "AI-Powered Job Portal",
      desc: "Developed a full-stack AI-powered job portal using the MERN stack. Implemented AI resume analysis, job matching, secure JWT authentication, role-based access, job management, and a responsive user interface.",
      tags: ["MERN Stack", "AI Resume Analysis", "JWT Auth", "Job Matching", "Tailwind CSS"],
      features: [
        "AI Resume Parsing & Information Extraction",
        "Intelligent Candidate-to-Job Matching Engine",
        "JWT Authentication & Role-Based Access Control",
        "Job Listing Posting & Applicant Tracking",
        "Responsive fluid interface built with Tailwind",
      ],
      architecture: "MERN Stack MVC + AI Analysis Module",
      github: "https://github.com",
      live: "https://github.com",
      renderVisual: () => (
        <div className="absolute inset-0 w-full h-full flex flex-col justify-between p-4 bg-gradient-to-br from-zinc-950 to-zinc-900 font-mono text-[9px] text-zinc-400 select-none">
          {/* Top Info Bar */}
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="flex items-center gap-1.5 text-accent-purple">
              <Brain className="w-3.5 h-3.5" />
              <span>AI_JOB_MATCH v1.0</span>
            </span>
            <span className="text-zinc-600">Matching Engine: Active</span>
          </div>

          {/* Job Portal visual representation */}
          <div className="flex-1 flex flex-col justify-center gap-2 py-3">
            {/* Resume Upload Box */}
            <div className="bg-white/5 border border-white/5 rounded-xl p-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue text-[9px] font-bold">PDF</div>
                <div className="flex flex-col">
                  <span className="text-white text-[8px] font-bold">Resume_Sree.pdf</span>
                  <span className="text-zinc-500 text-[7px]">Parsed successfully</span>
                </div>
              </div>
              <span className="text-[#22c55e] font-bold text-[8px]">100% Parsed</span>
            </div>

            {/* Job Match Score Box */}
            <div className="bg-accent-purple/10 border border-accent-purple/20 rounded-xl p-2 flex items-center justify-between">
              <span className="text-zinc-400 text-[8px]">MERN Developer Match:</span>
              <span className="text-accent-purple font-bold text-glow text-[10px]">98% Match Score</span>
            </div>
          </div>

          {/* Bottom HUD */}
          <div className="flex justify-between items-center text-[8px] text-zinc-500">
            <span className="flex items-center gap-1">
              <CheckSquare className="w-3.5 h-3.5 text-accent-cyan" />
              <span>AI Analytics Engine</span>
            </span>
            <span className="text-accent-cyan font-bold">Database: MongoDB Atlas</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      id="projects"
      ref={ref}
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-6 md:px-12 lg:px-24 border-t border-white/5 z-10"
    >
      {/* Background decoration */}
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-accent-blue/5 blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-16 text-left">
          <div className="text-accent-cyan font-mono text-xs tracking-widest uppercase mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
            Featured Projects
          </div>
          <h3 className="text-4xl sm:text-5xl font-black font-sans tracking-tight mb-4">
            Production-Ready <span className="text-gradient-cyan-blue">Deployments</span>
          </h3>
          <p className="text-zinc-400 font-light text-sm max-w-xl">
            A showcase of fully realized backend structures, highly responsive databases, and immersive React user interfaces. Click repository tabs to inspect core files.
          </p>
        </div>

        {/* Project Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {projectsData.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
