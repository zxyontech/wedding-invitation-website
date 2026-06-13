"use client"

import { useState } from "react"
import { Send, MessageCircleHeart } from "lucide-react"
import { toast } from "sonner"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { weddingData } from "@/lib/wedding-data"

type Attendance = "hadir" | "tidak" | ""

interface Wish {
  name: string
  message: string
}

export function RsvpWishes() {
  const [wishes, setWishes] = useState<Wish[]>(weddingData.initialWishes)
  const [name, setName] = useState("")
  const [guests, setGuests] = useState("1")
  const [attendance, setAttendance] = useState<Attendance>("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const validate = () => {
    const next: Record<string, string> = {}
    if (!name.trim()) next.name = "Nama wajib diisi"
    if (!attendance) next.attendance = "Pilih konfirmasi kehadiran"
    if (!message.trim()) next.message = "Ucapan tidak boleh kosong"
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          guests: parseInt(guests),
          attendance,
          message: message.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit RSVP")
      }

      setWishes((prev) => [{ name: name.trim(), message: message.trim() }, ...prev])
      toast.success("Terima kasih atas ucapan dan konfirmasinya!")
      setName("")
      setGuests("1")
      setAttendance("")
      setMessage("")
      setErrors({})
    } catch (error) {
      console.error("Error submitting RSVP:", error)
      toast.error("Gagal mengirim RSVP. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="rsvp" className="bg-secondary/40 px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* RSVP Form */}
        <div>
          <SectionHeading
            eyebrow="Konfirmasi Kehadiran"
            title="RSVP"
            className="items-start text-left"
          />
          <Reveal className="mt-10">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
              noValidate
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama Anda"
                  aria-invalid={!!errors.name}
                />
                {errors.name ? (
                  <span className="text-xs text-destructive">{errors.name}</span>
                ) : null}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="guests">Jumlah Tamu</Label>
                <select
                  id="guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} Orang
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Konfirmasi Kehadiran</Label>
                <div className="flex gap-3">
                  {[
                    { value: "hadir", label: "Hadir" },
                    { value: "tidak", label: "Tidak Hadir" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setAttendance(opt.value as Attendance)}
                      className={`flex-1 rounded-md border px-4 py-2.5 text-sm transition-colors ${
                        attendance === opt.value
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input text-foreground hover:border-primary"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {errors.attendance ? (
                  <span className="text-xs text-destructive">
                    {errors.attendance}
                  </span>
                ) : null}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="message">Pesan / Ucapan</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan ucapan dan doa Anda..."
                  rows={4}
                  aria-invalid={!!errors.message}
                />
                {errors.message ? (
                  <span className="text-xs text-destructive">
                    {errors.message}
                  </span>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="size-4" />
                {isLoading ? "Mengirim..." : "Kirim"}
              </button>
            </form>
          </Reveal>
        </div>

        {/* Wishes */}
        <div>
          <SectionHeading
            eyebrow="Doa & Harapan"
            title="Ucapan"
            className="items-start text-left"
          />
          <Reveal className="mt-10">
            <div className="flex max-h-[520px] flex-col gap-4 overflow-y-auto pr-2">
              {wishes.map((wish, index) => (
                <div
                  key={`${wish.name}-${index}`}
                  className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <span className="font-serif text-lg">
                      {wish.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{wish.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {wish.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 flex items-center justify-center gap-2 text-xs uppercase tracking-luxe text-muted-foreground">
              <MessageCircleHeart className="size-4 text-primary" />
              {wishes.length} Ucapan
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
