"use client"

import Image from "next/image"
import { useState } from "react"
import { Check, Copy, Gift } from "lucide-react"
import { toast } from "sonner"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { weddingData } from "@/lib/wedding-data"

export function WeddingGift() {
  const { gifts, shippingAddress } = weddingData
  const [copied, setCopied] = useState<string | null>(null)

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(value)
      toast.success("Nomor rekening disalin")
      setTimeout(() => setCopied(null), 2000)
    } catch {
      toast.error("Gagal menyalin")
    }
  }

  return (
    <section id="hadiah" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="Tanda Kasih" title="Wedding Gift" />

        <Reveal className="mx-auto mt-8 max-w-xl text-center">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Doa restu Anda adalah hadiah terindah bagi kami. Namun jika ingin
            memberi tanda kasih, kami sediakan informasi berikut.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-5">
          {gifts.map((gift, index) => (
            <Reveal
              key={gift.number}
              delay={index * 0.1}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card px-6 py-6 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="text-left">
                <p className="text-xs uppercase tracking-luxe text-primary">
                  {gift.bank}
                </p>
                <p className="mt-2 font-serif text-2xl font-light tracking-wide text-foreground">
                  {gift.number}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  a.n. {gift.holder}
                </p>
              </div>
              <button
                onClick={() => copy(gift.number)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {copied === gift.number ? (
                  <>
                    <Check className="size-3.5" /> Tersalin
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" /> Salin
                  </>
                )}
              </button>
            </Reveal>
          ))}

          <Reveal
            delay={0.2}
            className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card px-6 py-8 text-center shadow-sm"
          >
            <p className="text-xs uppercase tracking-luxe text-primary">QRIS</p>
            <div className="relative size-44 overflow-hidden rounded-xl border border-border bg-background p-2">
              <Image
                src="/images/qris.png"
                alt="Kode QRIS untuk hadiah"
                fill
                className="object-contain"
                loading="lazy"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Scan untuk mengirim tanda kasih
            </p>
          </Reveal>

          <Reveal
            delay={0.25}
            className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-primary/40 bg-secondary/40 px-6 py-8 text-center"
          >
            <Gift className="size-6 text-primary" />
            <p className="text-xs uppercase tracking-luxe text-foreground/70">
              Alamat Pengiriman Hadiah
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {shippingAddress}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
