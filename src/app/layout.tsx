import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import MobileDisclaimer from "@/components/MobileDisclaimer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Google Sans Display is not on Google Fonts CDN; fallback to Inter via variable
// If you add the local font files under src/fonts, this will pick them up.
const googleSans = Inter({
  variable: "--font-google-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Cosas Reales — Samuel Martos",
  description:
    "Samuel Martos — Visual Artist & Creative Director. Portfolio, projects, manifesto, archive.",
  metadataBase: new URL("https://cosas-reales.com"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${googleSans.variable} h-full`}
    >
      <body className="min-h-full">
        <LanguageProvider>
          {children}
          <MobileDisclaimer />
        </LanguageProvider>
      </body>
    </html>
  );
}
