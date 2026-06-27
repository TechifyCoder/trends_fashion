import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Trends Boutique — Indore ki Pehchan, Fashion ki Zuban",
  description:
    "Premium ethnic wear, western fusion & bridal collection at Rajwada Chowk, Indore. Shop sarees, lehengas, kurtis, gowns & more. AI-powered virtual try-on available.",
  keywords:
    "Trends Boutique, Indore boutique, ethnic wear Indore, lehenga Indore, saree shop, bridal collection, Rajwada Indore, fashion boutique",
  openGraph: {
    title: "Trends Boutique — Premium Fashion, Indore",
    description: "Ethnic wear, Western fusion & Bridal collection at Rajwada Chowk, Indore.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-body bg-[#0f0f0f] text-[#F5F5F0] overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
