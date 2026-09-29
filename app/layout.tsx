import type { Metadata } from "next";
import {
  DM_Serif_Display,
  Outfit,
  Playfair_Display,
  Cormorant_Garamond,
  Great_Vibes,
  Inter,
} from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBookingBar } from "@/components/MobileBookingBar";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-cursive",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://ahambrahmasmi.in"
  ),
  title: {
    default: "Ahambrahmasmi by Ambika — 1-to-1 Law of Attraction Coaching",
    template: "%s — Ahambrahmasmi by Ambika",
  },
  description:
    "Intimate, one-to-one 5-week Law of Attraction coaching with Ambika Mohan. One path. Paid in full. One to one.",
  openGraph: {
    title: "Ahambrahmasmi by Ambika — 1-to-1 Law of Attraction Coaching",
    description:
      "A journey of self discovery. Intimate 1-to-1 Law of Attraction coaching with Ambika Mohan.",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ahambrahmasmi by Ambika — 1-to-1 Law of Attraction Coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahambrahmasmi by Ambika — 1-to-1 Law of Attraction Coaching",
    description:
      "A journey of self discovery. Intimate 1-to-1 Law of Attraction coaching with Ambika Mohan.",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
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
      className={`${dmSerif.variable} ${outfit.variable} ${playfair.variable} ${cormorant.variable} ${greatVibes.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-cream text-ink font-sans antialiased">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <MobileBookingBar />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
