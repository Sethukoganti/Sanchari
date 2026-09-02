import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/data/content";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ShareButton } from "@/components/common/ShareButton";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Story Not Found · Explore India" };
  return {
    title: `${article.title} · Explore India Stories`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
      type: "article",
    },
  };
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = articles.filter((a) => article.relatedSlugs?.includes(a.slug));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.date,
    author: { "@type": "Person", name: article.author },
    image: article.image,
    description: article.excerpt,
  };

  return (
    <div className="min-h-screen pb-24 text-[#F7F3EC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-site section-pad pt-24 pb-4">
        <Breadcrumbs
          items={[
            { label: "Stories & Culture", href: "/stories" },
            { label: article.title },
          ]}
        />
      </div>

      <article>
        {/* Header Hero */}
        <header className="relative min-h-[60vh] bg-black text-white overflow-hidden">
          <Image
            src={article.image || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80"}
            alt={article.title}
            fill
            priority
            className="object-cover opacity-60"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
          <div className="relative container-site section-pad flex min-h-[60vh] flex-col justify-end pb-14 pt-32">
            <span className="w-fit rounded-full border border-turmeric/50 bg-turmeric/15 px-3 py-1 font-mono text-xs font-bold text-turmeric uppercase tracking-wider backdrop-blur-md">
              {article.category} · {formatDate(article.date || article.publishDate || "2026-01-01")} · {article.readTime}
            </span>
            <h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight sm:text-5xl lg:text-6xl font-extrabold text-warm-white">
              {article.title}
            </h1>
            <p className="mt-3 text-sm text-zinc-300">By {article.author}</p>
            <div className="mt-6">
              <ShareButton title={article.title} text={article.excerpt} />
            </div>
          </div>
        </header>

        <div className="section-pad py-14">
          <div className="container-site max-w-3xl">
            <p className="text-xl leading-relaxed text-zinc-200 font-medium font-body border-l-2 border-turmeric pl-4">
              {article.excerpt}
            </p>

            <div className="mt-10 space-y-6 text-base sm:text-lg leading-relaxed text-zinc-300 font-body">
              {article.content.map((para: string, i: number) => (
                <div key={i} className="space-y-6">
                  <p>{para}</p>
                  {i === 1 && article.pullQuote && (
                    <blockquote className="my-8 rounded-2xl border-l-4 border-turmeric bg-white/[0.03] p-6 font-display text-2xl font-bold text-warm-white italic">
                      &ldquo;{article.pullQuote}&rdquo;
                    </blockquote>
                  )}
                </div>
              ))}
            </div>

            {/* Inline Photos */}
            {article.gallery && article.gallery.length > 0 && (
              <div className="mt-12 grid gap-4 sm:grid-cols-2">
                {article.gallery?.map((src: string, i: number) => (
                  <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                    <Image
                      src={src}
                      alt={`Inline gallery ${i + 1} for ${article.title}`}
                      fill
                      className="object-cover"
                      sizes="50vw"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Tags */}
            <div className="mt-10 flex flex-wrap gap-2 border-t border-white/10 pt-6">
              {article.tags.map((tag: string) => (
                <span key={tag} className="chip text-xs">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Related Stories */}
        {related.length > 0 && (
          <section className="section-pad pb-20 border-t border-white/10 pt-14">
            <div className="container-site">
              <h2 className="font-display text-3xl font-bold text-warm-white mb-8">
                Related Cultural Stories
              </h2>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {related.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
