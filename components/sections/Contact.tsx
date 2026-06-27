"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react"

export default function Contact() {
  const WHATSAPP_NUM = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919479800674"

  const openWhatsApp = () => {
    const msg = encodeURIComponent(
      "Hi Trends Boutique! 🙏\nI would like to visit your store or place an order.\nPlease share your latest collection!\n\n📍 Rajwada, Indore"
    )
    window.open(`https://wa.me/${WHATSAPP_NUM}?text=${msg}`, "_blank")
  }

  const openMaps = () => {
    window.open("https://maps.google.com/?q=Rajwada+Chowk+Indore+Madhya+Pradesh", "_blank")
  }

  return (
    <section id="contact" className="py-20 sm:py-28 relative">
      <div className="absolute inset-0 bg-[#0f0f0f]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(201,169,110,0.05)_0%,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#C9A96E] text-xs sm:text-sm tracking-[0.3em] uppercase mb-3"
          >
            Hamare Paas Aayein
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-semibold text-[#F5F5F0]"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            Find Us
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-5"
          >
            {[
              {
                icon: <MapPin size={20} className="text-[#C9A96E]" />,
                label: "Address",
                value: "Near Rajwada Chowk, Indore, Madhya Pradesh — 452001",
                href: undefined,
              },
              {
                icon: <Phone size={20} className="text-[#C9A96E]" />,
                label: "Phone",
                value: "+91 94798-00674",
                href: "tel:+919479800674",
              },
              {
                icon: <Mail size={20} className="text-[#C9A96E]" />,
                label: "Email",
                value: "hello@trendsboutique.in",
                href: "mailto:hello@trendsboutique.in",
              },
              {
                icon: <Clock size={20} className="text-[#C9A96E]" />,
                label: "Timings",
                value: "Monday – Sunday: 10:00 AM – 9:00 PM",
                href: undefined,
              },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-4 rounded-2xl bg-[rgba(201,169,110,0.04)] border border-[rgba(201,169,110,0.08)]">
                <div className="w-10 h-10 rounded-xl bg-[rgba(201,169,110,0.1)] flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[10px] text-[rgba(201,169,110,0.6)] uppercase tracking-widest mb-1 font-semibold">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-[rgba(245,245,240,0.8)] hover:text-[#C9A96E] transition-colors text-sm">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-[rgba(245,245,240,0.8)] text-sm">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <button
              id="contact-whatsapp-btn"
              onClick={openWhatsApp}
              className="w-full flex items-center justify-center gap-3 py-4 bg-[#25D366] text-white font-bold text-base rounded-2xl min-h-[60px] transition-all duration-300 hover:bg-[#1ebe5d] hover:shadow-[0_8px_30px_rgba(37,211,102,0.35)] active:scale-[0.97] mt-2"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp pe Message Karo
            </button>
          </motion.div>

          {/* Right — CSS Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden border border-[rgba(201,169,110,0.1)] min-h-[360px]"
            style={{ background: "linear-gradient(135deg, #0d0d0d 0%, #111 100%)" }}
          >
            {/* Grid */}
            <div className="absolute inset-0 css-map-grid opacity-60" />

            {/* Roads */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[rgba(201,169,110,0.2)]" />
              <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[rgba(201,169,110,0.2)]" />
              <div className="absolute top-1/3 left-0 right-0 h-px bg-[rgba(201,169,110,0.08)]" />
              <div className="absolute top-2/3 left-0 right-0 h-px bg-[rgba(201,169,110,0.08)]" />
              <div className="absolute left-1/3 top-0 bottom-0 w-px bg-[rgba(201,169,110,0.08)]" />
              <div className="absolute left-2/3 top-0 bottom-0 w-px bg-[rgba(201,169,110,0.08)]" />
            </div>

            {/* Location pin */}
            <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-[#C9A96E] shadow-[0_0_20px_rgba(201,169,110,0.8)] float-1" />
              <div className="w-px h-5 bg-[#C9A96E] opacity-70" />
            </div>

            {/* Label */}
            <div className="absolute top-[45%] left-1/2 translate-x-4 -translate-y-10">
              <div className="glass rounded-xl px-4 py-2 text-xs text-[#C9A96E] font-semibold whitespace-nowrap border border-[rgba(201,169,110,0.2)]">
                📍 Trends Boutique
              </div>
            </div>

            {/* Area labels */}
            <div className="absolute top-4 left-4 text-[10px] text-[rgba(201,169,110,0.3)] uppercase tracking-widest">
              Rajwada Area
            </div>
            <div className="absolute bottom-4 right-4 text-[10px] text-[rgba(201,169,110,0.3)] uppercase tracking-widest">
              Indore, MP
            </div>

            {/* Get Directions */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
              <button
                id="get-directions-btn"
                onClick={openMaps}
                className="flex items-center gap-2 text-sm bg-[#C9A96E] text-black font-bold px-5 py-2.5 rounded-xl hover:bg-[#E8C98A] transition-colors active:scale-95"
              >
                <ExternalLink size={14} />
                Get Directions
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
