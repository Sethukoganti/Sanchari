import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/lib/types";

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group block overflow-hidden rounded-2xl border border-[color:var(--surface-border)] bg-[color:var(--surface)] shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-[#C41E3A] hover:shadow-[0_20px_45px_rgba(114,18,38,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C41E3A]"
      aria-label={`Open destination ${destination.name}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={destination.image}
          alt={`${destination.name}, ${destination.state}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-108"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0507] via-[#0E0507]/40 to-transparent opacity-90 transition group-hover:opacity-95" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
            {destination.region} · {destination.state}
          </p>
          <h3 className="mt-1 font-display text-2xl font-bold text-white">
            {destination.name}
          </h3>
          <p className="mt-1.5 max-h-0 overflow-hidden text-xs leading-relaxed text-zinc-300 opacity-0 transition-all duration-300 group-hover:max-h-20 group-hover:opacity-100">
            {destination.tagline}
          </p>
        </div>
        <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#F7EAC8] backdrop-blur-md">
          {destination.status}
        </span>
      </div>
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <p className="line-clamp-2 text-xs leading-relaxed text-[color:var(--text-soft)]">{destination.summary}</p>
      </div>
    </Link>
  );
}
