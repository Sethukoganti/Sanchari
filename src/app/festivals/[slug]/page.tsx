import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { festivalsData, getFestival } from "@/data/festivals";
import { FestivalDetailClient } from "@/components/festivals/FestivalDetailClient";

export function generateStaticParams() {
  return festivalsData.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fest = getFestival(slug);
  if (!fest) return { title: "Festival Not Found · Explore India" };

  return {
    title: `${fest.name} — Significance, Rituals & Celebration Guide · Explore India`,
    description: fest.significance.slice(0, 160),
    openGraph: {
      title: fest.name,
      description: fest.significance.slice(0, 160),
      images: fest.gallery,
    },
  };
}

export default async function FestivalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fest = getFestival(slug);
  if (!fest) notFound();

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Festival",
    name: fest.name,
    description: fest.significance,
    location: {
      "@type": "Place",
      name: fest.states.join(", "),
      address: {
        "@type": "PostalAddress",
        addressCountry: "India",
      },
    },
    image: fest.gallery,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FestivalDetailClient festival={fest} />
    </>
  );
}

