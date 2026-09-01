export default function FestivalsLoading() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F7F3EC] section-pad pt-36 pb-24 space-y-8 animate-pulse">
      <div className="container-site space-y-4">
        <div className="h-4 w-32 rounded bg-white/10" />
        <div className="h-12 w-3/4 max-w-xl rounded-xl bg-white/10" />
      </div>

      <div className="container-site h-80 rounded-3xl bg-white/[0.04] border border-white/5" />

      <div className="container-site mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 space-y-4">
            <div className="aspect-[16/10] w-full rounded-xl bg-white/10" />
            <div className="h-6 w-2/3 rounded bg-white/10" />
            <div className="h-4 w-full rounded bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  );
}

