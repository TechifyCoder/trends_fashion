import type { Metadata } from "next"
import Navbar from "@/components/sections/Navbar"
import ProductCatalog from "@/components/sections/ProductCatalog"
import Footer from "@/components/sections/Footer"
import WhatsAppButton from "@/components/shared/WhatsAppButton"
import VirtualTryOn from "@/components/sections/VirtualTryOn"

export const metadata: Metadata = {
  title: "Shop All Products — Trends Boutique, Indore",
  description:
    "Browse 30+ premium ethnic wear, western fusion & bridal designs. Filter by category, price, fabric, size & more. Shop sarees, lehengas, kurtis, gowns at Trends Boutique Indore.",
}

export default function ProductsPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold text-[#F5F5F0]">
            All Products
          </h1>
          <p className="text-[rgba(245,245,240,0.5)] mt-2 text-sm">
            Explore our complete collection — ethnic, western, bridal & fusion wear
          </p>
        </div>
        <ProductCatalog />
      </div>
      <VirtualTryOn />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
