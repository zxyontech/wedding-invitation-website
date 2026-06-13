"use client"

import { useState } from "react"
import { Hero } from "@/components/sections/hero"
import { Greeting } from "@/components/sections/greeting"
import { CoupleProfile } from "@/components/sections/couple-profile"
import { LoveStory } from "@/components/sections/love-story"
import { Countdown } from "@/components/sections/countdown"
import { EventDetails } from "@/components/sections/event-details"
import { MapsSection } from "@/components/sections/maps-section"
import { Gallery } from "@/components/sections/gallery"
import { WeddingGift } from "@/components/sections/wedding-gift"
import { RsvpWishes } from "@/components/sections/rsvp-wishes"
import { Footer } from "@/components/sections/footer"
import { ScrollProgress } from "@/components/scroll-progress"
import { FloatingNav } from "@/components/floating-nav"
import { ScrollToTop } from "@/components/scroll-to-top"
import { MusicPlayer } from "@/components/music-player"

export default function Page() {
  const [opened, setOpened] = useState(false)

  const handleOpen = () => {
    setOpened(true)
    requestAnimationFrame(() => {
      document.getElementById("pembuka")?.scrollIntoView({ behavior: "smooth" })
    })
  }

  return (
    <main className="relative">
      <ScrollProgress />
      <MusicPlayer shouldPlay={opened} />
      <FloatingNav visible={opened} />
      <ScrollToTop />

      <Hero onOpen={handleOpen} opened={opened} />

      {opened ? (
        <>
          <Greeting />
          <CoupleProfile />
          {/* <LoveStory /> */}
          <Countdown />
          <EventDetails />
          <Gallery />
          {/* <WeddingGift /> */}
          <RsvpWishes />
          {/* <MapsSection /> */}
          <Footer />
        </>
      ) : null}
    </main>
  )
}
