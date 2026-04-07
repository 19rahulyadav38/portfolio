import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://rahulyadav.dev"), // Consider replacing with your actual domain
  title: {
    default: "Rahul Yadav | Senior Software Engineer",
    template: "%s | Rahul Yadav",
  },
  description:
    "Portfolio of Rahul Yadav, a Senior Software Engineer specializing in React, React Native, and high-performance applications with a 99.9% crash-free rate.",
  keywords: [
    "Rahul Yadav",
    "Senior Software Engineer",
    "React Native Expert",
    "Frontend Architect",
    "Next.js Developer",
    "TypeScript",
    "Performance Optimization",
  ],
  authors: [
    { name: "Rahul Yadav", url: "https://www.linkedin.com/in/rahulyadav19/" },
    { name: "Rahul Yadav", url: "https://github.com/your_github_username" }
  ],
  creator: "Rahul Yadav",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rahulyadav.dev",
    title: "Rahul Yadav | Senior Software Engineer",
    description: "Architecting Scalable Apps for Millions of Users. Explore my portfolio and projects.",
    siteName: "Rahul Yadav Portfolio",
    images: [
      {
        url: "/images/photo.jpeg", // Using your profile picture for OG share image
        width: 1200,
        height: 630,
        alt: "Rahul Yadav - Senior Software Engineer",
      },
    ],
  },
  other: {
    "github:account": "your_github_username",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
