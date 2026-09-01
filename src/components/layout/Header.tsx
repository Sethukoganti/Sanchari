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
} from "lucide-react";
import { AuthModal } from "@/components/auth/AuthModal";
import { UserProfileModal } from "@/components/auth/UserProfileModal";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Experiences", href: "/experiences" },
  { label: "Events & Festivals", href: "/events" },
  { label: "AI Trip Planner", href: "/plan", highlight: true },
  { label: "Saved Trips", href: "/saved-trips" },
  { label: "Local Businesses", href: "/businesses" },
  { label: "Travel Smart", href: "/travel-smart" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; travelStyle?: string } | null>(null);
  const [language, setLanguage] = useState<"EN" | "HI">("EN");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    try {
      const stored = localStorage.getItem("sanchari_user");
      if (stored) setUser(JSON.parse(stored));
      const storedLang = localStorage.getItem("sanchari_lang");
      if (storedLang === "HI") setLanguage("HI");
    } catch (e) {}

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleLang = () => {
    const newLang = language === "EN" ? "HI" : "EN";
    setLanguage(newLang);
    localStorage.setItem("sanchari_lang", newLang);
  };

  const handleLogout = () => {
    localStorage.removeItem("sanchari_user");
    setUser(null);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          scrolled
            ? "bg-navy-dark/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3"
            : "bg-gradient-to-b from-navy-dark/95 via-navy-dark/80 to-transparent py-4"
        )}
      >
        <div className="container-site flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-saffron to-amber-600 text-black font-display font-black text-xl shadow-lg shadow-saffron/20 group-hover:scale-105 transition">
              SB
            </div>
            <div>
              <span className="font-display text-lg sm:text-xl font-black tracking-tight text-warm-white group-hover:text-saffron transition-colors block leading-tight">
                SANCHARI BHARAT
              </span>
              <span className="font-mono text-[10px] text-saffron uppercase font-bold tracking-widest block leading-none">
                Explore India
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1.5 text-xs font-semibold">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5",
                    link.highlight
                      ? "bg-gradient-to-r from-saffron/20 to-ai-violet/20 border border-saffron/40 text-saffron font-bold hover:brightness-110 shadow-sm"
                      : isActive
                      ? "bg-white/10 text-warm-white font-bold"
                      : "text-muted-gray hover:text-warm-white hover:bg-white/5"
                  )}
                >
                  {link.highlight && <Sparkles className="h-3.5 w-3.5" />}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2.5">
            {/* Search Link */}
            <Link
              href="/search"
              aria-label="Search destinations, experiences, and events"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-muted-gray hover:text-white hover:border-saffron/40 transition"
              title="Search Sanchari Bharat"
            >
              <Search className="h-4 w-4" />
            </Link>

            {/* Language Switcher */}
            <button
              type="button"
              onClick={handleToggleLang}
              className="hidden sm:flex items-center gap-1.5 h-9 px-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono font-bold text-warm-white hover:border-saffron/40 transition cursor-pointer"
              title="Change Language"
            >
              <Globe className="h-3.5 w-3.5 text-emerald-accent" />
              <span>{language}</span>
            </button>

            {/* User Account Trigger */}
            {user ? (
              <button
                type="button"
                onClick={() => setProfileModalOpen(true)}
                className="flex items-center gap-2 h-9 px-3 rounded-xl bg-saffron/15 border border-saffron/30 text-xs font-bold text-warm-white hover:bg-saffron/25 transition cursor-pointer"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-saffron text-black text-[10px]">
                  {user.name[0]?.toUpperCase()}
                </div>
                <span className="hidden sm:inline max-w-[100px] truncate">{user.name}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setAuthModalOpen(true)}
                className="btn-primary !py-2 !px-3.5 text-xs flex items-center gap-1.5"
              >
                <User className="h-3.5 w-3.5" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Hamburger Menu */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex xl:hidden h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-muted-gray hover:text-white cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-white/10 bg-navy-dark/95 backdrop-blur-2xl px-6 py-6 space-y-4 animate-fade-in shadow-2xl">
            <nav className="grid grid-cols-2 gap-2 text-xs font-semibold">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "p-3 rounded-xl border flex items-center gap-2 transition",
                    link.highlight
                      ? "bg-saffron/15 border-saffron/40 text-saffron font-bold"
                      : "bg-navy-surface/60 border-white/5 text-muted-gray hover:text-white"
                  )}
                >
                  {link.highlight ? <Sparkles className="h-4 w-4" /> : <Compass className="h-4 w-4" />}
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>

            <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs">
              <button
                type="button"
                onClick={handleToggleLang}
                className="flex items-center gap-1.5 text-muted-gray hover:text-white cursor-pointer"
              >
                <Globe className="h-4 w-4 text-emerald-accent" />
                <span>Language: <strong className="text-warm-white">{language === "EN" ? "English" : "हिन्दी"}</strong></span>
              </button>
              <span className="text-[10px] font-mono text-saffron">SANCHARI BHARAT</span>
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(u) => setUser(u)}
      />

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        user={user}
        onLogout={handleLogout}
      />
    </>
  );
}
