"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// Static imports for non-3D components
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import BackgroundParticles from "@/components/BackgroundParticles";

import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Experience from "@/sections/Experience";
import GithubShowcase from "@/sections/GithubShowcase";
import Certifications from "@/sections/Certifications";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";

// Dynamic import for the 3D Canvas component (prevents SSR errors)
const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* 1. Preloader Scene */}
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <SmoothScroll>
          <div className="relative min-h-screen w-full bg-[#030303] text-[#f5f5f7] selection:bg-accent-cyan/35 selection:text-white">
            
            {/* 2. Global background particles */}
            <BackgroundParticles />
            
            {/* 3. Global custom mouse cursor */}
            <CustomCursor />

            {/* 4. Split Hero Layout: Text overlay left, 3D Canvas right */}
            <div className="relative w-full min-h-screen flex flex-col lg:flex-row items-stretch justify-between">
              
              {/* Left Column: Hero Copywriting */}
              <div className="w-full lg:w-[55%] flex items-center">
                <Hero />
              </div>
              
              {/* Right Column: 3D interactive HUD panel */}
              <div className="w-full h-[400px] lg:h-auto lg:w-[45%] relative border-b lg:border-b-0 lg:border-l border-white/5 bg-zinc-950/20 backdrop-blur-sm overflow-hidden flex items-center justify-center">
                {/* 3D scene wrapper */}
                <div className="absolute inset-0 w-full h-full z-10">
                  <Scene3D />
                </div>
                {/* Visual HUD hints for orbital mechanics */}
                <div className="absolute bottom-6 right-6 font-mono text-[9px] text-zinc-500 z-20 pointer-events-none uppercase tracking-widest hidden sm:flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                  <span>Interactive 3D Workspace: Left-click & drag to rotate</span>
                </div>
              </div>

            </div>

            {/* 5. Assembled sections */}
            <main className="relative z-10 w-full flex flex-col">
              <About />
              <Skills />
              <Projects />
              <Experience />
              <GithubShowcase />
              <Certifications />
              <Contact />
            </main>

            {/* 6. Footer section */}
            <Footer />

          </div>
        </SmoothScroll>
      )}
    </>
  );
}

