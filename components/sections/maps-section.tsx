import { MapPin } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { weddingData } from "@/lib/wedding-data"

export function MapsSection() {
  const { maps } = weddingData

  return (
    <section id="lokasi" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Petunjuk Arah" title="Lokasi Acara" />

        <Reveal className="mt-14">
          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            <iframe
              src={maps.embedUrl}
              title="Lokasi acara pernikahan"
              className="h-[360px] w-full md:h-[440px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="mt-8 flex justify-center">
            <a
              href={maps.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
            >
              <MapPin className="size-4" />
              Buka di Google Maps
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
