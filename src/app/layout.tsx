import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionConfig } from "@/components/MotionConfig";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rahulyadav-dev.vercel.app/"),
  title: {
    default: "Rahul Yadav | Lead Software Engineer",
    template: "%s | Rahul Yadav",
  },
  description:
    "Portfolio of Rahul Yadav, a Lead Software Engineer building real-time, high-performance React Native and React apps, with a ~99% fatal-crash reduction and 99.9% crash-free sessions.",
  keywords: [
    "Rahul Yadav",
    "Lead Software Engineer",
    "React Native Expert",
    "Frontend Architect",
    "Next.js Developer",
    "TypeScript",
    "Performance Optimization",
  ],
  authors: [
    { name: "Rahul Yadav", url: "https://www.linkedin.com/in/rahulyadav19/" },
    { name: "Rahul Yadav", url: "https://github.com/19rahulyadav38" }
  ],
  creator: "Rahul Yadav",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rahulyadav-dev.vercel.app/",
    title: "Rahul Yadav | Lead Software Engineer",
    description: "Real-time web and mobile apps that millions rely on. Explore my work, impact and projects.",
    siteName: "Rahul Yadav Portfolio",
  },
  other: {
    "github:account": "19rahulyadav38",
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MotionConfig>{children}</MotionConfig>
      </body>
    </html>
  );
}
