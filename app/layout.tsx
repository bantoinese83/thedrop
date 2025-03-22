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
  title: "The Drop - Hip Hop Newsletter",
  description: "Stay updated with the latest in hip-hop news, releases, and culture.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thedrop.com/",
    site_name: "The Drop",
    images: [
      {
        url: "https://thedrop.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Drop - Hip Hop Newsletter",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white`}
      >
        {children}
      </body>
    </html>
  );
}
