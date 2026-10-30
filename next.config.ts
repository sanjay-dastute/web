import type { NextConfig } from "next";

// Sent with every response. The CSP allows inline scripts and styles because Next.js injects both.
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'" + (process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""),
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self' blob: data:",
      "worker-src 'self' blob:",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self' https://wa.me",
      "object-src 'none'",
    ].join("; "),
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

// Old WordPress URLs on creatoos.com, mapped to their new pages so links and rankings carry over.
const legacy: [string, string][] = [
  ["/portfolio", "/work"],
  ["/portfolio-2", "/work"],
  ["/portfolio-3", "/work"],
  ["/portfolio/:path*", "/work"],
  ["/services/item/:path*", "/services"],
  ["/team", "/about"],
  ["/terms-and-conditions", "/terms"],
  ["/cookies-policy", "/privacy-policy"],
  ["/blog", "/"],
  ["/category/:path*", "/"],
  ["/2023/:path*", "/"],
  ["/2024/:path*", "/"],
  ["/sample-page", "/"],
  ["/hf_templates/:path*", "/"],
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return legacy.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
