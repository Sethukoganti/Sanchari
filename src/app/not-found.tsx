import Link from "next/link";
import { Compass, Home, MapPin, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80vh] w-full items-center justify-center section-pad overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-turmeric/10 blur-[120px]" />

      <div className="card-surface relative z-10 max-w-lg p-8 sm:p-12 text-center bg-black/60 border-white/10 shadow-2xl">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-turmeric/15 text-turmeric border border-turmeric/30 shadow-xl shadow-turmeric/20">
          <Compass className="h-10 w-10 animate-spin" style={{ animationDuration: "12s" }} />
        </div>

        <span className="mt-6 inline-block font-mono text-sm uppercase tracking-widest text-turmeric font-semibold">
          404 · Uncharted Route
        </span>

        <h1 className="mt-2 font-display text-4xl font-bold text-warm-white sm:text-5xl">
          Lost in the subcontinent?
        </h1>

        <p className="mt-4 text-base text-muted-gray leading-relaxed">
          The trail or destination you are searching for does not exist or has been moved to another route.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Link href="/destinations" className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2">
            <MapPin className="h-4 w-4" />
            Explore Destinations
          </Link>
          <Link href="/festivals" className="btn-ghost w-full sm:w-auto flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-rani" />
            Festivals
          </Link>
        </div>
      </div>
    </div>
  );
}

