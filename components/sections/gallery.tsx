"use client"

import { useState, useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { SectionHeading } from "@/components/section-heading"
import { weddingData } from "@/lib/wedding-data"

export function Gallery() {
  const { gallery } = weddingData
  const [active, setActive] = useState<number | null>(null)
  const [paused, setPaused] = useState(false)

  const repeated = [...gallery, ...gallery, ...gallery]

  const close = useCallback(() => setActive(null), [])
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % gallery.length)),
    [gallery.length],
  )
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + gallery.length) % gallery.length)),
    [gallery.length],
  )

  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [active, close, next, prev])

  return (
    <section id="galeri" className="bg-secondary/40 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Momen Indah" title="Galeri Foto" />
      </div>

      <div
        className="relative mt-14 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-secondary/40 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-secondary/40 to-transparent" />

        <div
          className="flex gap-4"
          style={{
            width: "max-content",
            animation: `scroll-gallery ${gallery.length * 4}s linear infinite`,
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {repeated.map((src, index) => (
            <button
              key={`${src}-${index}`}
              onClick={() => setActive(index % gallery.length)}
              className="group relative size-64 flex-none overflow-hidden rounded-xl border border-border shadow-sm focus:outline-none focus:ring-2 focus:ring-primary md:size-72"
              aria-label={`Buka foto ${(index % gallery.length) + 1}`}
            >
              <img
                src={src || "/placeholder.svg"}
                alt={`Galeri foto ${(index % gallery.length) + 1}`}
                className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/10" />
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-center text-xs uppercase tracking-widest text-muted-foreground">
        Hover untuk berhenti
      </p>

      <AnimatePresence>
        {active !== null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/90 p-4"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute right-5 top-5 rounded-full bg-background/15 p-2 text-background transition-colors hover:bg-background/25"
              aria-label="Tutup"
            >
              <X className="size-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-3 rounded-full bg-background/15 p-2 text-background transition-colors hover:bg-background/25 md:left-8"
              aria-label="Sebelumnya"
            >
              <ChevronLeft className="size-7" />
            </button>
            <motion.img
              key={active}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              src={gallery[active] || "/placeholder.svg"}
              alt={`Galeri foto ${active + 1}`}
              className="max-h-[85vh] max-w-full rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-3 rounded-full bg-background/15 p-2 text-background transition-colors hover:bg-background/25 md:right-8"
              aria-label="Berikutnya"
            >
              <ChevronRight className="size-7" />
            </button>
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-background/20 px-4 py-1 text-xs text-background backdrop-blur-sm">
              {active + 1} / {gallery.length}
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}