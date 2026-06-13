"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) throw error

        if (data?.session) {
          // Redirect ke dashboard setelah login berhasil
          router.push("/dashboard")
        } else {
          // Redirect ke login jika session tidak ada
          router.push("/login")
        }
      } catch (error) {
        console.error("Auth callback error:", error)
        router.push("/login")
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Memproses login...</p>
      </div>
    </div>
  )
}
