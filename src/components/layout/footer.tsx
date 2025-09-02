
"use client";

import Link from "next/link";
import { Code, Twitter, Github, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";
import { FadeIn } from "../ui/fade-in";

export function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // This effect ensures the year is set on the client-side to avoid hydration mismatches,
    // though for getFullYear() it's less of an issue than for other Date methods.
    setYear(new Date().getFullYear());
  }, []);

  return (
    <FadeIn>
      <footer className="border-t border-primary/20 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <Code className="h-8 w-8 text-primary" />
              <span className="font-headline text-xl font-bold text-primary">
                NANITES
              </span>
            </div>
            <div className="text-sm text-muted-foreground text-center">
              <p>© 2024 NANITES TechFest. All rights reserved.</p>
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="https://x.com/Subhunew1Nayak?t=etWteaHNxNcUim6I600csQ&s=09" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary hover:scale-110" />
              </Link>
              <Link href="https://github.com/subhasish12345" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <Github className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary hover:scale-110" />
              </Link>
              <Link href="https://www.linkedin.com/in/subhasish-nayak-67a257280?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-6 w-6 text-muted-foreground transition-colors hover:text-primary hover:scale-110" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </FadeIn>
  );
}
