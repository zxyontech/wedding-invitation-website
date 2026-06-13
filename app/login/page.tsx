"use client"

import { useState } from "react"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      setSubmitted(true)
      toast.success("Check email untuk magic link!")
    } catch (error) {
      console.error("Login error:", error)
      toast.error("Gagal mengirim magic link")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-2">Admin Dashboard</h1>
          <p className="text-center text-muted-foreground mb-8">
            Masukkan email Anda untuk login
          </p>

          {submitted ? (
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
              <p className="text-green-800 dark:text-green-100 font-medium">
                ✅ Email terkirim!
              </p>
              <p className="text-sm text-green-700 dark:text-green-200 mt-2">
                Check email Anda dan klik magic link untuk login.
              </p>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@wedding.com"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {isLoading ? "Mengirim..." : "Kirim Magic Link"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
