"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import confetti from "canvas-confetti";
import MagneticButton from "@/components/MagneticButton";

// Inline Linkedin Icon SVG (since brand icons are removed from newer lucide-react versions)
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);


export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "", // Bot trap
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear validation error when typing
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[e.target.name];
        return copy;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email formatting";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const triggerConfetti = () => {
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#00f5ff", "#0066ff", "#bd00ff"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#00f5ff", "#0066ff", "#bd00ff"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Bot honeypot spam protection check
    if (formData.honeypot) {
      console.warn("Spam bot detected!");
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");

    // Fetch credentials from environmental configurations or use mocks
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

    try {
      if (serviceId && templateId && publicKey) {
        // Send email via EmailJS browser API
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.name,
            reply_to: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_name: "Sree Rajan S",
          },
          publicKey
        );
      } else {
        // Mock API transmission latency
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Mock Email sent successfully (credentials missing):", formData);
      }

      setStatus("success");
      triggerConfetti();
      
      // Reset form variables
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        honeypot: "",
      });
    } catch (err) {
      console.error("Email API failed:", err);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-6 md:px-12 lg:px-24 border-t border-white/5 z-10"
    >
      {/* Background neon glows */}
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] rounded-full bg-accent-blue/5 blur-[95px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column: Get in touch credentials */}
        <div className="lg:col-span-5 flex flex-col gap-8 text-left">
          <div>
            <div className="text-accent-cyan font-mono text-xs tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
              Get In Touch
            </div>
            <h3 className="text-4xl sm:text-5xl font-black font-sans tracking-tight mb-4">
              Let's Build <span className="text-gradient-cyan-blue">Something Great</span>
            </h3>
            <p className="text-zinc-400 font-light text-sm leading-relaxed">
              Seeking job opportunities, collaborations, or custom full-stack solutions? Send an email or message on WhatsApp.
            </p>
          </div>

          {/* Contact Details Cards */}
          <div className="flex flex-col gap-4 font-mono text-xs text-zinc-400">
            {/* Email */}
            <div className="glass-panel p-4 rounded-2xl border-white/5 flex items-center gap-4 hover:border-accent-cyan/20 transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-cyan flex-shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 uppercase">Email</span>
                <a href="mailto:s.sreerajansr@gmail.com" className="text-white hover:text-accent-cyan transition-colors mt-0.5 interactive">
                  s.sreerajansr@gmail.com
                </a>
              </div>
            </div>

            {/* Phone & WhatsApp */}
            <div className="glass-panel p-4 rounded-2xl border-white/5 flex items-center gap-4 hover:border-accent-cyan/20 transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center text-accent-purple flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 uppercase">Phone & WhatsApp</span>
                <a 
                  href="https://wa.me/919786489330" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white hover:text-accent-cyan transition-colors mt-0.5 interactive"
                >
                  +91 9786489330
                </a>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="glass-panel p-4 rounded-2xl border-white/5 flex items-center gap-4 hover:border-accent-cyan/20 transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-cyan flex-shrink-0">
                <LinkedinIcon className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 uppercase">LinkedIn</span>
                <a 
                  href="https://www.linkedin.com/in/sree-rajan-sr-" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white hover:text-accent-cyan transition-colors mt-0.5 interactive"
                >
                  linkedin.com/in/sree-rajan-sr-
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="glass-panel p-4 rounded-2xl border-white/5 flex items-center gap-4 hover:border-accent-cyan/20 transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center text-accent-purple flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 uppercase">Location</span>
                <span className="text-white mt-0.5 font-sans">Chennai, Tamil Nadu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact form shell */}
        <div className="lg:col-span-7 w-full">
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border-white/5 relative overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
            
            {/* Top glass gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple" />

            <AnimatePresence mode="wait">
              {status === "success" ? (
                // Success screen
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-10 font-sans"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 180, damping: 12, delay: 0.1 }}
                    className="w-16 h-16 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center text-[#22c55e] mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </motion.div>
                  <h4 className="text-2xl font-bold text-white mb-2">Message Sent!</h4>
                  <p className="text-zinc-400 text-sm max-w-sm mb-8 leading-relaxed">
                    Thank you. Your message has been received. Sree Rajan S will respond to your inquiry shortly.
                  </p>
                  <MagneticButton>
                    <button
                      onClick={() => setStatus("idle")}
                      className="px-6 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider text-[#030303] bg-accent-cyan font-bold hover:scale-105 transition-transform duration-300 cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </MagneticButton>
                </motion.div>
              ) : (
                // Form view
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  noValidate
                >
                  {/* Bot honeypot check (hidden visually, absolute) */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    className="hidden"
                    autoComplete="off"
                  />

                  {/* Name and Email side-by-side on desktop */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col gap-2 text-left">
                      <label htmlFor="name" className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl bg-zinc-950/60 border ${
                          errors.name ? "border-red-500" : "border-white/5 focus:border-accent-cyan"
                        } text-white font-sans text-sm focus:outline-none transition-colors duration-200`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <span className="flex items-center gap-1 text-[10px] font-mono text-red-400 mt-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.name}</span>
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2 text-left">
                      <label htmlFor="email" className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl bg-zinc-950/60 border ${
                          errors.email ? "border-red-500" : "border-white/5 focus:border-accent-cyan"
                        } text-white font-sans text-sm focus:outline-none transition-colors duration-200`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <span className="flex items-center gap-1 text-[10px] font-mono text-red-400 mt-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-2 text-left">
                    <label htmlFor="subject" className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-zinc-950/60 border ${
                        errors.subject ? "border-red-500" : "border-white/5 focus:border-accent-cyan"
                      } text-white font-sans text-sm focus:outline-none transition-colors duration-200`}
                      placeholder="Project collaboration request"
                    />
                    {errors.subject && (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-red-400 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.subject}</span>
                      </span>
                    )}
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2 text-left">
                    <label htmlFor="message" className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-3 rounded-xl bg-zinc-950/60 border ${
                        errors.message ? "border-red-500" : "border-white/5 focus:border-accent-cyan"
                      } text-white font-sans text-sm focus:outline-none focus:ring-0 resize-none transition-colors duration-200`}
                      placeholder="Tell me about your project..."
                    />
                    {errors.message && (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-red-400 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.message}</span>
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="mt-4 flex items-center justify-between">
                    {/* Error indicator */}
                    {status === "error" && (
                      <span className="flex items-center gap-1.5 text-[11px] font-mono text-red-400">
                        <AlertCircle className="w-4 h-4" />
                        <span>Delivery failed. Try again.</span>
                      </span>
                    )}
                    
                    {/* The Submit Trigger */}
                    <MagneticButton className="ml-auto">
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="flex items-center gap-2 px-6 py-3 rounded-full font-mono text-xs uppercase tracking-wider text-[#030303] bg-gradient-to-r from-accent-cyan to-accent-blue hover:scale-105 transition-all duration-300 font-bold shadow-[0_0_15px_rgba(0,245,255,0.35)] disabled:opacity-50 cursor-pointer"
                      >
                        {status === "submitting" ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-[#030303]" />
                            <span>Transmitting...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Transmit Message</span>
                          </>
                        )}
                      </button>
                    </MagneticButton>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
