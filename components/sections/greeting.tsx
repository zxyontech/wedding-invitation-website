import { Reveal } from "@/components/reveal"
import { weddingData } from "@/lib/wedding-data"

export function Greeting() {
  const { greeting } = weddingData

  return (
    <section id="pembuka" className="bg-secondary/40 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl">
        <Reveal className="rounded-2xl border border-border bg-card px-8 py-12 text-center shadow-sm md:px-14 md:py-16">
          <p className="font-serif text-lg italic text-primary md:text-xl">
            {greeting.salutation}
          </p>
          <div className="mx-auto my-8 flex w-fit items-center gap-3">
            <span className="h-px w-8 bg-primary/40" />
            <span className="size-1.5 rotate-45 bg-primary/60" />
            <span className="h-px w-8 bg-primary/40" />
          </div>
          <blockquote className="font-serif text-2xl font-light leading-relaxed text-foreground md:text-3xl text-pretty">
            &ldquo;{greeting.quote}&rdquo;
          </blockquote>
          <p className="mt-8 text-xs uppercase tracking-luxe text-muted-foreground">
            {greeting.source}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
