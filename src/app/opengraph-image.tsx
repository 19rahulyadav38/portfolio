import { ImageResponse } from "next/og";

export const alt = "Rahul Yadav - Lead Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "radial-gradient(circle at 70% 40%, #2a0a66 0%, #0a0a0a 60%)",
          color: "#ededed",
        }}
      >
        <div style={{ fontSize: 36, color: "#a1a1aa", marginBottom: 24 }}>Rahul Yadav</div>
        <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>
          Real-time mobile apps that
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1, color: "#a78bfa" }}>
          millions rely on.
        </div>
        <div style={{ fontSize: 32, color: "#a1a1aa", marginTop: 40 }}>
          Lead Software Engineer · React Native · React
        </div>
      </div>
    ),
    size
  );
}
