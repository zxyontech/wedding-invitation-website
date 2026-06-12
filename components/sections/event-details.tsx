import { CalendarDays, Clock, MapPin } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { weddingData } from "@/lib/wedding-data"

export function EventDetails() {
  const { events } = weddingData

  return (
    <section id="acara" className="bg-secondary/40 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="Save The Date" title="Detail Acara" />

        <div className={`mt-16 grid grid-cols-1 gap-8 ${events.length > 1 ? "md:grid-cols-2" : "max-w-md mx-auto"}`}>
          {events.map((event, index) => (
            <Reveal
              key={event.title}
              delay={index * 0.12}
              className="flex flex-col items-center rounded-2xl border border-border bg-card px-8 py-12 text-center shadow-sm"
            >
              <h3 className="font-serif text-3xl font-light text-foreground">
                {event.title}
              </h3>
              <div className="mx-auto my-6 flex w-fit items-center gap-3">
                <span className="h-px w-8 bg-primary/40" />
                <span className="size-1.5 rotate-45 bg-primary/60" />
                <span className="h-px w-8 bg-primary/40" />
              </div>

              <ul className="flex flex-col gap-5 text-sm">
                <li className="flex flex-col items-center gap-2">
                  <CalendarDays className="size-5 text-primary" />
                  <span className="text-foreground">{event.date}</span>
                </li>
                <li className="flex flex-col items-center gap-2">
                  <Clock className="size-5 text-primary" />
                  <span className="text-foreground">{event.time}</span>
                </li>
                <li className="flex flex-col items-center gap-2">
                  <MapPin className="size-5 text-primary" />
                  <span className="font-medium text-foreground">
                    {event.location}
                  </span>
                  <span className="max-w-xs text-muted-foreground">
                    {event.address}
                  </span>
                </li>
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
