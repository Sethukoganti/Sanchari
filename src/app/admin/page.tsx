"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Plus,
  Trash2,
  Edit,
  Check,
  X,
  Compass,
  Store,
  Calendar,
  Star,
  Users,
  Database,
} from "lucide-react";
import { destinationsData } from "@/data/destinations";
import { businessesData } from "@/data/businesses";
import { eventsData } from "@/data/events";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { cn } from "@/lib/utils";

type AdminTab = "destinations" | "businesses" | "events" | "reviews";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("destinations");
  const [destList, setDestList] = useState(destinationsData);
  const [bizList, setBizList] = useState(businessesData);
  const [eventsList, setEventsList] = useState(eventsData);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // New Destination Form Modal
  const [isAddDestOpen, setIsAddDestOpen] = useState(false);
  const [newDestName, setNewDestName] = useState("");
  const [newDestState, setNewDestState] = useState("");
  const [newDestRegion, setNewDestRegion] = useState("North");
  const [newDestDesc, setNewDestDesc] = useState("");
  const [newDestIsHidden, setNewDestIsHidden] = useState(false);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleDeleteDest = (id: string) => {
    setDestList((prev) => prev.filter((d) => d.id !== id));
    showToast("Destination record removed successfully.");
  };

  const handleToggleBizVerify = (id: string) => {
    setBizList((prev) =>
      prev.map((b) => (b.id === id ? { ...b, verified: !b.verified } : b))
    );
    showToast("Business verification status updated.");
  };

  const handleCreateDest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDestName || !newDestState) return;

    const slug = newDestName.toLowerCase().replace(/\s+/g, "-");
    const newRecord: any = {
      id: slug,
      slug,
      name: newDestName,
      state: newDestState,
      stateSlug: newDestState.toLowerCase().replace(/\s+/g, "-"),
      region: newDestRegion,
      tagline: `Experience the vibrant culture of ${newDestName}`,
      summary: newDestDesc || `Explore ancient monuments and landscapes in ${newDestName}.`,
      description: newDestDesc,
      bestTime: "October to March",
      duration: "3 to 4 Days",
      budget: "Moderate",
      averageDailyBudget: 3200,
      rating: 4.8,
      highlights: ["Historic Center", "Regional Food Trail", "Sunset Viewpoint"],
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
      gallery: [],
      coordinates: { lat: 20.5937, lng: 78.9629 },
      featured: true,
      isHiddenGem: newDestIsHidden,
      crowdLevel: newDestIsHidden ? "Low / Serene" : "Moderate",
      localCuisine: [{ name: "Regional Thali", description: "Fresh local delicacies", image: "" }],
      localMarkets: [],
      nearbyAttractions: [],
      travelTips: ["Hire local certified guides", "Drink bottled water"],
      weather: [],
    };

    setDestList([newRecord, ...destList]);
    setIsAddDestOpen(false);
    setNewDestName("");
    setNewDestState("");
    setNewDestDesc("");
    showToast(`Created new destination: ${newDestName}`);
  };

  return (
    <div className="min-h-screen pb-24 text-[#F8FAFC]">
      <PageHero
        eyebrow="Platform Administration"
        title="Sanchari Bharat CMS Dashboard"
        description="Manage destination records, verify local tourism businesses, audit cultural events, and curate community reviews."
      />

      <div className="container-site section-pad pt-6">
        <Breadcrumbs items={[{ label: "Admin Dashboard" }]} />
      </div>

      <section className="section-pad mt-8">
        <div className="container-site space-y-8">
          {/* Toast Notification */}
          {toastMsg && (
            <div className="fixed bottom-8 right-8 z-50 p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-fade-in backdrop-blur-xl">
              <Check className="h-4 w-4 text-emerald-400" />
              <span>{toastMsg}</span>
            </div>
          )}

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="card-surface p-5 bg-navy-surface/60 border-white/10 rounded-2xl space-y-1">
              <span className="text-xs text-muted-gray">Total Destinations:</span>
              <div className="font-mono text-2xl font-bold text-warm-white">{destList.length}</div>
            </div>
            <div className="card-surface p-5 bg-navy-surface/60 border-white/10 rounded-2xl space-y-1">
              <span className="text-xs text-muted-gray">Hidden Gems:</span>
              <div className="font-mono text-2xl font-bold text-emerald-accent">
                {destList.filter((d) => d.isHiddenGem).length}
              </div>
            </div>
            <div className="card-surface p-5 bg-navy-surface/60 border-white/10 rounded-2xl space-y-1">
              <span className="text-xs text-muted-gray">Verified Local Partners:</span>
              <div className="font-mono text-2xl font-bold text-saffron">{bizList.length}</div>
            </div>
            <div className="card-surface p-5 bg-navy-surface/60 border-white/10 rounded-2xl space-y-1">
              <span className="text-xs text-muted-gray">Living Events & Melas:</span>
              <div className="font-mono text-2xl font-bold text-ai-light">{eventsList.length}</div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-3">
            <div className="flex flex-wrap gap-2">
              {[
                { id: "destinations", label: "Destinations & Gems" },
                { id: "businesses", label: "Local Businesses & Verification" },
                { id: "events", label: "Cultural Events & Melas" },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id as any)}
                  className={cn(
                    "chip !py-2 !px-4 text-xs font-semibold cursor-pointer",
                    activeTab === t.id && "chip-active"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {activeTab === "destinations" && (
              <button
                type="button"
                onClick={() => setIsAddDestOpen(true)}
                className="btn-primary !py-1.5 !px-3.5 text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Destination</span>
              </button>
            )}
          </div>

          {/* TAB 1: DESTINATIONS TABLE */}
          {activeTab === "destinations" && (
            <div className="card-surface overflow-x-auto bg-navy-surface/60 border-white/10 rounded-3xl p-4">
              <table className="w-full text-left text-xs text-zinc-300">
                <thead className="border-b border-white/10 text-muted-gray font-mono uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Destination</th>
                    <th className="p-3">State & Region</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Daily Budget</th>
                    <th className="p-3">Crowd Level</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {destList.map((d) => (
                    <tr key={d.id} className="hover:bg-white/5 transition">
                      <td className="p-3 font-semibold text-warm-white flex items-center gap-2">
                        <span>{d.name}</span>
                        {d.isHiddenGem && <span className="badge-hidden-gem !text-[9px] !py-0.5">Hidden Gem</span>}
                      </td>
                      <td className="p-3">{d.state} ({d.region})</td>
                      <td className="p-3">{d.themes[0] || "Heritage"}</td>
                      <td className="p-3 font-mono text-saffron">₹{d.averageDailyBudget || 3000}/day</td>
                      <td className="p-3">{d.crowdLevel || "Moderate"}</td>
                      <td className="p-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleDeleteDest(d.id)}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40 transition cursor-pointer"
                          title="Delete Record"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 2: BUSINESSES VERIFICATION */}
          {activeTab === "businesses" && (
            <div className="card-surface overflow-x-auto bg-navy-surface/60 border-white/10 rounded-3xl p-4">
              <table className="w-full text-left text-xs text-zinc-300">
                <thead className="border-b border-white/10 text-muted-gray font-mono uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Business Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Verification</th>
                    <th className="p-3 text-right">Toggle Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {bizList.map((biz) => (
                    <tr key={biz.id} className="hover:bg-white/5 transition">
                      <td className="p-3 font-semibold text-warm-white">{biz.name}</td>
                      <td className="p-3 font-mono text-saffron">{biz.category}</td>
                      <td className="p-3">{biz.location}</td>
                      <td className="p-3 font-mono">{biz.phone}</td>
                      <td className="p-3">
                        {biz.verified ? (
                          <span className="chip !py-0.5 !px-2 text-[10px] text-emerald-300 bg-emerald-950/60 border-emerald-500/40">
                            Verified ✓
                          </span>
                        ) : (
                          <span className="chip !py-0.5 !px-2 text-[10px] text-amber-300 bg-amber-950/60 border-amber-500/40">
                            Pending Audit
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleToggleBizVerify(biz.id)}
                          className="btn-secondary !py-1 !px-2.5 text-[11px] cursor-pointer"
                        >
                          {biz.verified ? "Revoke" : "Approve ✓"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: EVENTS */}
          {activeTab === "events" && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {eventsList.map((evt) => (
                <div key={evt.id} className="card-surface p-5 bg-navy-surface/60 border-white/10 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono text-saffron font-bold uppercase">{evt.category}</span>
                    <span className="text-muted-gray">{evt.date.month}</span>
                  </div>
                  <h4 className="font-display font-bold text-base text-warm-white">{evt.name}</h4>
                  <p className="text-xs text-zinc-300 line-clamp-2">{evt.description}</p>
                  <div className="pt-2 text-[11px] text-muted-gray border-t border-white/5">
                    Location: <strong className="text-warm-white">{evt.location} ({evt.state})</strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Add Destination Modal */}
      {isAddDestOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/80 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-md rounded-3xl border border-white/15 bg-[#0E172F] p-6 sm:p-8 text-warm-white shadow-2xl space-y-5">
            <button
              type="button"
              onClick={() => setIsAddDestOpen(false)}
              className="absolute right-4 top-4 rounded-xl p-2 text-zinc-400 hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="font-display text-xl font-bold text-warm-white">
              Add New Indian Destination Record
            </h3>

            <form onSubmit={handleCreateDest} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Destination Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Majuli Island"
                  value={newDestName}
                  onChange={(e) => setNewDestName(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-navy-dark px-3 py-2 text-warm-white outline-none focus:border-saffron"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-zinc-300 block mb-1">State</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Assam"
                    value={newDestState}
                    onChange={(e) => setNewDestState(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-navy-dark px-3 py-2 text-warm-white outline-none focus:border-saffron"
                  />
                </div>
                <div>
                  <label className="font-semibold text-zinc-300 block mb-1">Region</label>
                  <select
                    value={newDestRegion}
                    onChange={(e) => setNewDestRegion(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-navy-dark px-2.5 py-2 text-warm-white outline-none focus:border-saffron"
                  >
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                    <option value="Northeast">Northeast</option>
                    <option value="Central">Central</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-zinc-300 block mb-1">Description / Summary</label>
                <textarea
                  rows={3}
                  placeholder="Summary of heritage, geography, and attractions..."
                  value={newDestDesc}
                  onChange={(e) => setNewDestDesc(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-navy-dark px-3 py-2 text-warm-white outline-none focus:border-saffron"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isHiddenGemCheck"
                  checked={newDestIsHidden}
                  onChange={(e) => setNewDestIsHidden(e.target.checked)}
                  className="h-4 w-4 rounded border-white/20 accent-saffron"
                />
                <label htmlFor="isHiddenGemCheck" className="text-zinc-300 cursor-pointer select-none">
                  Mark as <strong className="text-emerald-300">Hidden Gem</strong> (Off-beat sanctuary)
                </label>
              </div>

              <button type="submit" className="btn-primary w-full justify-center !py-2.5 mt-2">
                Save Destination to Directory
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

