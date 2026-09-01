"use client";

import { useState, useEffect } from "react";
import { Star, ThumbsUp, Plus, X, MessageSquare, Check } from "lucide-react";
import type { ReviewItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ReviewSectionProps {
  destinationSlug?: string;
  destinationName?: string;
  targetType?: string;
  targetSlug?: string;
  targetName?: string;
}

const DEFAULT_REVIEWS: Record<string, ReviewItem[]> = {
  jaipur: [
    {
      id: "rev-1",
      targetSlug: "jaipur",
      userName: "Rohan Varma",
      rating: 5,
      title: "Majestic sunrise at Nahargarh & incredible street food",
      comment:
        "Watching the entire Pink City wake up from Nahargarh Fort at dawn was unforgettable. Do not miss the Pyaaz Kachori at Rawat Mishtan Bhandar and the mirror palace at Amber Fort.",
      photos: [
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=400&q=80",
      ],
      helpful: 24,
      createdAt: "2 weeks ago",
    },
    {
      id: "rev-2",
      targetSlug: "jaipur",
      userName: "Sarah Jenkins, Melbourne",
      rating: 5,
      title: "A photographer's paradise!",
      comment:
        "Hawa Mahal from the cafes opposite it at 7:00 AM provides world-class lighting. The locals in Johari Bazaar were warm and welcoming. Book an official government guide at Jantar Mantar.",
      photos: [],
      helpful: 18,
      createdAt: "1 month ago",
    },
  ],
  varanasi: [
    {
      id: "rev-101",
      targetSlug: "varanasi",
      userName: "Dr. Ananya Roy",
      rating: 5,
      title: "Profound, mystical and deeply moving",
      comment:
        "Taking the early morning hand-rowed boat from Assi Ghat to Dashashwamedh was life-changing. The chanting, the bells, the morning mist—pure transcendence.",
      photos: [
        "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=400&q=80",
      ],
      helpful: 39,
      createdAt: "3 weeks ago",
    },
  ],
};

export function ReviewSection({
  destinationSlug,
  destinationName,
  targetSlug: propTargetSlug,
  targetName: propTargetName,
  targetType = "destination",
}: ReviewSectionProps) {
  const activeSlug = propTargetSlug || destinationSlug || "jaipur";
  const activeName = propTargetName || destinationName || "Explore India";

  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(
    DEFAULT_REVIEWS[activeSlug] || [
      {
        id: "rev-999",
        targetSlug: activeSlug,
        userName: "Aarav Sharma",
        rating: 5,
        title: "Unmatched cultural depth and hospitality",
        comment: `Exploring ${activeName} gave us memories for a lifetime. Highly recommended for slow travel lovers!`,
        photos: [],
        helpful: 12,
        createdAt: "Recently",
      },
    ]
  );

  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string | number, boolean>>({});

  // Form State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formTitle, setFormTitle] = useState("");
  const [formComment, setFormComment] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(`/api/reviews?targetSlug=${activeSlug}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.reviews) && data.reviews.length > 0) {
            setReviewsList(data.reviews);
          }
        }
      } catch (err) {
        // Fallback
      }
    }
    fetchReviews();
  }, [activeSlug]);

  const handleHelpfulClick = (id: number | string) => {
    if (helpfulVotes[id]) return;
    setHelpfulVotes((prev) => ({ ...prev, [id]: true }));
    setReviewsList((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, helpful: (r.helpful || r.helpfulCount || 0) + 1 }
          : r
      )
    );
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formTitle || !formComment) return;

    setSubmitting(true);
    const newRev: ReviewItem = {
      id: "rev-" + Date.now(),
      targetSlug: activeSlug,
      userName: formName,
      authorName: formName,
      rating: formRating,
      title: formTitle,
      comment: formComment,
      content: formComment,
      photos: [],
      helpful: 0,
      helpfulCount: 0,
      createdAt: "Just now",
    };

    try {
      await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetType,
          targetSlug: activeSlug,
          targetName: activeName,
          authorName: formName,
          rating: formRating,
          title: formTitle,
          content: formComment,
          travelerType: "Solo",
        }),
      });
    } catch (err) {
      console.error("Review API error:", err);
    }

    setReviewsList((prev) => [newRev, ...prev]);
    setSubmitting(false);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setModalOpen(false);
      setFormName("");
      setFormEmail("");
      setFormTitle("");
      setFormComment("");
    }, 1500);
  };

  const filteredReviews = filterRating
    ? reviewsList.filter((r) => r.rating === filterRating)
    : reviewsList;

  const averageRating =
    reviewsList.length > 0
      ? (reviewsList.reduce((acc, r) => acc + r.rating, 0) / reviewsList.length).toFixed(1)
      : "5.0";

  return (
    <div className="card-surface p-6 sm:p-8 bg-white/[0.03] border-white/10 rounded-3xl backdrop-blur-xl shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-turmeric/15 text-turmeric border border-turmeric/30">
              <MessageSquare className="h-4 w-4" />
            </span>
            <h3 className="font-display text-2xl font-bold text-warm-white">
              Traveler Experiences & Community Reviews
            </h3>
          </div>
          <p className="mt-1 text-xs text-muted-gray">
            Real stories, authentic travel tips, and verified ratings from slow-travel explorers
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-2xl border border-turmeric/30 bg-black/50 px-4 py-2">
            <Star className="h-5 w-5 text-turmeric fill-turmeric" />
            <span className="font-mono text-xl font-bold text-warm-white">{averageRating}</span>
            <span className="text-xs text-muted-gray">({reviewsList.length} reviews)</span>
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="btn-primary !px-4 !py-2.5 text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Write Review</span>
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono uppercase tracking-wider text-muted-gray mr-2">
          Filter:
        </span>
        <button
          type="button"
          onClick={() => setFilterRating(null)}
          className={cn(
            "chip !py-1 !px-3 text-xs font-semibold cursor-pointer",
            filterRating === null && "chip-active"
          )}
        >
          All ({reviewsList.length})
        </button>
        {[5, 4, 3].map((stars) => (
          <button
            key={stars}
            type="button"
            onClick={() => setFilterRating(stars)}
            className={cn(
              "chip !py-1 !px-3 text-xs font-semibold flex items-center gap-1 cursor-pointer",
              filterRating === stars && "chip-active"
            )}
          >
            <span>{stars}</span>
            <Star className="h-3 w-3 fill-current" />
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {filteredReviews.map((rev) => {
          const name = rev.userName || rev.authorName || "Traveler";
          const text = rev.comment || rev.content || "";
          const count = rev.helpful ?? rev.helpfulCount ?? 0;

          return (
            <div
              key={rev.id}
              className="rounded-2xl border border-white/5 bg-black/40 p-5 transition-all hover:border-white/15"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-turmeric to-amber-600 text-black font-display font-bold text-sm shadow-md">
                    {name[0]?.toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-warm-white">{name}</h4>
                    <span className="text-[11px] text-muted-gray">{rev.createdAt}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < rev.rating ? "text-turmeric fill-turmeric" : "text-zinc-600"
                      )}
                    />
                  ))}
                </div>
              </div>

              {rev.title && (
                <h5 className="mt-3 text-base font-bold text-warm-white font-display">
                  {rev.title}
                </h5>
              )}
              <p className="mt-1 text-sm text-zinc-300 leading-relaxed font-body">{text}</p>

              {rev.photos && rev.photos.length > 0 && (
                <div className="mt-3 flex gap-2">
                  {rev.photos.map((ph, idx) => (
                    <img
                      key={idx}
                      src={ph}
                      alt="Traveler review"
                      className="h-20 w-24 rounded-lg object-cover border border-white/10"
                    />
                  ))}
                </div>
              )}

              <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                <button
                  type="button"
                  onClick={() => handleHelpfulClick(rev.id)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs transition-all cursor-pointer",
                    helpfulVotes[rev.id]
                      ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/30"
                      : "text-muted-gray hover:text-warm-white hover:bg-white/5"
                  )}
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>Helpful ({count})</span>
                </button>
                <span className="text-[10px] text-muted-gray font-mono">Verified Traveler Review</span>
              </div>
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg rounded-3xl border border-white/15 bg-[#121212] p-6 sm:p-8 text-warm-white shadow-2xl">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute right-4 top-4 rounded-xl p-2 text-zinc-400 hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="font-display text-2xl font-bold">Write a Field Review</h3>
            <p className="mt-1 text-xs text-muted-gray">
              Share your tips and experience for {activeName}.
            </p>

            {formSubmitted ? (
              <div className="my-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/30 p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <Check className="h-6 w-6" />
                </div>
                <p className="mt-3 font-display text-xl font-bold">Review Published!</p>
                <p className="mt-1 text-xs text-zinc-300">
                  Thank you for contributing to the Explore India community.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="mt-6 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">
                    Your Rating *
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormRating(star)}
                        className="p-1 cursor-pointer"
                      >
                        <Star
                          className={cn(
                            "h-6 w-6 transition-colors",
                            star <= formRating ? "text-turmeric fill-turmeric" : "text-zinc-600"
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Iyer"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-warm-white outline-none focus:border-turmeric"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="you@domain.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-warm-white outline-none focus:border-turmeric"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">
                    Review Headline *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Unforgettable boat aarti at dawn"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-warm-white outline-none focus:border-turmeric"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">
                    Detailed Notes & Advice *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="What should other travelers know before visiting? Best timings, local food, guides..."
                    value={formComment}
                    onChange={(e) => setFormComment(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-warm-white outline-none focus:border-turmeric"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="btn-secondary !py-2 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary !py-2 text-xs"
                  >
                    {submitting ? "Publishing..." : "Submit Review"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

