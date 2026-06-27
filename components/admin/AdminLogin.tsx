"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAdminStore } from "@/lib/admin-store"
import { Lock, Eye, EyeOff } from "lucide-react"

export default function AdminLogin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const login = useAdminStore((s) => s.login)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    const success = login(username.trim().toLowerCase(), password)
    if (!success) {
      setError("Invalid username or password")
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[rgba(201,169,110,0.15)] border border-[rgba(201,169,110,0.3)] mb-4">
            <Lock size={28} className="text-[#C9A96E]" />
          </div>
          <h1 className="font-display text-3xl font-semibold text-[#F5F5F0]">Admin Panel</h1>
          <p className="text-sm text-[rgba(245,245,240,0.4)] mt-1">Trends Boutique — Management Console</p>
        </div>

        {/* Login Card */}
        <div className="bg-[#111] border border-[rgba(201,169,110,0.15)] rounded-3xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs text-[#C9A96E] uppercase tracking-widest mb-2 font-semibold">
                Username
              </label>
              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                autoComplete="username"
                className="w-full h-12 bg-[#1a1a1a] border border-[rgba(201,169,110,0.2)] rounded-xl px-4 text-[#F5F5F0] placeholder:text-[rgba(245,245,240,0.25)] outline-none focus:border-[#C9A96E] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-[#C9A96E] uppercase tracking-widest mb-2 font-semibold">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  className="w-full h-12 bg-[#1a1a1a] border border-[rgba(201,169,110,0.2)] rounded-xl px-4 pr-12 text-[#F5F5F0] placeholder:text-[rgba(245,245,240,0.25)] outline-none focus:border-[#C9A96E] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(245,245,240,0.4)] hover:text-[#C9A96E] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              id="admin-login-btn"
              className="w-full h-12 bg-[#C9A96E] text-black font-semibold rounded-xl hover:bg-[#E8C98A] transition-colors text-sm"
            >
              Login to Admin
            </button>
          </form>
        </div>

        <p className="text-center text-[rgba(245,245,240,0.25)] text-xs mt-6">
          © Trends Boutique — Rajwada, Indore
        </p>
      </motion.div>
    </div>
  )
}
