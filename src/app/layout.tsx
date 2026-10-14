import type { Metadata, Viewport } from "next";
import { Inter, Anton, Caveat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL, organizationLd, pageMeta, websiteLd } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500"] });
const anton = Anton({ subsets: ["latin"], variable: "--font-anton", weight: "400" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", weight: ["400", "500"] });

const home = pageMeta(
  "/",
  "Creative & Digital Agency in Coimbatore | Branding, Web & AI Marketing - Creatoos",
  "Creatoos is a Coimbatore-based creative and technology studio. Branding, web and app development, digital marketing, SEO and AI search optimisation for growing businesses.",
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
    <html lang="en-IN" suppressHydrationWarning className={`${inter.variable} ${anton.variable} ${caveat.variable}`}>
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM summary" />
      </head>
      <body suppressHydrationWarning>
        <JsonLd data={[organizationLd, websiteLd]} />
        <SmoothScroll />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
