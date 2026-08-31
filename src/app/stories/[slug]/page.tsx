import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/data/content";
import { ArticleCard } from "@/components/ui/ArticleCard";
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
  if (!article) return { title: "Story" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
      type: "article",
    },
  };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = articles.filter((a) => article.relatedSlugs.includes(a.slug));

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <header className="relative min-h-[60vh] bg-navy text-white">
          <Image
            src={article.image}
            alt=""
            fill
            priority
            className="object-cover opacity-50"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dusk-ink via-dusk-ink/50 to-dusk-ink/20" />
          <div className="relative container-site section-pad flex min-h-[60vh] flex-col justify-end pb-14 pt-32">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-turmeric">
              {article.category} · {formatDate(article.date)} · {article.readTime}
            </p>
            <h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
              {article.title}
            </h1>
            <p className="mt-4 text-warm-white/75">By {article.author}</p>
          </div>
        </header>

        <div className="section-pad py-14">
          <div className="container-site max-w-3xl">
            <p className="text-xl leading-relaxed text-ink-muted">{article.excerpt}</p>
            <div className="prose-ei mt-10">
              {article.content.map((para, i) => (
                <div key={i}>
                  <p>{para}</p>
                  {i === 1 ? (
                    <blockquote>“{article.pullQuote}”</blockquote>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {article.gallery.map((src, i) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-[14px]">
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

            <div className="mt-10 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="chip">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {related.length ? (
          <section className="section-pad pb-20">
            <div className="container-site">
              <h2 className="font-display text-3xl">Related stories</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {related.map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
              <Link href="/stories" className="btn-ghost mt-10 inline-flex">
                All stories
              </Link>
            </div>
          </section>
        ) : null}
      </article>
    </>
  );
}
