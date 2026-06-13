"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Music, Pause } from "lucide-react"

interface MusicPlayerProps {
  /** play is triggered externally when the invitation is opened */
  shouldPlay: boolean
}

export function MusicPlayer({ shouldPlay }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (shouldPlay && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false))
    }
  }, [shouldPlay])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  return (
    <>
      {/* Replace /audio/background.mp3 with your own track */}
      <audio ref={audioRef} src="/music/wedding.aac" loop preload="none" />
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={toggle}
        aria-label={playing ? "Jeda musik" : "Putar musik"}
        aria-pressed={playing}
        className="fixed right-5 top-5 z-[80] flex size-11 items-center justify-center rounded-full border border-border bg-card/90 text-primary shadow-lg backdrop-blur-md transition-colors hover:bg-card"
      >
        {playing ? (
          <Pause className="size-4" />
        ) : (
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="flex"
          >
            <Music className="size-4" />
          </motion.span>
        )}
      </motion.button>
    </>
  )
}
