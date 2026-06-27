"use client"

import Link from "next/link"

const FOOTER_LINKS = {
  "Quick Links": [
    { label: "Home", href: "#home" },
    { label: "Collections", href: "#collections" },
    { label: "Shop", href: "#catalog" },
    { label: "About Us", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  Collections: [
    { label: "Ethnic Wear", href: "#catalog" },
    { label: "Western Fusion", href: "#catalog" },
    { label: "Bridal Collection", href: "#catalog" },
    { label: "Fusion Wear", href: "#catalog" },
  ],
  "Customer Care": [
    { label: "AI Try-On", href: "#try-on" },
    { label: "WhatsApp Order", href: `https://wa.me/919479800674` },
    { label: "Return Policy", href: "#contact" },
    { label: "Custom Stitching", href: "#contact" },
  ],
}

const SOCIAL_ICONS = [
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Pinterest",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const scrollTo = (href: string) => {
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    } else {
      window.open(href, "_blank")
    }
  }

  return (
    <footer className="relative bg-[#080808] pt-16 pb-8">
      {/* Gold animated divider */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <div
          className="h-full w-full"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #C9A96E 30%, #E8C98A 50%, #C9A96E 70%, transparent 100%)",
            animation: "goldShimmer 4s linear infinite",
            backgroundSize: "200% 100%",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#C9A96E] flex items-center justify-center">
                <span className="font-display font-bold text-lg text-black">TB</span>
              </div>
              <div>
                <div className="font-display font-semibold text-lg text-[#F5F5F0]">Trends Boutique</div>
                <div className="text-[10px] text-[rgba(201,169,110,0.7)] tracking-wider">INDORE</div>
              </div>
            </div>
            <p className="text-sm text-[rgba(245,245,240,0.45)] leading-relaxed mb-4 max-w-xs font-display italic">
              "Indore ki Pehchan, Fashion ki Zuban"
            </p>
            <p className="text-xs text-[rgba(245,245,240,0.3)] leading-relaxed">
              Near Rajwada Chowk, Indore, MP 452001<br />
              Mon–Sun: 10:00 AM – 9:00 PM
            </p>

            {/* Social */}
            <div className="flex items-center gap-3 mt-5">
              {SOCIAL_ICONS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  id={`social-${s.name.toLowerCase()}`}
                  aria-label={s.name}
                  className="w-9 h-9 rounded-xl bg-[rgba(201,169,110,0.08)] border border-[rgba(201,169,110,0.12)] flex items-center justify-center text-[rgba(201,169,110,0.6)] hover:text-[#C9A96E] hover:bg-[rgba(201,169,110,0.15)] hover:border-[rgba(201,169,110,0.3)] transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
              <Link
                href="/admin"
                id="footer-admin-link"
                className="h-9 px-3 rounded-xl bg-[rgba(201,169,110,0.08)] border border-[rgba(201,169,110,0.12)] flex items-center justify-center gap-1.5 text-[rgba(201,169,110,0.6)] hover:text-[#C9A96E] hover:bg-[rgba(201,169,110,0.15)] hover:border-[rgba(201,169,110,0.3)] transition-all duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="text-[11px] font-medium">Admin</span>
              </Link>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[#C9A96E] text-xs font-semibold uppercase tracking-widest mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-sm text-[rgba(245,245,240,0.45)] hover:text-[rgba(245,245,240,0.8)] transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[rgba(201,169,110,0.08)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[rgba(245,245,240,0.3)]">
            © 2026 Trends Boutique. All rights reserved.
          </p>
          <p className="text-xs text-[rgba(245,245,240,0.3)]">
            Made with <span className="text-[#E91E63]">♥</span> in Indore
          </p>
        </div>
      </div>
    </footer>
  )
}
