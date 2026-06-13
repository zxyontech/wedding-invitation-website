"use client"

import { useEffect, useState } from "react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { weddingData } from "@/lib/wedding-data"

function getTimeLeft(target: number) {
  const diff = Math.max(0, target - Date.now())
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function Countdown() {
  const target = new Date(weddingData.weddingDate).getTime()
  const [time, setTime] = useState(() => getTimeLeft(target))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => setTime(getTimeLeft(target)), 1000)
    return () => clearInterval(interval)
  }, [target])

  const units = [
    { label: "Hari", value: time.days },
    { label: "Jam", value: time.hours },
    { label: "Menit", value: time.minutes },
    { label: "Detik", value: time.seconds },
  ]

  return (
    <section id="countdown" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="Menuju Hari Bahagia" title="Hitung Mundur" />

        <Reveal className="mt-14">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {units.map((unit) => (
              <div
                key={unit.label}
                className="flex flex-col items-center rounded-2xl border border-border bg-card px-4 py-8 shadow-sm"
              >
                <span className="font-serif text-5xl font-light tabular-nums text-primary md:text-6xl">
                  {mounted ? String(unit.value).padStart(2, "0") : "--"}
                </span>
                <span className="mt-2 text-xs uppercase tracking-luxe text-muted-foreground">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
