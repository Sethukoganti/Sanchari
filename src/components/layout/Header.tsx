"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Globe,
  User,
  Sparkles,
  Menu,
  X,
  Compass,
  MapPin,
  Calendar,
  Bookmark,
  Store,
  Navigation,
  ShieldCheck,
  Plane,
  Train,
  Bus,
  Hotel,
  Utensils,
  ChevronDown,
} from "lucide-react";
import { LogoIcon } from "@/components/ui/LogoIcon";
import { AuthModal } from "@/components/auth/AuthModal";
import { UserProfileModal } from "@/components/auth/UserProfileModal";
import { LanguageModal } from "@/components/layout/LanguageModal";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useLanguage, useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { language, languageInfo } = useLanguage();
  const { t } = useTranslation();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [langModalOpen, setLangModalOpen] = useState(false);
  const [bookDropdownOpen, setBookDropdownOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; travelStyle?: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    try {
      const stored = localStorage.getItem("sanchari_user");
      if (stored) setUser(JSON.parse(stored));
    } catch (e) {}

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = pathname === "/" && !scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isTransparent
            ? "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4 text-white"
            : "bg-white/95 dark:bg-navy-dark/95 backdrop-blur-2xl py-3 border-b border-slate-200 dark:border-white/10 shadow-sm text-zinc-900 dark:text-zinc-100"
        )}
      >
        <div className="container-site flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <LogoIcon className="h-10 w-10 sm:h-12 sm:w-12 group-hover:scale-105" />
            <div className="flex flex-col justify-center">
              <span
                className={cn(
                  "font-display font-extrabold text-[1.1rem] sm:text-[1.3rem] tracking-tight leading-none group-hover:text-saffron transition-colors",
                  isTransparent ? "text-white" : "text-navy-deep dark:text-warm-white"
                )}
              >
                Sanchari
              </span>
              <span
                className={cn(
                  "font-display font-extrabold text-[1.1rem] sm:text-[1.3rem] tracking-tight leading-none group-hover:text-saffron transition-colors mt-[1px]",
                  isTransparent ? "text-white" : "text-navy-deep dark:text-warm-white"
                )}
              >
                Bharat
              </span>
              <span className="text-[8px] sm:text-[9px] font-mono text-[#FF9933] tracking-widest uppercase font-bold mt-[3px]">
                Explore Bharat
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1.5 text-xs font-semibold">
            <Link href="/destinations"
              className={cn(
                "px-3 py-2 rounded-xl transition hover:text-white",
                pathname.startsWith("/destinations")
                  ? "text-saffron font-bold"
                  : isTransparent
                  ? "text-white/90 hover:text-white"
                  : "text-zinc-700 dark:text-zinc-300"
              )}
            >
              {t("nav.destinations", "Destinations")}
            </Link>

            <Link href="/experiences"
              className={cn(
                "px-3 py-2 rounded-xl transition hover:text-white",
                pathname.startsWith("/experiences")
                  ? "text-saffron font-bold"
                  : isTransparent
                  ? "text-white/90 hover:text-white"
                  : "text-zinc-700 dark:text-zinc-300"
              )}
            >
              {t("nav.experiences", "Experiences")}
            </Link>

            <Link href="/events"
              className={cn(
                "px-3 py-2 rounded-xl transition hover:text-white",
                pathname.startsWith("/events")
                  ? "text-saffron font-bold"
                  : isTransparent
                  ? "text-white/90 hover:text-white"
                  : "text-zinc-700 dark:text-zinc-300"
              )}
            >
              {t("nav.events", "Events")}
            </Link>

            <Link href="/food"
              className={cn(
                "px-3 py-2 rounded-xl transition hover:text-white",
                pathname.startsWith("/food")
                  ? "text-saffron font-bold"
                  : isTransparent
                  ? "text-white/90 hover:text-white"
                  : "text-zinc-700 dark:text-zinc-300"
              )}
            >
              Food
            </Link>

            <Link href="/map"
              className={cn(
                "px-3 py-2 rounded-xl transition hover:text-white",
                pathname.startsWith("/map")
                  ? "text-saffron font-bold"
                  : isTransparent
                  ? "text-white/90 hover:text-white"
                  : "text-zinc-700 dark:text-zinc-300"
              )}
            >
              Map
            </Link>

            {/* Book Travel Dropdown */}
            <div className="relative group">
              <Link href="/book"
                className={cn(
                  "px-3 py-2 rounded-xl transition hover:text-white inline-flex items-center gap-1",
                  pathname.startsWith("/book")
                    ? "text-saffron font-bold"
                    : isTransparent
                    ? "text-white/90 hover:text-white"
                    : "text-zinc-700 dark:text-zinc-300"
                )}
              >
                <span>{t("nav.book", "Book")}</span>
                <ChevronDown className="h-3 w-3" />
              </Link>

              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-1 w-44 rounded-2xl bg-white dark:bg-navy-surface border border-slate-200 dark:border-white/10 shadow-2xl p-2 hidden group-hover:block space-y-1">
                <Link
                  href="/book/flights"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-zinc-800 dark:text-zinc-200"
                >
                  <Plane className="h-3.5 w-3.5 text-white" />
                  <span>Flights</span>
                </Link>
                <Link
                  href="/book/trains"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-zinc-800 dark:text-zinc-200"
                >
                  <Train className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Trains</span>
                </Link>
                <Link
                  href="/book/buses"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-zinc-800 dark:text-zinc-200"
                >
                  <Bus className="h-3.5 w-3.5 text-ai-violet" />
                  <span>Buses</span>
                </Link>
                <Link
                  href="/book/stays"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-zinc-800 dark:text-zinc-200"
                >
                  <Hotel className="h-3.5 w-3.5 text-blue-500" />
                  <span>Stays & Hotels</span>
                </Link>
              </div>
            </div>

            <Link
              href="/plan"
              className={cn(
                "px-3.5 py-1.5 rounded-xl border transition flex items-center gap-1.5 shadow-sm",
                pathname.startsWith("/plan")
                  ? "bg-ai-violet text-white border-ai-violet"
                  : "bg-ai-violet/10 border-ai-violet/30 text-ai-violet hover:bg-ai-violet hover:text-white"
              )}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI Planner</span>
            </Link>

            <Link href="/my-bookings"
              className={cn(
                "px-3 py-2 rounded-xl transition hover:text-white",
                pathname.startsWith("/my-bookings")
                  ? "text-saffron font-bold"
                  : isTransparent
                  ? "text-white/90 hover:text-white"
                  : "text-zinc-700 dark:text-zinc-300"
              )}
            >
              {t("nav.myBookings", "My Bookings")}
            </Link>
          </nav>

          {/* Controls: Search, Theme Toggle, Language, Auth */}
          <div className="flex items-center gap-2">
            {/* Search Icon */}
            <Link href="/search"
              className={cn(
                "p-2 rounded-xl border transition",
                isTransparent
                  ? "border-white/20 bg-white/10 text-white hover:border-saffron"
                  : "border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 hover:text-white"
              )}
              title="Global Search"
            >
              <Search className="h-4 w-4" />
            </Link>

            {/* Theme Switcher */}
            <ThemeToggle className="hidden sm:inline-flex" />

            {/* 23-Language Switcher */}
            <button
              type="button"
              onClick={() => setLangModalOpen(true)}
              className={cn(
                "px-2.5 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1 hover:border-saffron/50 transition cursor-pointer",
                isTransparent
                  ? "border-white/20 bg-white/10 text-white"
                  : "border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-zinc-800 dark:text-zinc-200"
              )}
              title="Change Language"
            >
              <Globe className="h-3.5 w-3.5 text-white" />
              <span>{languageInfo?.name.slice(0, 3).toUpperCase() || "EN"}</span>
            </button>

            {/* User Account / Auth */}
            {user ? (
              <button
                type="button"
                onClick={() => setProfileModalOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-saffron/40 bg-saffron/10 text-saffron text-xs font-bold cursor-pointer"
              >
                <User className="h-3.5 w-3.5" />
                <span className="hidden sm:inline max-w-[80px] truncate">{user.name}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setAuthModalOpen(true)}
                className="btn-primary !py-1.5 !px-3.5 text-xs font-bold cursor-pointer"
              >
                Sign In
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "p-2 rounded-xl border xl:hidden cursor-pointer",
                isTransparent
                  ? "border-white/20 bg-white/10 text-white"
                  : "border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300"
              )}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl xl:hidden flex flex-col justify-between p-6 overflow-y-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-display font-black text-xl text-warm-white">
                SANCHARI BHARAT
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-white/5 text-zinc-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-white/10">
              <span className="text-xs text-zinc-400 font-mono">Theme Mode:</span>
              <ThemeToggle />
            </div>

            <nav className="flex flex-col gap-2 font-display text-base font-bold text-white">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl hover:bg-white/5"
              >
                Home
              </Link>
              <Link
                href="/destinations"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl hover:bg-white/5"
              >
                Destinations
              </Link>
              <Link
                href="/experiences"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl hover:bg-white/5"
              >
                Experiences
              </Link>
              <Link
                href="/events"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl hover:bg-white/5"
              >
                Events & Festivals
              </Link>
              <Link
                href="/food"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl hover:bg-white/5 text-amber-400"
              >
                Food & Dining
              </Link>
              <Link
                href="/map"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl hover:bg-white/5"
              >
                Interactive Map
              </Link>
              <Link
                href="/plan"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl bg-ai-violet/20 border border-ai-violet/40 text-ai-violet"
              >
                ✨ AI Trip Planner
              </Link>
              <Link
                href="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl hover:bg-white/5 text-saffron"
              >
                ✈ Book Travel (Flights, Trains, Buses, Stays)
              </Link>
              <Link
                href="/my-bookings"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl hover:bg-white/5"
              >
                My Bookings
              </Link>
              <Link
                href="/saved-trips"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl hover:bg-white/5"
              >
                Saved Trips
              </Link>
            </nav>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setLangModalOpen(true);
              }}
              className="flex items-center gap-2 text-xs font-mono text-saffron"
            >
              <Globe className="h-4 w-4" />
              <span>{languageInfo?.name || "English"} (Change)</span>
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(u: any) => setUser(u)}
      />
      <UserProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        user={user}
        onLogout={() => setUser(null)}
      />
      <LanguageModal
        isOpen={langModalOpen}
        onClose={() => setLangModalOpen(false)}
      />
    </>
  );
}
