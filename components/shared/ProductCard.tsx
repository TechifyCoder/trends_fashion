"use client"

import { useCallback } from "react"
import { motion } from "framer-motion"
import { MessageCircle, Sparkles } from "lucide-react"
import { type Product } from "@/types/product"
import { useTryOnStore } from "@/hooks/useTryOn"
import StarRating from "./StarRating"
import { formatPrice } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  index?: number
}

const tagColors: Record<string, string> = {
  bestseller: "bg-[#C9A96E] text-black",
  new: "bg-white text-black",
  trending: "bg-[#E91E63] text-white",
  sale: "bg-[#FF5722] text-white",
}

const colorMap: Record<string, string> = {
  Red: "#ef4444", Gold: "#C9A96E", Black: "#1a1a1a", Green: "#22c55e",
  Blue: "#3b82f6", Pink: "#ec4899", White: "#f5f5f5", Maroon: "#7B1A1A",
  Yellow: "#eab308", Orange: "#f97316", Purple: "#a855f7", Beige: "#D7CCC8",
  Navy: "#1e3a5f", Teal: "#0d9488", Ivory: "#FFFFF0", Peach: "#FFCCBC",
  Lavender: "#E8D5F5", Brown: "#92400e", Grey: "#6b7280", Silver: "#C0C0C0",
  Cream: "#FFFDD0", "Sage Green": "#9CAF88",
}

/* SVG clothing illustration based on subcategory */
function ClothingSVG({ product }: { product: Product }) {
  const accent = product.cssColor
  const light = "rgba(255,255,255,0.15)"

  if (product.subcategory === "saree" || product.subcategory === "lehenga") {
    return (
      <svg viewBox="0 0 200 260" fill="none" className="w-full h-full drop-shadow-lg">
        {/* Mannequin / dress form */}
        <ellipse cx="100" cy="40" rx="18" ry="20" fill={light} />
        <path d="M82 55 C82 55 70 70 68 100 L65 200 C65 205 70 210 100 215 C130 210 135 205 135 200 L132 100 C130 70 118 55 118 55 Z" fill={accent} opacity="0.85" />
        {/* Pallu / drape for sarees */}
        <path d="M118 55 C125 65 140 80 145 100 L150 170 C148 175 140 178 132 175 L132 100 Z" fill={accent} opacity="0.6" />
        {/* Embroidery dots */}
        <circle cx="85" cy="120" r="2" fill={light} />
        <circle cx="95" cy="135" r="2" fill={light} />
        <circle cx="105" cy="120" r="2" fill={light} />
        <circle cx="115" cy="135" r="2" fill={light} />
        <circle cx="100" cy="155" r="2" fill={light} />
        {/* Border pattern */}
        <path d="M65 195 L135 195" stroke="rgba(201,169,110,0.5)" strokeWidth="3" strokeDasharray="6 3" />
        <path d="M65 200 L135 200" stroke="rgba(201,169,110,0.3)" strokeWidth="2" />
        {/* Waist detail */}
        <path d="M75 95 Q100 88 125 95" stroke="rgba(201,169,110,0.4)" strokeWidth="1.5" fill="none" />
      </svg>
    )
  }

  if (product.subcategory === "suit" || product.subcategory === "kurta" || product.subcategory === "anarkali" || product.subcategory === "sharara") {
    return (
      <svg viewBox="0 0 200 260" fill="none" className="w-full h-full drop-shadow-lg">
        <ellipse cx="100" cy="38" rx="16" ry="18" fill={light} />
        {/* Kurta body */}
        <path d="M84 52 L75 60 L55 75 L60 85 L78 75 L74 180 C74 185 85 190 100 192 C115 190 126 185 126 180 L122 75 L140 85 L145 75 L125 60 L116 52 Z" fill={accent} opacity="0.85" />
        {/* Neckline */}
        <path d="M88 52 L100 68 L112 52" stroke={light} strokeWidth="1.5" fill="none" />
        {/* Center line */}
        <line x1="100" y1="68" x2="100" y2="185" stroke="rgba(201,169,110,0.3)" strokeWidth="1" />
        {/* Pants/churidar */}
        <path d="M78 178 L72 245 L88 245 L100 200 L112 245 L128 245 L122 178 Z" fill={accent} opacity="0.6" />
        {/* Embroidery neckline */}
        <circle cx="92" cy="62" r="1.5" fill="rgba(201,169,110,0.5)" />
        <circle cx="108" cy="62" r="1.5" fill="rgba(201,169,110,0.5)" />
        <circle cx="100" cy="58" r="1.5" fill="rgba(201,169,110,0.5)" />
      </svg>
    )
  }

  if (product.subcategory === "dress" || product.subcategory === "gown") {
    return (
      <svg viewBox="0 0 200 260" fill="none" className="w-full h-full drop-shadow-lg">
        <ellipse cx="100" cy="38" rx="16" ry="18" fill={light} />
        {/* Fitted bodice */}
        <path d="M84 52 L70 62 L65 72 L72 72 L78 65 L80 100 L60 210 C60 215 75 220 100 222 C125 220 140 215 140 210 L120 100 L122 65 L128 72 L135 72 L130 62 L116 52 Z" fill={accent} opacity="0.85" />
        {/* Waist cinch */}
        <path d="M80 100 Q100 92 120 100" stroke="rgba(201,169,110,0.5)" strokeWidth="2" fill="none" />
        {/* Skirt flow lines */}
        <path d="M85 110 L68 205" stroke={light} strokeWidth="0.8" />
        <path d="M115 110 L132 205" stroke={light} strokeWidth="0.8" />
        {/* Neckline */}
        <path d="M88 52 Q100 62 112 52" stroke={light} strokeWidth="1.5" fill="none" />
        {/* Hem sparkle */}
        <circle cx="75" cy="210" r="1.5" fill="rgba(201,169,110,0.4)" />
        <circle cx="100" cy="218" r="1.5" fill="rgba(201,169,110,0.4)" />
        <circle cx="125" cy="210" r="1.5" fill="rgba(201,169,110,0.4)" />
      </svg>
    )
  }

  if (product.subcategory === "blazer" || product.subcategory === "coord-set" || product.subcategory === "cape") {
    return (
      <svg viewBox="0 0 200 260" fill="none" className="w-full h-full drop-shadow-lg">
        <ellipse cx="100" cy="38" rx="16" ry="18" fill={light} />
        {/* Blazer */}
        <path d="M84 52 L55 68 L52 130 L78 125 L78 165 L122 165 L122 125 L148 130 L145 68 L116 52 Z" fill={accent} opacity="0.85" />
        {/* Lapels */}
        <path d="M90 52 L85 75 L100 85 L115 75 L110 52" stroke={light} strokeWidth="1.5" fill={accent} opacity="0.7" />
        {/* Button */}
        <circle cx="100" cy="100" r="3" fill="rgba(201,169,110,0.6)" />
        <circle cx="100" cy="115" r="3" fill="rgba(201,169,110,0.6)" />
        {/* Pants */}
        <path d="M78 162 L72 245 L92 245 L100 195 L108 245 L128 245 L122 162 Z" fill={accent} opacity="0.6" />
      </svg>
    )
  }

  if (product.subcategory === "jeans") {
    return (
      <svg viewBox="0 0 200 260" fill="none" className="w-full h-full drop-shadow-lg">
        <ellipse cx="100" cy="38" rx="16" ry="18" fill={light} />
        {/* Top */}
        <path d="M84 52 L78 65 L78 120 L122 120 L122 65 L116 52 Z" fill={light} opacity="0.4" />
        {/* Jeans */}
        <path d="M74 115 L68 245 L92 245 L100 180 L108 245 L132 245 L126 115 Z" fill={accent} opacity="0.85" />
        {/* Waistband */}
        <path d="M74 115 L126 115" stroke="rgba(201,169,110,0.4)" strokeWidth="3" />
        {/* Pocket lines */}
        <path d="M82 120 L78 140 L88 138" stroke={light} strokeWidth="1" fill="none" />
        <path d="M118 120 L122 140 L112 138" stroke={light} strokeWidth="1" fill="none" />
        {/* Center seam */}
        <line x1="100" y1="115" x2="100" y2="180" stroke={light} strokeWidth="0.8" />
      </svg>
    )
  }

  // Default: generic outfit silhouette
  return (
    <svg viewBox="0 0 200 260" fill="none" className="w-full h-full drop-shadow-lg">
      <ellipse cx="100" cy="38" rx="16" ry="18" fill={light} />
      <path d="M84 52 L70 65 L68 90 L78 85 L76 200 C76 205 85 210 100 212 C115 210 124 205 124 200 L122 85 L132 90 L130 65 L116 52 Z" fill={accent} opacity="0.85" />
      <path d="M88 52 L100 65 L112 52" stroke={light} strokeWidth="1.5" fill="none" />
      <path d="M78 95 Q100 88 122 95" stroke="rgba(201,169,110,0.4)" strokeWidth="1.5" fill="none" />
      <circle cx="95" cy="110" r="2" fill={light} />
      <circle cx="105" cy="125" r="2" fill={light} />
    </svg>
  )
}

/* Fabric texture overlay */
function PatternOverlay({ pattern }: { pattern: string }) {
  if (pattern === "embroidered") {
    return (
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="emb" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="15" cy="15" r="1.5" fill="rgba(201,169,110,0.5)" />
              <circle cx="5" cy="5" r="1" fill="rgba(201,169,110,0.3)" />
              <circle cx="25" cy="5" r="1" fill="rgba(201,169,110,0.3)" />
              <circle cx="5" cy="25" r="1" fill="rgba(201,169,110,0.3)" />
              <circle cx="25" cy="25" r="1" fill="rgba(201,169,110,0.3)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#emb)" />
        </svg>
      </div>
    )
  }
  if (pattern === "printed") {
    return (
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 14px)",
      }} />
    )
  }
  if (pattern === "sequined") {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 animate-pulse" style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0) 70%)",
          backgroundSize: "200% 200%",
        }} />
      </div>
    )
  }
  return null
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { openModal } = useTryOnStore()
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919479800674"

  const handleWhatsApp = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      const message = encodeURIComponent(
        `Hi! I'm interested in *${product.name}* (${formatPrice(product.price)}) from Trends Boutique.\n\nSizes: ${product.sizes.join(", ")}\nColors: ${product.colors.join(", ")}\n\nPlease share more details! 🙏`
      )
      window.open(`https://wa.me/${number}?text=${message}`, "_blank")
    },
    [product, number]
  )

  const handleTryOn = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      openModal(product)
    },
    [product, openModal]
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="group relative rounded-2xl overflow-hidden bg-[#161616] border border-[rgba(201,169,110,0.08)] hover:border-[rgba(201,169,110,0.4)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(201,169,110,0.15)]"
    >
      {/* Product Visual with SVG illustration */}
      <div className="relative w-full aspect-[3/4] overflow-hidden" style={{ background: `linear-gradient(160deg, ${product.cssColor}22 0%, ${product.cssColor}44 40%, ${product.cssColor}66 100%)` }}>
        
        {/* Pattern overlay */}
        <PatternOverlay pattern={product.patternType} />

        {/* SVG Clothing Illustration */}
        <div className="absolute inset-0 flex items-center justify-center p-6 pt-4 pb-8">
          <ClothingSVG product={product} />
        </div>

        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.3)_100%)]" />

        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {product.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${tagColors[tag] ?? "bg-white/20 text-white"}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Sale badge */}
        {product.originalPrice && (
          <div className="absolute top-3 right-3 z-10 bg-[#FF5722] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}

        {/* Hover buttons overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20 p-3 pt-8 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
          <div className="flex flex-col gap-2">
            <button
              onClick={handleTryOn}
              id={`try-on-${product.id}`}
              className="w-full flex items-center justify-center gap-2 bg-[#C9A96E] text-black font-semibold text-sm py-3 rounded-xl hover:bg-[#E8C98A] transition-colors active:scale-95"
            >
              <Sparkles size={14} />
              Try On AI ✨
            </button>
            <button
              onClick={handleWhatsApp}
              id={`wa-order-${product.id}`}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold text-sm py-3 rounded-xl hover:bg-[#1ebe5d] transition-colors active:scale-95"
            >
              <MessageCircle size={14} />
              WhatsApp Order
            </button>
          </div>
        </div>
      </div>

      {/* Product Info — better spacing */}
      <div className="p-4 pt-3.5 space-y-2">
        <div>
          <h3 className="font-display text-[15px] font-semibold text-[#F5F5F0] leading-snug line-clamp-1">
            {product.name}
          </h3>
          <p className="text-[rgba(245,245,240,0.45)] text-[11px] mt-0.5 tracking-wide uppercase">
            {product.fabric} • {product.occasion}
          </p>
        </div>

        <StarRating rating={product.rating} reviewCount={product.reviewCount} />

        {/* Colors + Sizes row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            {product.colors.slice(0, 4).map((color) => (
              <div
                key={color}
                title={color}
                className="w-4 h-4 rounded-full border border-white/15"
                style={{ backgroundColor: colorMap[color] ?? "#888" }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-[rgba(245,245,240,0.35)] ml-0.5">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
          <div className="flex items-center gap-0.5">
            {product.sizes.slice(0, 4).map((s) => (
              <span key={s} className="text-[9px] px-1.5 py-0.5 rounded bg-[rgba(201,169,110,0.08)] text-[rgba(245,245,240,0.5)] border border-[rgba(201,169,110,0.1)]">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Price row */}
        <div className="flex items-center justify-between pt-1.5 border-t border-[rgba(201,169,110,0.08)]">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-bold text-[#C9A96E]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[rgba(245,245,240,0.35)] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <div className={`w-1.5 h-1.5 rounded-full ${product.inStock ? "bg-[#4CAF50]" : "bg-[#f44336]"}`} />
            <span className="text-[10px] text-[rgba(245,245,240,0.4)]">
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
