import Image from "next/image"
import { AtSign } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { weddingData } from "@/lib/wedding-data"

type Person = (typeof weddingData.couple)["groom"]

function ProfileCard({ person, delay }: { person: Person; delay: number }) {
  return (
    <Reveal delay={delay} className="flex flex-col items-center text-center">
      <div className="relative">
        <div className="absolute -inset-3 rounded-full border border-primary/30" />
        <div className="relative size-48 overflow-hidden rounded-full border-4 border-card shadow-lg md:size-56">
          <Image
            src={person.photo || "/placeholder.svg"}
            alt={`Foto ${person.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 192px, 224px"
            loading="lazy"
          />
        </div>
      </div>
      <h3 className="mt-8 font-serif text-3xl font-light text-foreground md:text-4xl">
        {person.name}
      </h3>
      <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
        {person.parents}
      </p>
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-foreground/70">
        {person.description}
      </p>
      <a
        href={`https://instagram.com/${person.instagram.replace("@", "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-foreground/80 transition-colors hover:border-primary hover:text-primary"
      >
        <AtSign className="size-3.5" />
        {person.instagram}
      </a>
    </Reveal>
  )
}

export function CoupleProfile() {
  const { couple } = weddingData

  return (
    <section id="mempelai" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Dengan Penuh Sukacita" title="Mempelai" />
        <div className="mt-16 grid grid-cols-1 items-start gap-16 md:grid-cols-[1fr_auto_1fr] md:gap-8">
          <ProfileCard person={couple.groom} delay={0} />
          <div className="hidden items-center justify-center md:flex">
            <span className="font-serif text-5xl font-light italic text-primary">
              &
            </span>
          </div>
          <ProfileCard person={couple.bride} delay={0.15} />
        </div>
      </div>
    </section>
  )
}
