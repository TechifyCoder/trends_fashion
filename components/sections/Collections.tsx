"use client"

import { motion, type Variants } from "framer-motion"
import { ArrowRight } from "lucide-react"

const COLLECTIONS = [
  {
    id: "ethnic",
    title: "Ethnic Wear",
    subtitle: "Rooted in Tradition",
    count: "24 Designs",
    description: "Sarees, Lehengas, Kurtis, Salwar Suits — the timeless elegance of Indian tradition",
    href: "#catalog",
    gradient: "from-[#3D1515] to-[#1A0A0A]",
    accentColor: "#C9A96E",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 4L30 18H44L33 27L37 41L24 32L11 41L15 27L4 18H18L24 4Z" stroke="#C9A96E" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(201,169,110,0.1)" />
      </svg>
    ),
  },
  {
    id: "western",
    title: "Western Fusion",
    subtitle: "Modern & Bold",
    count: "18 Designs",
    description: "Gowns, Co-ords, Blazers, Dresses — contemporary fashion for the bold woman",
    href: "#catalog",
    gradient: "from-[#0A1A2E] to-[#050D1A]",
    accentColor: "#7BA7D4",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="18" stroke="#7BA7D4" strokeWidth="1.5" fill="rgba(123,167,212,0.1)" />
        <path d="M16 24h16M24 16v16" stroke="#7BA7D4" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "bridal",
    title: "Bridal Collection",
    subtitle: "Your Special Day",
    count: "12 Designs",
    description: "Royal lehengas, bridal sarees & sharavas — made for your most precious moment",
    href: "#catalog",
    gradient: "from-[#2D1A2E] to-[#160D17]",
    accentColor: "#E8A0C8",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M24 8C24 8 12 16 12 26C12 32.627 17.373 38 24 38C30.627 38 36 32.627 36 26C36 16 24 8 24 8Z" stroke="#E8A0C8" strokeWidth="1.5" fill="rgba(232,160,200,0.1)" />
        <path d="M24 20V30M20 24L28 24" stroke="#E8A0C8" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function Collections() {
  const scrollToCategory = () => {
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })
  }

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  }

  return (
    <section id="collections" className="py-20 sm:py-28 px-5 sm:px-8 lg:px-12 relative overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,169,110,0.05)_0%,transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase mb-4"
          >
            Curated For You
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-[clamp(2.4rem,5vw,3.8rem)] font-semibold text-[#F5F5F0]"
          >
            Our Collections
          </motion.h2>
          {/* Animated gold underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-4 h-0.5 w-24 bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent origin-left"
          />
        </div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {COLLECTIONS.map((col) => (
            <motion.div
              key={col.id}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-3xl cursor-pointer min-h-80"
              onClick={() => scrollToCategory()}
              id={`collection-card-${col.id}`}
            >
              {/* Background gradient + textile pattern */}
              <div className={`absolute inset-0 bg-gradient-to-br ${col.gradient}`} />
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,1) 0px, rgba(255,255,255,1) 1px, transparent 1px, transparent 8px)",
                }}
              />

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(ellipse at 50% 50%, ${col.accentColor}15 0%, transparent 70%)`,
                }}
              />

              {/* Gold border animation */}
              <div className="absolute inset-0 rounded-3xl border border-[rgba(201,169,110,0.1)] group-hover:border-[rgba(201,169,110,0.4)] transition-all duration-500" />

              {/* Content */}
              <div className="relative z-10 p-8 h-full flex flex-col justify-between" style={{ minHeight: "320px" }}>
                <div>
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300 origin-left">
                    {col.icon}
                  </div>
                  <div className="text-xs tracking-[0.25em] uppercase mb-2" style={{ color: col.accentColor + "99" }}>
                    {col.count}
                  </div>
                  <h3 className="font-display text-3xl font-semibold text-[#F5F5F0] mb-1">
                    {col.title}
                  </h3>
                  <p className="font-display italic text-lg" style={{ color: col.accentColor }}>
                    "{col.subtitle}"
                  </p>
                  <p className="text-[rgba(245,245,240,0.55)] text-sm leading-relaxed mt-3">
                    {col.description}
                  </p>
                </div>

                {/* Explore button — slides up on hover */}
                <div className="mt-6 overflow-hidden">
                  <div className="translate-y-10 group-hover:translate-y-0 transition-transform duration-400 ease-out">
                    <div
                      className="inline-flex items-center gap-2 text-sm font-semibold py-2.5 px-5 rounded-xl"
                      style={{
                        backgroundColor: col.accentColor + "20",
                        color: col.accentColor,
                        border: `1px solid ${col.accentColor}40`,
                      }}
                    >
                      Explore →
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card lift shadow on hover */}
              <div className="absolute inset-0 rounded-3xl group-hover:-translate-y-1 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-400" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
