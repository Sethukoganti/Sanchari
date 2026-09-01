export default function Loading() {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center section-pad">
      <div className="relative flex items-center justify-center">
        {/* Animated pulsing glow circle */}
        <div className="absolute h-24 w-24 rounded-full bg-turmeric/20 blur-xl animate-pulse" />
        <div className="h-12 w-12 rounded-full border-2 border-turmeric/30 border-t-turmeric animate-spin" />
      </div>
      <p className="mt-6 font-display text-lg font-medium text-warm-white/80 animate-pulse">
        Exploring India...
      </p>
    </div>
  );
}

