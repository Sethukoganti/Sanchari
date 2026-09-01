import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  tone = "dark",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: "dark" | "light";
}) {
  return (
    <section
      className="relative section-pad pt-28 pb-14 lg:pt-36 lg:pb-16 bg-gradient-to-b from-[#121212] via-[#0D0D0D] to-[#0A0A0A] text-[#F7F3EC] border-b border-white/5 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-32 left-1/3 h-72 w-72 rounded-full bg-turmeric/10 blur-[120px]" />

      <div className="container-site max-w-4xl relative z-10">
        {eyebrow && (
          <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-turmeric">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl text-warm-white">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-gray">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
