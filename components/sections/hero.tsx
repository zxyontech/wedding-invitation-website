"use client"

import { motion } from "framer-motion"
import { ChevronDown, Mail } from "lucide-react"
import { weddingData } from "@/lib/wedding-data"

interface HeroProps {
  onOpen: () => void
  opened: boolean
}

export function Hero({ onOpen, opened }: HeroProps) {
  const { couple, weddingDate } = weddingData
  const dateLabel = new Date(weddingDate).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <section
      id="beranda"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src="/images/foto_wedding1.jpeg"
          alt="Foto pasangan mempelai"
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-transparent to-background/80" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs uppercase tracking-luxe text-background/90"
        >
          The Wedding Of
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-serif text-6xl font-light leading-none text-background md:text-8xl"
        >
          {couple.groom.shortName}
          <span className="mx-3 italic text-background/80 md:mx-5">&</span>
          {couple.bride.shortName}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="my-8 h-px w-40 bg-background/50"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="text-base uppercase tracking-widest text-background/90 md:text-lg"
        >
          {dateLabel}
        </motion.p>

        {!opened ? (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            onClick={onOpen}
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-background/95 px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-foreground shadow-lg transition-all hover:bg-background hover:shadow-xl"
          >
            <Mail className="size-4 text-primary transition-transform group-hover:-translate-y-0.5" />
            Buka Undangan
          </motion.button>
        ) : null}
      </div>

      {opened ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="flex flex-col items-center gap-2 text-background/80"
          >
            <span className="text-[10px] uppercase tracking-luxe">Scroll</span>
            <ChevronDown className="size-5" />
          </motion.div>
        </motion.div>
      ) : null}
    </section>
  )
}
