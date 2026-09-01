import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.22em] text-turmeric">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-extrabold leading-tight text-warm-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base sm:text-lg leading-relaxed text-muted-gray">
          {description}
        </p>
      )}
    </div>
  );
}
