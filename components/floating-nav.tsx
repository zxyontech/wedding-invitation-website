"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Heart, CalendarHeart, Users, Clock, Images, Gift, MailOpen } from "lucide-react"

const NAV_ITEMS = [
  { id: "beranda", label: "Beranda", icon: Heart },
  { id: "mempelai", label: "Mempelai", icon: Users },
  { id: "cerita", label: "Kisah", icon: CalendarHeart },
  { id: "countdown", label: "Countdown", icon: Clock },
  { id: "galeri", label: "Galeri", icon: Images },
  { id: "hadiah", label: "Hadiah", icon: Gift },
  { id: "rsvp", label: "RSVP", icon: MailOpen },
]

export function FloatingNav({ visible }: { visible: boolean }) {
  const [active, setActive] = useState("beranda")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: "-45% 0px -45% 0px" },
    )
    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.nav
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-5 left-1/2 z-[80] -translate-x-1/2"
          aria-label="Navigasi utama"
        >
          <ul className="flex items-center gap-1 rounded-full border border-border bg-card/90 px-2 py-2 shadow-lg backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    aria-label={item.label}
                    aria-current={isActive ? "true" : undefined}
                    className={`flex size-10 items-center justify-center rounded-full transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <Icon className="size-4" />
                  </button>
                </li>
              )
            })}
          </ul>
        </motion.nav>
      ) : null}
    </AnimatePresence>
  )
}
