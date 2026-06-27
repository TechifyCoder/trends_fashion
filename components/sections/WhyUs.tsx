"use client"

import { motion } from "framer-motion"

const FEATURES = [
  {
    id: "quality",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 3L19.39 10.26L27.41 11.27L21.7 16.82L23.08 24.81L16 21.14L8.92 24.81L10.3 16.82L4.59 11.27L12.61 10.26L16 3Z" stroke="#C9A96E" strokeWidth="1.5" fill="rgba(201,169,110,0.1)" strokeLinejoin="round" />
      </svg>
    ),
    title: "Premium Quality",
    subtitle: "Hath se chuna hua",
    description: "Dil se banaya gaya — every fabric is handpicked and quality-checked by our experts before it reaches you.",
    span: "lg:col-span-2",
    size: "large",
  },
  {
    id: "trends",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M4 24L11 17L16 22L22 15L28 8" stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="28" cy="8" r="2.5" fill="#C9A96E" />
      </svg>
    ),
    title: "Latest Trends",
    subtitle: "Always on-trend",
    description: "Mumbai aur Delhi ke latest fashion, seedha Indore mein — updated every season.",
    span: "",
    size: "normal",
  },
  {
    id: "stitching",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="10" stroke="#C9A96E" strokeWidth="1.5" />
        <path d="M16 10V16L20 20" stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    title: "Custom Stitching",
    subtitle: "Aapke naap, aapki marzi",
    description: "Perfect fit guaranteed — custom stitching available for all our outfits.",
    span: "",
    size: "normal",
  },
  {
    id: "returns",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M8 10H24M8 16H20M8 22H16" stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M24 18L28 22L24 26" stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Easy Returns",
    subtitle: "Koi sawaal nahi",
    description: "7 din return policy — hassle-free, no questions asked. Your satisfaction is our priority.",
    span: "",
    size: "normal",
  },
]

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 relative">
      <div className="absolute inset-0 bg-[#0f0f0f]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase mb-3"
          >
            Kyun Chose Karein
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-[clamp(2.2rem,4.5vw,3.5rem)] font-semibold text-[#F5F5F0]"
          >
            Why Trends Boutique?
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`${f.span} group relative overflow-hidden rounded-3xl p-7 border border-[rgba(201,169,110,0.1)] hover:border-[rgba(201,169,110,0.35)] transition-all duration-400 hover:shadow-[0_8px_40px_rgba(201,169,110,0.12)] cursor-default ${f.size === "large" ? "sm:col-span-2 lg:col-span-2" : ""}`}
              style={{
                background: "linear-gradient(135deg, #161616 0%, #111 100%)",
              }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_30%_30%,rgba(201,169,110,0.07)_0%,transparent_70%)]" />

              <div className="relative z-10">
                <div className="mb-5 group-hover:scale-110 transition-transform duration-300 origin-left">
                  {f.icon}
                </div>
                <h3 className={`font-display text-[#F5F5F0] font-semibold mb-1 ${f.size === "large" ? "text-2xl" : "text-xl"}`}>
                  {f.title}
                </h3>
                <p className="text-[#C9A96E] text-sm font-medium italic mb-3">
                  "{f.subtitle}"
                </p>
                <p className="text-[rgba(245,245,240,0.55)] text-sm leading-relaxed">
                  {f.description}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-3 right-3 w-12 h-12 rounded-full border border-[rgba(201,169,110,0.15)]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
