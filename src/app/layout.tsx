import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CV DADE PERSADATAMA - Konstruksi Gedung Kesehatan",
  description: "CV DADE PERSADATAMA adalah perusahaan konstruksi profesional yang berfokus pada pembangunan gedung kesehatan berkualitas tinggi di Tana Toraja, Sulawesi Selatan.",
  keywords: ["konstruksi", "gedung kesehatan", "rumah sakit", "klinik", "puskesmas", "laboratorium", "Tana Toraja", "Sulawesi Selatan", "CV DADE PERSADATAMA"],
  authors: [{ name: "CV DADE PERSADATAMA" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "CV DADE PERSADATAMA - Konstruksi Gedung Kesehatan",
    description: "Membangun infrastruktur kesehatan berkualitas dengan sentuhan kreatif dan strategi pemasaran digital yang efektif",
    url: "https://dade-persadatama.vercel.app",
    siteName: "CV DADE PERSADATAMA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CV DADE PERSADATAMA - Konstruksi Gedung Kesehatan",
    description: "Membangun infrastruktur kesehatan berkualitas dengan sentuhan kreatif",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
