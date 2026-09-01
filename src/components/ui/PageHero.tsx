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
        tone === "dark"
          ? "bg-gradient-to-b from-[#140508] via-[#100407] to-[color:var(--page-bg)] text-white"
          : "bg-[color:var(--page-bg-accent)] text-[color:var(--text)]",
      )}
    >
      <div className="container-site max-w-4xl">
        {eyebrow ? (
          <p
            className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]"
          >
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl text-white">
          {title}
        </h1>
        {description ? (
          <p
            className={cn(
              "mt-5 max-w-2xl text-base leading-relaxed sm:text-lg",
              tone === "dark" ? "text-zinc-300" : "text-[color:var(--text-soft)]",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
