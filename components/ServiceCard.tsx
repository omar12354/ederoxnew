"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import type { Service } from "@/lib/content";
import { icons } from "@/lib/icons";
import { inSentence } from "@/lib/utils";

const servicePhotos: Record<string, string> = {
  "automatisering-ai": "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1000&q=85",
  "software-op-maat": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=85",
  "websites-platforms": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=85",
  systeemintegraties: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=85",
};

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = icons[service.icon];
  return (
    <motion.article initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-full">
      <div aria-hidden className="absolute -inset-px rounded-[24px] bg-gradient-to-br from-accent/50 via-transparent to-accent/30 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />
      <Link href={`/oplossingen/${service.slug}`}
        className="relative flex h-full flex-col overflow-hidden rounded-[23px] border border-line bg-white transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-accent/20 group-hover:shadow-[0_30px_60px_-30px_rgb(11_18_38/0.35)] focus-visible:outline-offset-4">
        <div className="relative flex min-h-[210px] items-end overflow-hidden bg-navy p-7 md:p-8">
          <Image src={servicePhotos[service.slug]} alt={`Sfeerbeeld bij ${inSentence(service.title)}`}
            fill sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover opacity-65 transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/65 to-navy/10" />
          <div className="relative z-10 flex w-full items-end justify-between gap-5">
            <div>
              <span className="mb-4 grid size-12 place-items-center rounded-xl border border-white/25 bg-white/15 text-white backdrop-blur-md transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 className="max-w-[18rem] text-2xl font-semibold text-white">{service.title}</h3>
            </div>
            <span className="font-mono text-sm text-white/70">0{index + 1}</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-7 md:p-8">
          <p className="leading-relaxed text-muted">{service.description}</p>
          <ul className="mt-6 grid gap-2.5 border-t border-line pt-6 sm:grid-cols-2">
            {service.examples.map((ex) => (
              <li key={ex} className="flex items-start gap-2 text-sm text-navy/80">
                <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />{ex}
              </li>
            ))}
          </ul>
          <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-accent">
            Meer over {inSentence(service.title)}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
