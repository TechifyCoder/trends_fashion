import Navbar from "@/components/sections/Navbar"
import Hero from "@/components/sections/Hero"
import Collections from "@/components/sections/Collections"
import ProductCatalog from "@/components/sections/ProductCatalog"
import VirtualTryOn from "@/components/sections/VirtualTryOn"
import About from "@/components/sections/About"
import WhyUs from "@/components/sections/WhyUs"
import Testimonials from "@/components/sections/Testimonials"
import Contact from "@/components/sections/Contact"
import Footer from "@/components/sections/Footer"
import WhatsAppButton from "@/components/shared/WhatsAppButton"

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Collections />
      <ProductCatalog />
      <VirtualTryOn />
      <About />
      <WhyUs />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
