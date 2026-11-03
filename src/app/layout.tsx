import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import WhatsAppFab from "@/components/WhatsAppFab";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL, organizationLd, pageMeta, websiteLd } from "@/lib/seo";

// Bundle fonts so production builds do not depend on Google Fonts responses.
const inter = localFont({ src: "./fonts/Inter.ttf", variable: "--font-inter", weight: "100 900", display: "swap" });
const anton = localFont({ src: "./fonts/Anton.ttf", variable: "--font-anton", weight: "400", display: "swap" });
// Lighter condensed face for the AI difference headline, where Anton reads too heavy.
const oswald = localFont({ src: "./fonts/Oswald.ttf", variable: "--font-oswald", weight: "200 700", display: "swap" });
const caveat = localFont({ src: "./fonts/Caveat.ttf", variable: "--font-caveat", weight: "400 700", display: "swap" });

const home = pageMeta(
  "/",
  "Creatoos | Creative & Digital Marketing Agency, Coimbatore",
  "Coimbatore creative and technology studio: branding, websites, apps, digital marketing, SEO and AI search optimisation for growing businesses.",
);

export const metadata: Metadata = {
  ...home,
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  keywords: [
    "creative agency Coimbatore", "branding agency Tamil Nadu", "digital marketing agency Coimbatore",
    "web development Coimbatore", "logo design Coimbatore", "app development Coimbatore",
    "SEO services Coimbatore", "AEO services India", "GEO optimisation", "AI search optimisation",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Marketing & Design Agency",
  formatDetection: { telephone: true, email: true, address: true },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  other: { "geo.region": "IN-TN", "geo.placename": "Coimbatore" },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning className={`${inter.variable} ${anton.variable} ${oswald.variable} ${caveat.variable}`}>
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM summary" />
      </head>
      <body suppressHydrationWarning>
        <JsonLd data={[organizationLd, websiteLd]} />
        <Loader />
        <SmoothScroll />
        <Nav />
        <main>{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
