import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.explore-india.example",
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        item: item.href ? `https://www.explore-india.example${item.href}` : undefined,
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-gray">
        <Link
          href="/"
          className="flex items-center gap-1 hover:text-warm-white transition-colors"
          title="Home"
        >
          <Home className="h-3.5 w-3.5" />
          <span className="sr-only">Home</span>
        </Link>

        {items.map((item, idx) => (
          <div key={item.label + idx} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3 text-zinc-600 shrink-0" />
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-turmeric transition-colors truncate max-w-[200px]"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-warm-white font-medium truncate max-w-[250px]">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}

