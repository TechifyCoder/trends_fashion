import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Panel — Trends Boutique",
  description: "Manage products, reviews, and settings for Trends Boutique",
  robots: "noindex, nofollow",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
