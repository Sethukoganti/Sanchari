import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { statesData, getState } from "@/data/states";
import { StateDetailClient } from "@/components/states/StateDetailClient";

export function generateStaticParams() {
  return statesData.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const state = getState(slug);
  if (!state) return { title: "State Not Found · Explore India" };

  return {
    title: `${state.name} State Guide — Culture, Cuisine & Circuits · Explore India`,
    description: state.summary,
    openGraph: {
      title: state.name,
      description: state.summary,
      images: state.image ? [state.image] : ["https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80"],
    },
  };
}

export default async function StateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const state = getState(slug);
  if (!state) notFound();

  return <StateDetailClient state={state} />;
}
