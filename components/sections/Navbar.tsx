"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles } from "lucide-react"

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#collections", label: "Collections" },
  { href: "#catalog", label: "Shop" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass border-b border-[rgba(201,169,110,0.25)] py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick("#home") }}
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 rounded-xl bg-[#C9A96E] flex items-center justify-center shadow-[0_0_15px_rgba(201,169,110,0.4)]">
              <span className="font-display font-bold text-lg text-black leading-none">TB</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-display font-semibold text-lg text-[#F5F5F0] leading-none">
                Trends Boutique
              </div>
              <div className="text-[10px] text-[rgba(201,169,110,0.7)] tracking-wider leading-none mt-0.5">
                INDORE
              </div>
            </div>
          </motion.a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                className="relative px-4 py-2 text-sm text-[rgba(245,245,240,0.75)] hover:text-[#F5F5F0] transition-colors group"
              >
                {link.label}
                <span className="absolute bottom-1 left-4 right-4 h-px bg-[#C9A96E] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.a>
            ))}

            {/* Try-On AI link */}
            <motion.a
              href="#try-on"
              onClick={(e) => { e.preventDefault(); handleNavClick("#try-on") }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.46 }}
              id="nav-tryon-link"
              className="ml-2 flex items-center gap-1.5 px-4 py-2 bg-[rgba(201,169,110,0.1)] border border-[rgba(201,169,110,0.3)] rounded-full text-sm text-[#C9A96E] hover:bg-[rgba(201,169,110,0.2)] transition-all duration-200"
            >
              <Sparkles size={12} />
              Try-On AI
              <span className="ml-1 text-[9px] bg-[#C9A96E] text-black px-1.5 py-0.5 rounded-full font-bold gold-pulse">
                NEW
              </span>
            </motion.a>
          </nav>

          {/* Mobile hamburger */}
          <button
            id="hamburger-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[rgba(201,169,110,0.1)] border border-[rgba(201,169,110,0.2)]"
          >
            <motion.div
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 7 : 0 }}
              transition={{ duration: 0.2 }}
              className="w-5 h-0.5 bg-[#C9A96E]"
            />
            <motion.div
              animate={{ opacity: mobileOpen ? 0 : 1 }}
              transition={{ duration: 0.1 }}
              className="w-5 h-0.5 bg-[#C9A96E]"
            />
            <motion.div
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -7 : 0 }}
              transition={{ duration: 0.2 }}
              className="w-5 h-0.5 bg-[#C9A96E]"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col items-center justify-center"
          >
            {/* Gold shimmer bg */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[rgba(201,169,110,0.04)] rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[rgba(201,169,110,0.03)] rounded-full blur-2xl" />
            </div>

            <nav className="flex flex-col items-center gap-2 relative z-10">
              {[...NAV_LINKS, { href: "#try-on", label: "Try-On AI ✨" }].map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="font-display text-4xl font-medium text-[rgba(245,245,240,0.8)] hover:text-[#C9A96E] transition-colors py-2"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 text-center"
            >
              <p className="text-[rgba(245,245,240,0.4)] text-sm">
                📍 Near Rajwada Chowk, Indore
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
