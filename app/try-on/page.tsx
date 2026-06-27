import type { Metadata } from "next"
import Navbar from "@/components/sections/Navbar"
import VirtualTryOn from "@/components/sections/VirtualTryOn"
import Footer from "@/components/sections/Footer"
import WhatsAppButton from "@/components/shared/WhatsAppButton"

export const metadata: Metadata = {
  title: "AI Virtual Try-On — Trends Boutique, Indore",
  description:
    "Try on our outfits virtually using AI. Select any product, choose your model type, and get a detailed styling consultation powered by Google Gemini AI.",
}

export default function TryOnPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">✨</span>
            <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold text-[#F5F5F0]">
              AI Virtual Try-On
            </h1>
          </div>
          <p className="text-[rgba(245,245,240,0.5)] text-sm ml-10">
            Powered by Google Gemini — get personalized fashion styling consultations
          </p>
        </div>
        <VirtualTryOn />
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
