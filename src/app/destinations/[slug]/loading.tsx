export default function DestinationDetailLoading() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F7F3EC] animate-pulse">
      {/* Hero skeleton */}
      <div className="h-[70vh] w-full bg-white/5 relative flex items-end p-8 sm:p-14">
        <div className="container-site space-y-4">
          <div className="h-6 w-40 rounded-full bg-white/10" />
          <div className="h-14 w-3/4 max-w-lg rounded-xl bg-white/15" />
          <div className="h-5 w-1/2 max-w-md rounded bg-white/10" />
        </div>
      </div>

      <div className="container-site section-pad mt-12 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="h-96 rounded-2xl bg-white/[0.03] border border-white/5" />
        </div>
        <div className="lg:col-span-8 space-y-8">
          <div className="h-40 rounded-2xl bg-white/[0.03] border border-white/5" />
          <div className="h-64 rounded-2xl bg-white/[0.03] border border-white/5" />
        </div>
      </div>
    </div>
  );
}

