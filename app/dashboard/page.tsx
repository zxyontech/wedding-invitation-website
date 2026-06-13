"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { LogOut, Download } from "lucide-react"
import { toast } from "sonner"

interface RSVPData {
  id: number
  name: string
  guests: number
  attendance: "hadir" | "tidak"
  message: string
  created_at: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [rsvpList, setRsvpList] = useState<RSVPData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({ hadir: 0, tidak: 0, totalGuests: 0 })

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const { data, error } = await supabase.auth.getSession()

      if (error || !data?.session) {
        router.push("/login")
        return
      }

      setUser({ email: data.session.user.email || "" })
      fetchRSVPData()
    } catch (error) {
      console.error("Auth check error:", error)
      router.push("/login")
    }
  }

  const fetchRSVPData = async () => {
    try {
      const { data, error } = await supabase
        .from("rsvp_submissions")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error

      setRsvpList(data || [])
      calculateStats(data || [])
    } catch (error) {
      console.error("Fetch error:", error)
      toast.error("Gagal memuat data RSVP")
    } finally {
      setIsLoading(false)
    }
  }

  const calculateStats = (data: RSVPData[]) => {
    const hadir = data.filter((item) => item.attendance === "hadir").length
    const tidak = data.filter((item) => item.attendance === "tidak").length
    const totalGuests = data.reduce((sum, item) => sum + item.guests, 0)

    setStats({ hadir, tidak, totalGuests })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  const exportCSV = () => {
    const csv = [
      ["Nama", "Jumlah Tamu", "Kehadiran", "Pesan", "Tanggal"],
      ...rsvpList.map((item) => [
        item.name,
        item.guests,
        item.attendance === "hadir" ? "Hadir" : "Tidak Hadir",
        item.message,
        new Date(item.created_at).toLocaleDateString("id-ID"),
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "rsvp_data.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition"
          >
            <LogOut className="size-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total RSVP" value={rsvpList.length} color="blue" />
          <StatCard label="Hadir" value={stats.hadir} color="green" />
          <StatCard label="Tidak Hadir" value={stats.tidak} color="red" />
          <StatCard label="Total Tamu" value={stats.totalGuests} color="purple" />
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={fetchRSVPData}
            className="px-4 py-2 rounded-lg border border-border hover:bg-accent transition font-medium"
          >
            🔄 Refresh
          </button>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition font-medium"
          >
            <Download className="size-4" />
            Export CSV
          </button>
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-accent border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">No</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Nama</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Tamu</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Pesan</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {rsvpList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                      Belum ada RSVP masuk
                    </td>
                  </tr>
                ) : (
                  rsvpList.map((item, idx) => (
                    <tr key={item.id} className="border-b border-border hover:bg-accent/50 transition">
                      <td className="px-6 py-4 text-sm text-muted-foreground">{idx + 1}</td>
                      <td className="px-6 py-4 text-sm font-medium">{item.name}</td>
                      <td className="px-6 py-4 text-sm">{item.guests} orang</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            item.attendance === "hadir"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                          }`}
                        >
                          {item.attendance === "hadir" ? "✓ Hadir" : "✗ Tidak Hadir"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs truncate">
                        {item.message}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground whitespace-nowrap">
                        {new Date(item.created_at).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string
  value: number
  color: "blue" | "green" | "red" | "purple"
}) {
  const colorClasses = {
    blue: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100",
    green: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100",
    red: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100",
    purple: "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-100",
  }

  return (
    <div className={`rounded-lg border p-6 ${colorClasses[color]}`}>
      <p className="text-sm font-medium opacity-75">{label}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  )
}
