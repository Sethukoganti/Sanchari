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
      className={cn(
        "section-pad pt-28 pb-14 lg:pt-36 lg:pb-16",
        tone === "dark" ? "bg-navy text-white" : "bg-cream text-navy",
      )}
    >
      <div className="container-site max-w-4xl">
        {eyebrow ? (
          <p
            className={cn(
              "text-xs font-semibold uppercase tracking-[0.22em]",
              tone === "dark" ? "text-turmeric" : "text-peacock",
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description ? (
          <p
            className={cn(
              "mt-5 max-w-2xl text-base leading-relaxed sm:text-lg",
              tone === "dark" ? "text-warm-white/75" : "text-ink-muted",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
