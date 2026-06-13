import { Heart } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { weddingData } from "@/lib/wedding-data"

export function Footer() {
  const { couple } = weddingData
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-foreground px-6 py-24 text-center text-background md:py-32">
      <Reveal className="mx-auto flex max-w-xl flex-col items-center">
        <Heart className="size-7 text-primary" />
        <p className="mt-8 text-sm uppercase tracking-luxe text-background/70">
          Terima Kasih
        </p>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-background/80">
          Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i
          berkenan hadir dan memberikan doa restu kepada kami.
        </p>
        <p className="mt-10 font-serif text-5xl font-light text-background md:text-6xl">
          {couple.groom.shortName}
          <span className="mx-3 italic text-primary">&</span>
          {couple.bride.shortName}
        </p>
        <p className="mt-2 text-xs uppercase tracking-luxe text-background/60">
          TerimaKasih
        </p>
        <p className="mt-12 text-xs text-background/50">
          &copy; {year} {couple.groom.shortName} &amp; {couple.bride.shortName}. Dibuat dengan cinta.
        </p>
      </Reveal>
    </footer>
  )
}
