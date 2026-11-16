import { ImageResponse } from "next/og";

export const alt = "Ederox — Technologie die jouw bedrijf vooruithelpt";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: "linear-gradient(135deg, #0B1226 0%, #16224a 60%, #2a3f9e 100%)", color: "white", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>
          ederox<span style={{ color: "#4169FF" }}>.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 22, letterSpacing: 4, color: "#9fb3ff", textTransform: "uppercase" }}>Jouw partner in technologie</div>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, marginTop: 20, letterSpacing: -2 }}>Technologie die jouw bedrijf vooruithelpt.</div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "rgba(255,255,255,0.6)" }}>Automatisering · Software op maat · Websites · Systeemintegraties</div>
      </div>
    ),
    size,
  );
}
