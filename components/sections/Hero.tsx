"use client"

import dynamic from "next/dynamic"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useIsMobile } from "@/hooks/useFilter"

const FloatingCloth = dynamic(() => import("@/components/3d/FloatingCloth"), { ssr: false })

export default function Hero() {
  const isMobile = useIsMobile()
  const WHATSAPP_NUM = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919479800674"

  const scrollToCatalog = () => {
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })
  }

  const openWhatsApp = () => {
    const msg = encodeURIComponent(
      "Hi Trends Boutique! 🙏\nI want to place an order.\nPlease share your latest collection!\n\n📍 Rajwada, Indore"
    )
    window.open(`https://wa.me/${WHATSAPP_NUM}?text=${msg}`, "_blank")
  }

  const headline = "Style Jo Bolti Hai Apni Baat"

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* 3D Background — Desktop Only */}
      {!isMobile ? (
        <div className="absolute inset-0 z-0 opacity-50">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            style={{ width: "100%", height: "100%" }}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <FloatingCloth />
            </Suspense>
          </Canvas>
        </div>
      ) : (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f0f] via-[#161616] to-[#0f0f0f]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(201,169,110,0.12)_0%,transparent_60%)]" />
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: "repeating-linear-gradient(45deg,rgba(201,169,110,0.08) 0px,rgba(201,169,110,0.08) 1px,transparent 1px,transparent 20px)",
          }} />
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[rgba(15,15,15,0.5)] via-transparent to-[rgba(15,15,15,0.85)]" />

      {/* Floating geometric diamonds */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {[
          { top: "18%", left: "5%", size: 20, delay: "0s", dur: "6s", opacity: 0.2 },
          { top: "65%", left: "8%", size: 12, delay: "1s", dur: "8s", opacity: 0.15 },
          { top: "30%", right: "6%", size: 16, delay: "0.5s", dur: "10s", opacity: 0.18 },
          { top: "70%", right: "10%", size: 24, delay: "2s", dur: "7s", opacity: 0.12 },
          { top: "45%", left: "2%", size: 10, delay: "3s", dur: "9s", opacity: 0.16 },
          { top: "12%", right: "15%", size: 14, delay: "1.5s", dur: "11s", opacity: 0.14 },
        ].map((s, i) => (
          <div
            key={i}
            className="absolute border border-[#C9A96E] rotate-45"
            style={{
              top: s.top,
              left: "left" in s ? (s as Record<string, string>).left : undefined,
              right: "right" in s ? (s as Record<string, string>).right : undefined,
              width: s.size,
              height: s.size,
              opacity: s.opacity,
              animation: `float1 ${s.dur} ease-in-out ${s.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Location label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-px w-10 bg-[#C9A96E]" />
            <span className="text-[#C9A96E] text-xs sm:text-sm tracking-[0.25em] uppercase font-medium">
              ✦ Rajwada, Indore — Est. 2016
            </span>
          </motion.div>

          {/* Headline */}
          <h1
            className="font-display font-semibold leading-[1.05] mb-7"
            style={{ fontSize: "clamp(2.6rem, 7vw, 5.2rem)" }}
          >
            {headline.split(" ").map((word, wi) => (
              <motion.span
                key={wi}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.35 + wi * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block mr-[0.25em] last:mr-0"
              >
                <span className="gold-shimmer-text">{word}</span>
              </motion.span>
            ))}
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-[rgba(245,245,240,0.6)] leading-relaxed mb-10 max-w-lg"
            style={{ fontSize: "clamp(0.95rem, 2vw, 1.125rem)" }}
          >
            Ethnic wear, Western fusion & Bridal collection —
            <br className="hidden sm:block" />
            handpicked for the modern Indian woman
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              id="hero-cta-primary"
              onClick={scrollToCatalog}
              className="group relative overflow-hidden px-9 py-4 bg-[#C9A96E] text-black font-bold text-base rounded-2xl min-h-[56px] transition-all duration-300 hover:bg-[#E8C98A] hover:shadow-[0_8px_35px_rgba(201,169,110,0.4)] active:scale-[0.97]"
            >
              <span className="relative z-10">Collection Dekho →</span>
            </button>

            <button
              id="hero-cta-whatsapp"
              onClick={openWhatsApp}
              className="group flex items-center justify-center gap-3 px-9 py-4 border-2 border-[#C9A96E] text-[#C9A96E] font-bold text-base rounded-2xl min-h-[56px] transition-all duration-300 hover:bg-[rgba(201,169,110,0.1)] hover:shadow-[0_4px_25px_rgba(201,169,110,0.2)] active:scale-[0.97]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp pe Order Karo
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[rgba(245,245,240,0.3)] text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown size={18} className="text-[rgba(201,169,110,0.5)] bounce-arrow" />
      </motion.div>
    </section>
  )
}
