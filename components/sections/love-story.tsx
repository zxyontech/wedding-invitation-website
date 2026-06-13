import Image from "next/image"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { weddingData } from "@/lib/wedding-data"

export function LoveStory() {
  const { story } = weddingData

  return (
    <section id="cerita" className="bg-secondary/40 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Perjalanan Kami" title="Kisah Cinta" />

        <div className="relative mt-16">
          {/* center line */}
          <span className="absolute left-6 top-0 h-full w-px bg-primary/30 md:left-1/2 md:-translate-x-1/2" />

          <div className="flex flex-col gap-12 md:gap-16">
            {story.map((item, index) => {
              const isLeft = index % 2 === 0
              return (
                <Reveal
                  key={item.title}
                  delay={index * 0.05}
                  className={`relative flex flex-col gap-6 pl-16 md:grid md:grid-cols-2 md:items-center md:gap-10 md:pl-0 ${
                    isLeft ? "" : "md:[direction:rtl]"
                  }`}
                >
                  {/* dot */}
                  <span className="absolute left-6 top-2 size-3 -translate-x-1/2 rotate-45 bg-primary md:left-1/2" />

                  <div
                    className={`[direction:ltr] ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}
                  >
                    <span className="text-xs uppercase tracking-luxe text-primary">
                      {item.date}
                    </span>
                    <h3 className="mt-2 font-serif text-3xl font-light text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>

                  <div className="[direction:ltr]">
                    <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
                      <Image
                        src={item.photo || "/placeholder.svg"}
                        alt={item.title}
                        width={400}
                        height={300}
                        className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
