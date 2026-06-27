"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useAdminStore } from "@/lib/admin-store"

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0)
  const TESTIMONIALS = useAdminStore((s) => s.reviews)

  // Safety: clamp activeIdx if reviews were deleted
  const safeIdx = TESTIMONIALS.length > 0 ? Math.min(activeIdx, TESTIMONIALS.length - 1) : 0
  const active = TESTIMONIALS[safeIdx]

  if (!active) return null

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0a]" />

      {/* Gold quote SVG */}
      <div className="absolute top-16 left-8 opacity-[0.06] pointer-events-none select-none">
        <svg width="120" height="90" viewBox="0 0 120 90" fill="#C9A96E">
          <path d="M0 90V54.5C0 27.5 17 8 51 0L58 13C42 18 34 28.5 34 44H51V90H0ZM69 90V54.5C69 27.5 86 8 120 0L127 13C111 18 103 28.5 103 44H120V90H69Z" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase mb-3"
          >
            Real Reviews
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-[clamp(2.2rem,4.5vw,3.5rem)] font-semibold text-[#F5F5F0]"
          >
            Happy Customers
          </motion.h2>
        </div>

        {/* Featured Testimonial */}
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto mt-6 mb-16 px-4"
        >
          <div className="glass rounded-3xl py-14 px-10 md:px-16 text-center relative flex flex-col items-center gap-6">
            {/* Stars */}
            <div className="flex justify-center gap-1.5">
              {Array.from({ length: active.rating }).map((_, i) => (
                <svg key={i} width="22" height="22" viewBox="0 0 20 20" fill="#C9A96E">
                  <path d="M10 1.5L12.24 7.11L18.4 7.64L13.88 11.63L15.27 17.64L10 14.47L4.73 17.64L6.12 11.63L1.6 7.64L7.76 7.11L10 1.5Z" />
                </svg>
              ))}
            </div>

            <blockquote className="font-display text-lg md:text-xl text-[#F5F5F0] leading-relaxed italic text-center w-full">
              &ldquo;{active.text}&rdquo;
            </blockquote>

            {/* Gold divider */}
            <div className="w-14 h-px bg-[rgba(201,169,110,0.35)]" />

            {/* Customer info — fully centered */}
            <div className="flex flex-col items-center gap-2.5">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: active.color }}
              >
                {active.initials}
              </div>
              <div className="text-center">
                <p className="font-semibold text-[#F5F5F0] text-sm">{active.name}</p>
                <p className="text-xs text-[rgba(245,245,240,0.45)] mt-0.5">{active.area}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Avatar Navigation */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={i}
              id={`testimonial-nav-${i}`}
              onClick={() => setActiveIdx(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                activeIdx === i
                  ? "border-[#C9A96E] bg-[rgba(201,169,110,0.15)]"
                  : "border-[rgba(245,245,240,0.08)] hover:border-[rgba(201,169,110,0.3)]"
              }`}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ backgroundColor: t.color }}
              >
                {t.initials}
              </div>
              <span className="text-xs text-[rgba(245,245,240,0.7)] hidden sm:block">{t.name.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIdx === i ? "w-6 bg-[#C9A96E]" : "w-1.5 bg-[rgba(201,169,110,0.25)]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
