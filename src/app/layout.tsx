import type { Metadata } from "next";
import { Inter, Anton, Caveat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500"] });
const anton = Anton({ subsets: ["latin"], variable: "--font-anton", weight: "400" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "Creative & Digital Agency in Coimbatore | Branding, Web & AI Marketing - Creatoos",
  description:
    "Creatoos is a Coimbatore-based creative and technology studio. Branding, web and app development, digital marketing, SEO and AI search optimisation for growing businesses.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${anton.variable} ${caveat.variable}`}>
      <body suppressHydrationWarning>
        <SmoothScroll />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
