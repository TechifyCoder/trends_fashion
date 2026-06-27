"use client"

import { useAdminStore } from "@/lib/admin-store"
import AdminLogin from "@/components/admin/AdminLogin"
import AdminPanel from "@/components/admin/AdminPanel"

export default function AdminPage() {
  const isLoggedIn = useAdminStore((s) => s.isLoggedIn)

  if (!isLoggedIn) {
    return <AdminLogin />
  }

  return <AdminPanel />
}
