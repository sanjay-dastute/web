import { ImageResponse } from "next/og";

export const alt = "Creatoos - Brands built to be understood. Fast.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social share card in the site's light-sky style.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: 72, background: "linear-gradient(180deg, #a9c3e0 0%, #c9dbee 45%, #e9f1f9 80%, #ffffff 100%)",
          color: "#1b1b1b", fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 36, display: "flex" }}>
          creatoos<span style={{ color: "#426188" }}>.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, lineHeight: 1, letterSpacing: -2 }}>Brands built to be</div>
          <div style={{ fontSize: 88, lineHeight: 1.1, letterSpacing: -2, color: "#426188", fontStyle: "italic" }}>understood. Fast.</div>
        </div>
        <div style={{ fontSize: 26, color: "rgba(27,27,27,.7)", display: "flex" }}>
          Branding · Web & Apps · Marketing · SEO · AI Search - Coimbatore, India
        </div>
      </div>
    ),
    size,
  );
}
