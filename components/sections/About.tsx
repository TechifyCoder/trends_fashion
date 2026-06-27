"use client"

import { useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { motion } from "framer-motion"
import { useIsMobile } from "@/hooks/useFilter"

const FabricSphere = dynamic(() => import("@/components/3d/FabricSphere"), { ssr: false })

const STATS = [
  { value: 8, suffix: "+", label: "Saal Ka Tajurba", sublabel: "Years of Excellence" },
  { value: 500, suffix: "+", label: "Khush Grahak", sublabel: "Happy Customers" },
  { value: 3000, suffix: "+", label: "Designs Available", sublabel: "Curated Designs" },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started.current) {
          started.current = true
          let start = 0
          const duration = 1800
          const step = (timestamp: number, startTime: number) => {
            const progress = Math.min((timestamp - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            el.textContent = Math.floor(eased * value) + suffix
            if (progress < 1) requestAnimationFrame((t) => step(t, startTime))
          }
          requestAnimationFrame((t) => step(t, t))
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value, suffix])

  return <span ref={ref}>{0}{suffix}</span>
}

export default function About() {
  const isMobile = useIsMobile()

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(201,169,110,0.05)_0%,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-[#C9A96E] text-sm tracking-[0.3em] uppercase mb-4">Hamari Kahani</p>
              <h2 className="font-display text-[clamp(2.5rem,4.5vw,3.8rem)] font-semibold text-[#F5F5F0] leading-[1.1]">
                8 Saal Ki<br />
                <span className="gold-shimmer-text">Virasat</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-4 text-[rgba(245,245,240,0.65)] leading-relaxed"
            >
              <p>
                2016 mein shuru hua ek sapna — Rajwada Chowk ke dil mein, jahan Indore ka itihas saans leta hai. Hamara boutique aaj bhi usi mitti ki khushboo lekar, aaj ki fashion ki zuban mein baat karta hai.
              </p>
              <p>
                Hamari collection mein aapko milenge pure silk ke banarasi saree se lekar modern western gowns tak — sabhi kuch carefully handpicked, sirf aapke liye. Har design mein ek kahani hai, har kapda mein ek ehsaas.
              </p>
              <p>
                Hamare grahak sirf customers nahi, hamare parivaar hain. Unki shaadi ho, festival ho, ya koi khaas mauqa — Trends Boutique har pal mein saath hai. Yeh sirf ek dukaan nahi, yeh Indore ki pehchan hai.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="grid grid-cols-3 gap-4"
            >
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="glass rounded-2xl p-4 text-center border border-[rgba(201,169,110,0.1)]"
                >
                  <div className="font-display text-3xl font-bold text-[#C9A96E]">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[rgba(245,245,240,0.5)] text-xs mt-1 leading-tight">
                    {stat.sublabel}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — 3D or fallback */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[420px] lg:h-[520px] flex items-center justify-center"
          >
            {!isMobile ? (
              <div className="w-full h-full rounded-3xl overflow-hidden border border-[rgba(201,169,110,0.1)]" style={{ background: "radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 100%)" }}>
                <Canvas camera={{ position: [0, 0, 4], fov: 50 }} style={{ width: "100%", height: "100%" }} gl={{ alpha: true, antialias: true }}>
                  <Suspense fallback={null}>
                    <FabricSphere />
                  </Suspense>
                </Canvas>
              </div>
            ) : (
              /* Mobile fallback */
              <div className="w-64 h-64 rounded-full border border-[rgba(201,169,110,0.2)]" style={{ background: "conic-gradient(from 0deg, #C9A96E22, #0a0a0a, #C9A96E11, #0a0a0a, #C9A96E22)" }}>
                <div className="w-full h-full rounded-full flex items-center justify-center">
                  <span className="font-display text-6xl font-bold text-[rgba(201,169,110,0.3)]">TB</span>
                </div>
              </div>
            )}

            {/* Decorative rings */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-8 right-8 w-32 h-32 rounded-full border border-[rgba(201,169,110,0.08)]" />
              <div className="absolute bottom-8 left-8 w-20 h-20 rounded-full border border-[rgba(201,169,110,0.06)]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
