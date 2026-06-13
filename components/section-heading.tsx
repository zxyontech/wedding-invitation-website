import { Reveal } from "@/components/reveal"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  className?: string
}

export function SectionHeading({ eyebrow, title, className }: SectionHeadingProps) {
  return (
    <Reveal className={cn("flex flex-col items-center text-center", className)}>
      {eyebrow ? (
        <span className="mb-4 text-xs uppercase tracking-luxe text-primary">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-serif text-4xl font-light text-foreground md:text-5xl text-balance">
        {title}
      </h2>
      <div className="mt-6 flex items-center gap-3">
        <span className="h-px w-10 bg-primary/40" />
        <span className="size-1.5 rotate-45 bg-primary/60" />
        <span className="h-px w-10 bg-primary/40" />
      </div>
    </Reveal>
  )
}
