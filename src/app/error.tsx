"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global runtime error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0A0A0A] px-4 text-center text-[#F7F3EC]">
      <div className="card-surface max-w-md p-8 sm:p-10 bg-white/[0.03] border-white/10 rounded-3xl shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h2 className="mt-6 font-display text-3xl font-bold text-warm-white">
          Journey Interrupted
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-zinc-300">
          We encountered an unexpected issue while rendering this page. Our team has been notified.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => reset()}
            className="btn-primary !py-2.5 text-xs flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="btn-secondary !py-2.5 text-xs flex items-center justify-center gap-2"
          >
            <Home className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

