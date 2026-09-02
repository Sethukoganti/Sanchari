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
      className="relative section-pad pt-28 pb-14 lg:pt-36 lg:pb-16 bg-gradient-to-b from-slate-100 via-slate-50 to-white dark:from-[#121212] dark:via-[#0D0D0D] dark:to-[#0A0A0A] border-b border-black/5 dark:border-white/5 overflow-hidden transition-colors duration-300"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-32 left-1/3 h-72 w-72 rounded-full bg-saffron/10 blur-[120px]" />

      <div className="container-site max-w-4xl relative z-10">
        {eyebrow && (
          <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-saffron mb-2">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-1 font-display text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl text-zinc-900 dark:text-warm-white">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-muted-gray font-body">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
