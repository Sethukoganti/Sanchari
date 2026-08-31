"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  Globe2,
  Menu,
  Search,
  TrainFront,
  X,
} from "lucide-react";
import { destinations, REGIONS, THEMES } from "@/data/content";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { LanguageModal } from "@/components/layout/LanguageModal";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const mainLinks = [
  { href: "/experiences", key: "experiences" as const },
  { href: "/plan", key: "plan" as const },
  { href: "/map", key: "map" as const },
  { href: "/stories", key: "stories" as const },
  { href: "/events", key: "events" as const },
  { href: "/gallery", key: "gallery" as const },
];

export function Header() {
  const pathname = usePathname();
  const { t, currentLanguage, openLanguageModal } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileDestOpen, setMobileDestOpen] = useState(false);

  const isHome = pathname === "/";
  const solid = scrolled || !isHome || mobileOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, searchOpen]);

  const featured = destinations.filter((d) => d.featured).slice(0, 4);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          solid
            ? "border-b border-saffron/20 bg-navy/90 text-white shadow-[0_12px_30px_rgba(0,0,0,0.45)] backdrop-blur-md"
            : "bg-transparent text-white",
        )}
      >
        <div className="container-site section-pad flex h-16 items-center justify-between gap-4 lg:h-20">
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            aria-label="Explore India home"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-saffron text-navy shadow-md">
              <TrainFront className="h-5 w-5" aria-hidden />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg tracking-wide sm:text-xl">
                Explore India
              </span>
              <span className="hidden text-[10px] uppercase tracking-[0.18em] text-turmeric sm:block">
                {t.tagline}
              </span>
            </span>
          </Link>

          <nav
            className="hidden items-center gap-1 xl:flex"
            aria-label="Primary"
          >
            <div
              className="relative"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <button
                type="button"
                className={cn(
                  "inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium transition hover:bg-white/10",
                  pathname.startsWith("/destinations") && "text-turmeric",
                )}
                aria-expanded={megaOpen}
                aria-haspopup="true"
                onClick={() => setMegaOpen((v) => !v)}
              >
                {t.nav.destinations}
                <ChevronDown className="h-4 w-4" aria-hidden />
              </button>
              {megaOpen ? (
                <div
                  className="absolute left-1/2 top-full z-50 w-[min(920px,70vw)] -translate-x-1/2 pt-3"
                  role="menu"
                >
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy shadow-2xl">
                    <div className="grid grid-cols-12 gap-0">
                      <div className="col-span-4 border-r border-warm-white/10 p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-turmeric">
                          By region
                        </p>
                        <ul className="mt-3 space-y-1">
                          {REGIONS.map((region) => (
                            <li key={region}>
                              <Link
                                href={`/destinations?region=${encodeURIComponent(region)}`}
                                className="block rounded-lg px-3 py-2 text-sm text-warm-white/85 hover:bg-warm-white/10 hover:text-warm-white"
                                role="menuitem"
                              >
                                {region}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-span-4 border-r border-warm-white/10 p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-turmeric">
                          By theme
                        </p>
                        <ul className="mt-3 space-y-1">
                          {THEMES.map((theme) => (
                            <li key={theme}>
                              <Link
                                href={`/destinations?theme=${encodeURIComponent(theme)}`}
                                className="block rounded-lg px-3 py-2 text-sm text-warm-white/85 hover:bg-warm-white/10 hover:text-warm-white"
                                role="menuitem"
                              >
                                {theme}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-span-4 p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-turmeric">
                          Featured now
                        </p>
                        <div className="mt-3 space-y-3">
                          {featured.map((d) => (
                            <Link
                              key={d.id}
                              href={`/destinations/${d.slug}`}
                              className="flex items-center gap-3 rounded-xl p-2 hover:bg-warm-white/10"
                              role="menuitem"
                            >
                              <span className="relative h-12 w-12 overflow-hidden rounded-lg">
                                <Image
                                  src={d.image}
                                  alt=""
                                  fill
                                  className="object-cover"
                                  sizes="48px"
                                />
                              </span>
                              <span>
                                <span className="block text-sm font-semibold text-warm-white">
                                  {d.name}
                                </span>
                                <span className="block text-xs text-warm-white/60">
                                  {d.state}
                                </span>
                              </span>
                            </Link>
                          ))}
                        </div>
                        <Link
                          href="/destinations"
                          className="mt-4 inline-flex text-sm font-semibold text-turmeric hover:underline"
                        >
                          Browse all destinations →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm font-medium transition hover:bg-white/10",
                  pathname.startsWith(link.href) && "text-turmeric",
                )}
              >
                {t.nav[link.key]}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-warm-white/10"
              aria-label={t.nav.search}
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={openLanguageModal}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-warm-white/20 bg-warm-white/10 px-3 py-1.5 text-xs font-semibold text-warm-white transition hover:border-turmeric hover:bg-warm-white/15"
              aria-label={`${t.nav.language}: ${currentLanguage.name} (${currentLanguage.nativeName})`}
              title="Change language / भाषा बदलें"
            >
              <span className="text-sm" aria-hidden>{currentLanguage.flag || "🌐"}</span>
              <span className="font-display font-medium tracking-wide max-w-[80px] sm:max-w-[120px] truncate">
                {currentLanguage.nativeName}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-warm-white/60" aria-hidden />
            </button>
            <ThemeToggle />
            <Link
              href="/plan"
              className="btn-primary hidden !px-4 !py-2 lg:inline-flex"
            >
              {t.home.plan}
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-warm-white/10 xl:hidden"
              aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <div
          className="fixed inset-0 z-40 bg-dusk-ink xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex h-full flex-col overflow-y-auto px-5 pb-10 pt-24">
            {/* Mobile Language Button */}
            <div className="mb-4 rounded-xl border border-warm-white/15 bg-board/60 p-3.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-turmeric">
                {t.nav.language} · भाषा
              </p>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openLanguageModal();
                }}
                className="mt-2 flex w-full items-center justify-between rounded-lg bg-warm-white/10 px-3.5 py-2.5 text-sm font-medium text-warm-white hover:bg-warm-white/20"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">{currentLanguage.flag}</span>
                  <span className="font-display text-base font-bold">{currentLanguage.nativeName}</span>
                  <span className="text-xs text-warm-white/60">({currentLanguage.name})</span>
                </div>
                <span className="text-xs font-semibold text-turmeric">Change →</span>
              </button>
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-between border-b border-warm-white/10 py-4 text-left text-lg text-warm-white"
              onClick={() => setMobileDestOpen((v) => !v)}
              aria-expanded={mobileDestOpen}
            >
              {t.nav.destinations}
              <ChevronDown
                className={cn(
                  "h-5 w-5 transition",
                  mobileDestOpen && "rotate-180",
                )}
              />
            </button>
            {mobileDestOpen ? (
              <div className="space-y-2 border-b border-warm-white/10 py-3 pl-3">
                {REGIONS.map((region) => (
                  <Link
                    key={region}
                    href={`/destinations?region=${encodeURIComponent(region)}`}
                    className="block py-2 text-warm-white/80"
                    onClick={() => setMobileOpen(false)}
                  >
                    {region}
                  </Link>
                ))}
                <Link
                  href="/destinations"
                  className="block py-2 font-semibold text-turmeric"
                  onClick={() => setMobileOpen(false)}
                >
                  All destinations
                </Link>
              </div>
            ) : null}

            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b border-warm-white/10 py-4 text-lg text-warm-white"
                onClick={() => setMobileOpen(false)}
              >
                {t.nav[link.key]}
              </Link>
            ))}
            <Link
              href="/about"
              className="border-b border-warm-white/10 py-4 text-lg text-warm-white"
              onClick={() => setMobileOpen(false)}
            >
              {t.nav.about}
            </Link>
            <Link
              href="/contact"
              className="border-b border-warm-white/10 py-4 text-lg text-warm-white"
              onClick={() => setMobileOpen(false)}
            >
              {t.nav.contact}
            </Link>
            <Link
              href="/plan"
              className="btn-primary mt-8 justify-center"
              onClick={() => setMobileOpen(false)}
            >
              {t.home.plan}
            </Link>
          </div>
        </div>
      ) : null}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <LanguageModal />
    </>
  );
}
