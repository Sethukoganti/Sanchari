"use client";

import { useEffect, useState } from "react";
import { Compass, Sparkles, Train, MapPin } from "lucide-react";

const STATS = [
  { value: 36, suffix: "+", label: "States & Union Territories", icon: MapPin },
  { value: 50, suffix: "+", label: "Major Living Festivals", icon: Sparkles },
  { value: 100, suffix: "+", label: "Curated Cultural Trails", icon: Compass },
  { value: 18, suffix: "K+", label: "Km Scenic Rail Routes", icon: Train },
];

export function StatsCounter() {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    setHasAnimated(true);
  }, []);

  return (
    <div className="card-surface p-6 sm:p-10 bg-white/[0.03] border-white/10 shadow-2xl">
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="flex flex-col items-center text-center p-3 first:pt-0 sm:first:pt-3"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-turmeric/15 text-turmeric mb-3 border border-turmeric/30">
                <Icon className="h-5 w-5" />
              </span>
              <p className="font-mono text-4xl sm:text-5xl font-extrabold text-warm-white">
                {stat.value}
                <span className="text-turmeric">{stat.suffix}</span>
              </p>
              <p className="mt-1 text-xs text-muted-gray font-mono uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

