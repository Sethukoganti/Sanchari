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

  const description = (fest.significance || fest.description || "").slice(0, 160);
  const images = fest.gallery && fest.gallery.length > 0 ? fest.gallery : (fest.image ? [fest.image] : []);

  return {
    title: `${fest.name} — Significance, Rituals & Celebration Guide · Explore India`,
    description,
    openGraph: {
      title: fest.name,
      description,
      images,
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
    description: fest.significance || fest.description || "",
    location: {
      "@type": "Place",
      name: (fest.states || (fest.state ? [fest.state] : [])).join(", "),
      address: {
        "@type": "PostalAddress",
        addressCountry: "India",
      },
    },
    image: fest.gallery && fest.gallery.length > 0 ? fest.gallery : (fest.image ? [fest.image] : []),
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
