import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="card-surface overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-turmeric/40 hover:shadow-xl hover:shadow-turmeric/10">
      <Link href={`/stories/${article.slug}`} className="group flex flex-col justify-between h-full">
        <div>
          <div className="relative aspect-[16/10] overflow-hidden bg-black/60">
            <Image
              src={article.image || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80"}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/30" />
            <span className="absolute top-3 left-3 rounded-full bg-black/80 px-2.5 py-1 font-mono text-[10px] font-bold text-turmeric border border-turmeric/30 uppercase tracking-wider backdrop-blur-md">
              {article.category}
            </span>
          </div>

          <div className="p-5">
            <div className="text-xs text-muted-gray font-mono">
              {formatDate(article.date || article.publishDate || "2026-01-01")} · {article.readTime}
            </div>
            <h3 className="mt-2 font-display text-xl sm:text-2xl font-bold text-warm-white transition-colors duration-200 group-hover:text-turmeric">
              {article.title}
            </h3>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-300 font-body line-clamp-3">
              {article.excerpt}
            </p>
          </div>
        </div>

        <div className="p-5 pt-0 border-t border-white/5 mt-auto text-xs font-semibold text-turmeric group-hover:underline">
          Read Full Essay →
        </div>
      </Link>
    </article>
  );
}
