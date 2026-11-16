import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { MotionProvider } from "@/components/MotionProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { site } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Ederox — Technologie die jouw bedrijf vooruithelpt",
    template: "%s | Ederox",
  },
  description: site.description,
  applicationName: "Ederox",
  keywords: ["automatisering", "software op maat", "website laten maken", "systeemintegraties", "AI voor mkb", "technologiepartner", "digitalisering"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: site.url,
    siteName: "Ederox",
    title: "Ederox — Technologie die jouw bedrijf vooruithelpt",
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: "Ederox — Technologie die jouw bedrijf vooruithelpt", description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F8F9FC",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ederox",
  url: site.url,
  description: site.description,
  areaServed: "NL",
  knowsAbout: ["Automatisering", "Kunstmatige intelligentie", "Software op maat", "Websites", "Systeemintegraties"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <MotionProvider>
          <ScrollProgress />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
