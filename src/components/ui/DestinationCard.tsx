import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/lib/types";

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group block overflow-hidden rounded-[22px] border border-white/10 bg-[#0f0f0f] shadow-[0_20px_50px_rgba(0,0,0,0.38)] transition-all duration-300 hover:-translate-y-1 hover:border-red-500/35 hover:shadow-[0_22px_55px_rgba(229,9,20,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
      aria-label={`Open destination ${destination.name}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={destination.image}
          alt={`${destination.name}, ${destination.state}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent opacity-90 transition group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-400">
            {destination.region} · {destination.state}
          </p>
          <h3 className="mt-1 font-display text-2xl text-white">
            {destination.name}
          </h3>
          <p className="mt-2 max-h-0 overflow-hidden text-sm text-white/80 opacity-0 transition-all duration-300 group-hover:max-h-24 group-hover:opacity-100">
            {destination.tagline}
          </p>
        </div>
        <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-red-300 backdrop-blur-sm">
          {destination.status}
        </span>
      </div>
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <p className="text-sm text-zinc-300">{destination.summary}</p>
      </div>
    </Link>
  );
}
