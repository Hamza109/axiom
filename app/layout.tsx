import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import PulseSection from "@/components/PulseSection";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import StoreProvider from "@/lib/store/StoreProvider";
import QueryProvider from "@/lib/react-query/QueryProvider";
import { RemixIconLoader } from "@/components/RemixIconLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Optimize font loading
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Axiom - Crypto Trading Dashboard",
  description: "Professional crypto trading dashboard with real-time analytics",
  keywords: ["crypto", "trading", "dashboard", "analytics", "solana", "tokens"],
  authors: [{ name: "Axiom Team" }],
  creator: "Axiom",
  publisher: "Axiom",
  // Open Graph (Social sharing)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://axiom.trade",
    title: "Axiom - Crypto Trading Dashboard",
    description:
      "Professional crypto trading dashboard with real-time analytics",
    siteName: "Axiom",
  },
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Axiom - Crypto Trading Dashboard",
    description:
      "Professional crypto trading dashboard with real-time analytics",
    creator: "@axiom",
  },
  // SEO
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Canonical URL
  alternates: {
    canonical: "https://axiom.trade",
  },
  // Viewport (already handled by Next.js, but explicit for SEO)
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  // Theme color for mobile browsers
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#090909" },
  ],
  // Resource hints for performance optimization
  other: {
    "dns-prefetch":
      "https://fonts.googleapis.com https://fonts.gstatic.com https://axiom.trade https://axiomtrading.sfo3.cdn.digitaloceanspaces.com https://picsum.photos",
  },
};

/**
 * Root Layout Component
 *
 * Features:
 * - Error boundary for graceful error handling
 * - Optimized font loading with swap display
 * - Proper semantic HTML structure
 * - Accessibility considerations
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='dark'>
      <head>
        {/* Preconnect to external domains - Critical for LCP optimization */}
        <link
          rel='preconnect'
          href='https://fonts.googleapis.com'
          crossOrigin='anonymous'
        />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        {/* DNS prefetch for image CDNs - Moves requests out of critical path */}
        <link rel='dns-prefetch' href='https://axiom.trade' />
        <link
          rel='dns-prefetch'
          href='https://axiomtrading.sfo3.cdn.digitaloceanspaces.com'
        />
        <link rel='dns-prefetch' href='https://picsum.photos' />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RemixIconLoader />
        <ErrorBoundary>
          <StoreProvider>
            <QueryProvider>
              <Header />
              <main className='pt-[60px]'>
                <Sidebar />
                <PulseSection />
                {children}
              </main>
            </QueryProvider>
          </StoreProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
