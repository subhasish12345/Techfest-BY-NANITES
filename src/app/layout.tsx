
"use client";

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import type { Metadata } from "next";
import { Inter, Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AuthProvider } from "@/hooks/use-auth";
import { PageLoader } from '@/components/layout/page-loader';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

// Metadata cannot be exported from a client component, so we define it here.
// In a real app, you'd move layout logic to a client component inside the server layout.
// export const metadata: Metadata = {
//   title: "TechFest by NANITES",
//   description: "The ultimate celebration of technology, innovation, and creativity.",
// };

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // This is a simplified approach. For a more robust solution,
    // you might use Next.js's router events if your app gets more complex.
    setLoading(false);
  }, [pathname]);

  // This is a placeholder to simulate the start of a page load.
  // In a real app, you would integrate this with router events.
  // For now, we'll just show it briefly on initial load for demonstration.
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1500); // Hide after 1.5s
    return () => clearTimeout(timer);
  }, []);

  return (
    <body
      className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable} font-body antialiased bg-gradient-animated`}
    >
      <AuthProvider>
        {loading && <PageLoader />}
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </AuthProvider>
    </body>
  );
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>TechFest by NANITES</title>
        <meta name="description" content="The ultimate celebration of technology, innovation, and creativity." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Inter:wght@400;600&family=JetBrains+Mono&display=swap" rel="stylesheet" />
      </head>
      <RootLayoutContent>{children}</RootLayoutContent>
    </html>
  );
}
