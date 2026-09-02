"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Sparkles } from "lucide-react";
import type { Destination } from "@/lib/types";
import { cn } from "@/lib/utils";

interface DestinationCardProps {
  destination: Destination;
  priority?: boolean;
}

export function DestinationCard({ destination, priority = false }: DestinationCardProps) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="card-surface group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-turmeric/50 hover:shadow-xl hover:shadow-turmeric/15"
    >
      {/* Image Container with Gradient Overlay */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="rounded-full bg-black/75 px-3 py-1 text-[11px] font-bold text-turmeric border border-turmeric/30 backdrop-blur-md font-mono">
            {destination.region} India
          </span>
          <span className="rounded-full bg-black/75 px-2.5 py-1 text-[10px] font-semibold text-teal-300 border border-teal-500/30 backdrop-blur-md">
            {destination.status}
          </span>
        </div>

        {/* Bottom State Label */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-zinc-300 font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          <MapPin className="h-3.5 w-3.5 text-white" />
          <span>{destination.state}</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-display text-2xl font-bold tracking-tight text-warm-white group-hover:text-turmeric transition-colors">
              {destination.name}
            </h3>
            <span className="font-hindi text-base font-semibold text-turmeric/80">
              {destination.nameHi}
            </span>
          </div>

          <p className="mt-2 text-xs sm:text-sm text-muted-gray line-clamp-2 leading-relaxed">
            {destination.tagline || destination.summary}
          </p>
        </div>

        {/* Footer Meta Row */}
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-zinc-400 font-mono">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-white" />
            <span>{destination.duration}</span>
          </span>

          <span className="rounded-lg bg-white/5 px-2.5 py-1 text-[11px] font-bold text-zinc-200 border border-white/5 group-hover:border-turmeric/30 group-hover:text-turmeric transition-colors">
            Explore Guide →
          </span>
        </div>
      </div>
    </Link>
  );
}
