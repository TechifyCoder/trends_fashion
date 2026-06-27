"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, RotateCcw, Copy, MessageCircle, AlertCircle, X } from "lucide-react"
import { useTryOnStore } from "@/hooks/useTryOn"
import { type Product } from "@/types/product"
import { type ModelType } from "@/types/tryon"
import { formatPrice } from "@/lib/utils"
import { getSimilarProducts } from "@/lib/products"
import StarRating from "@/components/shared/StarRating"

const MODEL_AVATARS: { id: ModelType; label: string; figure: string; image?: string }[] = [
  { id: "woman-young", label: "Young Woman", figure: "👩", image: "/models/woman-young.png" },
  { id: "woman-middle", label: "Mid-Age Woman", figure: "👩‍🦳", image: "/models/woman-middle.png" },
  { id: "woman-elderly", label: "Elder Woman", figure: "👵", image: "/models/woman-elderly.png" },
  { id: "man-young", label: "Young Man", figure: "👨", image: "/models/man-young.png" },
  { id: "man-middle", label: "Mid-Age Man", figure: "👨‍🦳" },
  { id: "man-elderly", label: "Elder Man", figure: "👴" },
  { id: "girl-child", label: "Young Girl", figure: "👧", image: "/models/girl-child.png" },
  { id: "boy-child", label: "Young Boy", figure: "👦", image: "/models/boy-child.png" },
]

const patternClass: Record<string, string> = {
  solid: "",
  printed: "pattern-printed",
  embroidered: "pattern-embroidered",
  sequined: "pattern-sequined",
}

function MarkdownRenderer({ text }: { text: string }) {
  const lines = text.split("\n")
  return (
    <div className="space-y-3 text-sm leading-relaxed">
      {lines.map((line, i) => {
        if (line.startsWith("## ")) {
          return (
            <h3 key={i} className="font-display text-xl text-[#C9A96E] font-semibold mt-6 first:mt-0">
              {line.replace("## ", "")}
            </h3>
          )
        }
        if (line.startsWith("**") && line.endsWith("**")) {
          return <p key={i} className="font-semibold text-[#F5F5F0]">{line.replace(/\*\*/g, "")}</p>
        }
        if (line.startsWith("- ") || line.startsWith("• ")) {
          return (
            <div key={i} className="flex gap-2 text-[rgba(245,245,240,0.8)]">
              <span className="text-[#C9A96E] flex-shrink-0 mt-0.5">✦</span>
              <span>{line.replace(/^[•\-]\s/, "")}</span>
            </div>
          )
        }
        if (line.match(/^\d+\./)) {
          return (
            <div key={i} className="flex gap-2 text-[rgba(245,245,240,0.8)]">
              <span className="text-[#C9A96E] font-semibold flex-shrink-0">{line.split(".")[0]}.</span>
              <span>{line.replace(/^\d+\.\s/, "")}</span>
            </div>
          )
        }
        if (line.trim() === "") return <div key={i} className="h-1" />
        return <p key={i} className="text-[rgba(245,245,240,0.75)]">{line}</p>
      })}
    </div>
  )
}

export default function VirtualTryOn() {
  const {
    selectedProduct,
    selectedModel,
    customDescription,
    result,
    isLoading,
    error,
    isOpen,
    setModel,
    setDescription,
    generate,
    reset,
    closeModal,
  } = useTryOnStore()
  const [copied, setCopied] = useState(false)
  const WHATSAPP_NUM = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919479800674"

  const handleCopy = useCallback(() => {
    if (result) {
      navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [result])

  const handleWhatsAppShare = useCallback(() => {
    if (!selectedProduct) return
    const msg = encodeURIComponent(
      `Hi Trends Boutique! I tried on *${selectedProduct.name}* (${formatPrice(selectedProduct.price)}) using your AI Try-On. I'd like to know more! 📍 Rajwada Indore`
    )
    window.open(`https://wa.me/${WHATSAPP_NUM}?text=${msg}`, "_blank")
  }, [selectedProduct, WHATSAPP_NUM])

  const similar = selectedProduct ? getSimilarProducts(selectedProduct, 3) : []

  return (
    <>
      {/* Section (Homepage Teaser) */}
      <section id="try-on" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(201,169,110,0.06)_0%,transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-[rgba(201,169,110,0.1)] border border-[rgba(201,169,110,0.3)] rounded-full px-4 py-1.5 mb-4"
            >
              <Sparkles size={14} className="text-[#C9A96E]" />
              <span className="text-[#C9A96E] text-sm font-medium">AI-Powered Feature</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold text-[#F5F5F0] mb-4"
            >
              Virtual Try-On
            </motion.h2>
            <p className="text-[rgba(245,245,240,0.55)] max-w-xl mx-auto">
              Select any product and let our AI stylist describe exactly how it will look on you — with styling tips, accessories, and more.
            </p>
          </div>

          {/* Promo cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {[
              { icon: "🧥", title: "Select a Product", desc: "Browse our catalog and click 'Try On AI'" },
              { icon: "👤", title: "Choose Your Model", desc: "Pick from 8 avatar types matching your profile" },
              { icon: "✨", title: "Get AI Styling", desc: "Receive detailed outfit visualization & tips" },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="glass rounded-2xl p-6 text-center"
              >
                <div className="text-4xl mb-3">{step.icon}</div>
                <h3 className="font-display text-lg text-[#F5F5F0] mb-1">{step.title}</h3>
                <p className="text-sm text-[rgba(245,245,240,0.5)]">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-[rgba(245,245,240,0.4)]">
              📍 AI describes how the outfit may look. Visit our store for the real experience! — Near Rajwada Chowk, Indore
            </p>
          </div>
        </div>
      </section>

      {/* Try-On Modal */}
      <AnimatePresence>
        {isOpen && selectedProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-4 md:inset-8 z-50 bg-[#111] rounded-3xl border border-[rgba(201,169,110,0.2)] overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-5 border-b border-[rgba(201,169,110,0.1)] flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-[#C9A96E]" />
                  <span className="font-display text-lg text-[#F5F5F0]">AI Virtual Try-On</span>
                </div>
                <button
                  onClick={closeModal}
                  id="tryon-modal-close"
                  className="w-8 h-8 rounded-full bg-[rgba(245,245,240,0.05)] flex items-center justify-center hover:bg-[rgba(245,245,240,0.1)] transition-colors"
                >
                  <X size={16} className="text-[rgba(245,245,240,0.6)]" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col md:flex-row h-full">
                  {/* Left Panel: Product + Model selector */}
                  <div className="md:w-80 flex-shrink-0 p-5 border-b md:border-b-0 md:border-r border-[rgba(201,169,110,0.1)] space-y-5">
                    {/* Product Visual */}
                    <div
                      className={`relative w-full aspect-[3/4] rounded-2xl overflow-hidden ${patternClass[selectedProduct.patternType]}`}
                      style={{ backgroundColor: selectedProduct.cssColor }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>

                    <div>
                      <h3 className="font-display text-lg text-[#F5F5F0] font-semibold">
                        {selectedProduct.name}
                      </h3>
                      <p className="text-sm text-[rgba(245,245,240,0.5)]">{selectedProduct.fabric}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-[#C9A96E] font-semibold">{formatPrice(selectedProduct.price)}</span>
                        <StarRating rating={selectedProduct.rating} />
                      </div>
                    </div>

                    {/* Model selector */}
                    <div>
                      <p className="text-xs text-[#C9A96E] uppercase tracking-widest mb-3 font-semibold">
                        Choose Model Type
                      </p>
                      <div className="grid grid-cols-4 gap-2">
                        {MODEL_AVATARS.map((avatar) => (
                          <button
                            key={avatar.id}
                            id={`model-${avatar.id}`}
                            onClick={() => setModel(avatar.id)}
                            title={avatar.label}
                            className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all duration-200 ${
                              selectedModel === avatar.id
                                ? "border-[#C9A96E] bg-[rgba(201,169,110,0.15)] shadow-[0_0_12px_rgba(201,169,110,0.2)]"
                                : "border-[rgba(245,245,240,0.08)] hover:border-[rgba(201,169,110,0.3)]"
                            }`}
                          >
                            {avatar.image ? (
                              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent transition-all duration-200"
                                style={selectedModel === avatar.id ? { borderColor: "#C9A96E" } : {}}
                              >
                                <img
                                  src={avatar.image}
                                  alt={avatar.label}
                                  className="w-full h-full object-cover object-top"
                                />
                              </div>
                            ) : (
                              <span className="text-2xl">{avatar.figure}</span>
                            )}
                            <span className="text-[9px] text-[rgba(245,245,240,0.5)] text-center leading-tight">
                              {avatar.label.split(" ")[0]}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom description */}
                    <div>
                      <p className="text-xs text-[#C9A96E] uppercase tracking-widest mb-2 font-semibold">
                        Custom Request (Optional)
                      </p>
                      <textarea
                        id="tryon-custom-desc"
                        value={customDescription}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="e.g. tall slim woman, plus-size, teenage girl..."
                        className="w-full h-20 bg-[#1a1a1a] border border-[rgba(201,169,110,0.2)] rounded-xl px-3 py-2 text-sm text-[#F5F5F0] placeholder:text-[rgba(245,245,240,0.25)] resize-none outline-none focus:border-[rgba(201,169,110,0.5)]"
                      />
                    </div>

                    {/* Generate button */}
                    <button
                      id="generate-tryon-btn"
                      onClick={generate}
                      disabled={!selectedModel || isLoading}
                      className="w-full py-3.5 bg-[#C9A96E] text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:bg-[#E8C98A] disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <div className="spin-ring !w-5 !h-5 !border-2" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles size={16} />
                          Generate Try-On
                        </>
                      )}
                    </button>

                    {!selectedModel && (
                      <p className="text-xs text-center text-[rgba(245,245,240,0.35)]">
                        Please select a model type above
                      </p>
                    )}
                  </div>

                  {/* Right Panel: AI Result */}
                  <div className="flex-1 p-5 overflow-y-auto">
                    {/* Initial state */}
                    {!result && !isLoading && !error && (
                      <div className="h-full flex flex-col items-center justify-center text-center py-12">
                        <div className="text-6xl mb-5">✨</div>
                        <h3 className="font-display text-2xl text-[#F5F5F0] mb-2">
                          Ready to Try On?
                        </h3>
                        <p className="text-[rgba(245,245,240,0.45)] text-sm max-w-xs">
                          Select a model type on the left, then click "Generate Try-On" for your AI styling consultation.
                        </p>
                        <div className="mt-6 p-4 bg-[rgba(201,169,110,0.06)] border border-[rgba(201,169,110,0.15)] rounded-2xl text-sm text-[rgba(245,245,240,0.5)] max-w-sm">
                          📍 AI describes how the outfit may look. Visit our store at Rajwada Chowk, Indore for the real experience!
                        </div>
                      </div>
                    )}

                    {/* Loading */}
                    {isLoading && (
                      <div className="h-full flex flex-col items-center justify-center py-12 space-y-5">
                        <div className="spin-ring" />
                        <div className="text-center">
                          <p className="text-[#C9A96E] font-display text-xl mb-1">AI Styling in Progress...</p>
                          <p className="text-[rgba(245,245,240,0.45)] text-sm">
                            Our fashion AI is crafting your personalized look
                          </p>
                        </div>
                        {/* Shimmer placeholders */}
                        <div className="w-full max-w-lg space-y-3">
                          {[80, 60, 90, 50, 70].map((w, i) => (
                            <div key={i} className={`h-4 rounded shimmer-loading`} style={{ width: `${w}%` }} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Error */}
                    {error && !isLoading && (
                      <div className="h-full flex flex-col items-center justify-center py-12 text-center">
                        <AlertCircle size={40} className="text-[#ef4444] mb-3" />
                        <h3 className="font-display text-xl text-[#F5F5F0] mb-2">Oops! Kuch galat hua</h3>
                        <p className="text-[rgba(245,245,240,0.5)] text-sm mb-5 max-w-xs">{error}</p>
                        <button
                          onClick={generate}
                          className="px-6 py-2.5 bg-[#C9A96E] text-black rounded-xl font-semibold text-sm flex items-center gap-2"
                        >
                          <RotateCcw size={14} />
                          Try Again
                        </button>
                      </div>
                    )}

                    {/* Result */}
                    {result && !isLoading && (
                      <div className="space-y-6">
                        {/* Action buttons */}
                        <div className="flex flex-wrap gap-2 pb-4 border-b border-[rgba(201,169,110,0.1)]">
                          <button
                            onClick={handleCopy}
                            id="copy-result-btn"
                            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[rgba(245,245,240,0.06)] text-[rgba(245,245,240,0.6)] hover:bg-[rgba(245,245,240,0.1)] transition-colors"
                          >
                            <Copy size={12} />
                            {copied ? "Copied!" : "Copy"}
                          </button>
                          <button
                            onClick={handleWhatsAppShare}
                            id="whatsapp-tryon-share"
                            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[rgba(37,211,102,0.1)] text-[#25D366] hover:bg-[rgba(37,211,102,0.2)] transition-colors"
                          >
                            <MessageCircle size={12} />
                            WhatsApp to Seller
                          </button>
                          <button
                            onClick={reset}
                            id="try-another-btn"
                            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[rgba(201,169,110,0.1)] text-[#C9A96E] hover:bg-[rgba(201,169,110,0.2)] transition-colors"
                          >
                            <RotateCcw size={12} />
                            Try Another Model
                          </button>
                        </div>

                        {/* AI Response */}
                        <MarkdownRenderer text={result} />

                        {/* Similar products */}
                        {similar.length > 0 && (
                          <div className="pt-4 border-t border-[rgba(201,169,110,0.1)]">
                            <h4 className="text-[#C9A96E] text-xs uppercase tracking-widest font-semibold mb-3">
                              Similar Products
                            </h4>
                            <div className="flex gap-3 overflow-x-auto pb-2">
                              {similar.map((p) => (
                                <div
                                  key={p.id}
                                  className="flex-shrink-0 w-28 rounded-xl overflow-hidden border border-[rgba(201,169,110,0.1)] cursor-pointer hover:border-[rgba(201,169,110,0.3)] transition-colors"
                                  onClick={() => useTryOnStore.getState().openModal(p)}
                                >
                                  <div
                                    className="w-full aspect-square"
                                    style={{ backgroundColor: p.cssColor }}
                                  />
                                  <div className="p-2">
                                    <p className="text-[10px] text-[rgba(245,245,240,0.7)] line-clamp-1">{p.name}</p>
                                    <p className="text-[10px] text-[#C9A96E]">{formatPrice(p.price)}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <p className="text-xs text-[rgba(245,245,240,0.3)] text-center border-t border-[rgba(201,169,110,0.1)] pt-4">
                          📍 AI describes how the outfit may look. Visit our store for the real experience! — Near Rajwada Chowk, Indore
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
