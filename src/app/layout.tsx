import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { FloatingControls } from "@/components/layout/FloatingControls";
import { LanguageProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { GoogleTranslateEngine } from "@/components/i18n/GoogleTranslateEngine";
import { SITE } from "@/data/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} – ${SITE.subName} · ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "SANCHARI BHARAT",
    "Explore India",
    "Book Flights India",
    "IRCTC Train Booking",
    "Bus Booking India",
    "Heritage Hotel Booking",
    "AI Trip Planner India",
    "Indian Travel Guide",
    "Indian Festivals",
    "Hidden Gems India",
    "Sustainable Tourism India",
  ],
  authors: [{ name: "Sanchari Bharat Editorial" }],
  creator: "Sanchari Bharat",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE.name,
    title: `${SITE.name} – ${SITE.subName} · ${SITE.tagline}`,
    description: SITE.description,
    images: [
      {
        url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "SANCHARI BHARAT — AI-Powered India Travel & Discovery Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} – ${SITE.subName} · ${SITE.tagline}`,
    description: SITE.description,
    images: ["https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE.name,
    alternateName: "Sanchari Bharat Explore India",
    description: SITE.description,
    url: SITE.url,
    logo: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=300&q=80",
    sameAs: [
      "https://twitter.com",
      "https://instagram.com",
      "https://facebook.com",
      "https://youtube.com",
    ],
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen font-body antialiased selection:bg-saffron/30 selection:text-white transition-colors duration-300">
        <ThemeProvider>
          <LanguageProvider>
            <GoogleTranslateEngine />
            <Header />
            <main id="main-content" className="relative min-h-[calc(100vh-80px)]">
              {children}
            </main>
            <Footer />
            <FloatingControls />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
