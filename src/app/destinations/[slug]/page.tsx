import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { destinationsData, getDestination } from "@/data/destinations";
import { DestinationDetailClient } from "@/components/destinations/DestinationDetailClient";

export function generateStaticParams() {
  return destinationsData.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dest = getDestination(slug);
  if (!dest) return { title: "Destination Not Found · Explore India" };

  return {
    title: `${dest.name} (${dest.nameHi}) · ${dest.state} Travel Guide`,
    description: dest.summary,
    openGraph: {
      title: `${dest.name} · Explore India`,
      description: dest.summary,
      images: [
        {
          url: dest.image,
          width: 1200,
          height: 630,
          alt: `${dest.name} — ${dest.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${dest.name} · ${dest.state}`,
      description: dest.summary,
      images: [dest.image],
    },
  };
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dest = getDestination(slug);

  if (!dest) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: dest.name,
    description: dest.description,
    image: dest.image,
    touristType: ["Cultural Tourism", "Heritage Tourism", "Slow Travel"],
    address: {
      "@type": "PostalAddress",
      addressRegion: dest.state,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: dest.coordinates.lat,
      longitude: dest.coordinates.lng,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DestinationDetailClient destination={dest} />
    </>
  );
}
