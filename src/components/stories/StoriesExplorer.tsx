"use client";

import { useMemo, useState } from "react";
import { articles } from "@/data/content";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { cn } from "@/lib/utils";

const categories = ["All", ...Array.from(new Set(articles.map((a) => a.category)))];

export function StoriesExplorer() {
  const [category, setCategory] = useState("All");

  const list = useMemo(
    () =>
      category === "All"
        ? articles
        : articles.filter((a) => a.category === category),
    [category],
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn("chip", category === c && "chip-active")}
            aria-pressed={category === c}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {list.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
