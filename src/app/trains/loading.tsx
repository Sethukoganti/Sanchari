export default function TrainsLoading() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F7F3EC] section-pad pt-36 pb-24 space-y-8 animate-pulse">
      <div className="container-site space-y-4">
        <div className="h-4 w-32 rounded bg-white/10" />
        <div className="h-12 w-3/4 max-w-xl rounded-xl bg-white/10" />
      </div>

      <div className="container-site space-y-6 mt-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-64 rounded-2xl bg-white/[0.03] border border-white/5" />
        ))}
      </div>
    </div>
  );
}

