import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="overflow-hidden rounded-[22px] border border-white/10 bg-[#0f0f0f] shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:shadow-[0_24px_55px_rgba(229,9,20,0.18)]">
      <Link href={`/stories/${article.slug}`} className="group block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={article.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
        </div>
        <div className="p-5">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em] text-red-400">
            <span className="rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-1 font-semibold text-red-300">
              {article.category}
            </span>
            <span className="text-zinc-400 normal-case tracking-normal">
              {formatDate(article.date)} · {article.readTime}
            </span>
          </div>
          <h3 className="mt-3 font-display text-2xl leading-snug text-white transition-colors duration-200 group-hover:text-red-300">
            {article.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300">
            {article.excerpt}
          </p>
        </div>
      </Link>
    </article>
  );
}
