import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import { CountdownTimer } from "./countdown-timer";
import { MeteorShower } from "./meteor-shower";

export function Hero() {
  const festDate = new Date("2024-10-26T09:00:00");

  return (
    <div className="relative isolate h-screen min-h-[600px] overflow-hidden flex items-center justify-center text-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-20"
        src="/videos/bgvideo.mp4"
      >
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-background/70 -z-10 backdrop-blur-sm"></div>
      <MeteorShower />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-white sm:text-6xl animate-hero-text [animation-delay:200ms]">
          TechFest <span className="text-primary">2024</span>
        </h1>
        <p className="mt-6 font-body text-lg leading-8 text-gray-300 max-w-2xl mx-auto animate-hero-text [animation-delay:400ms]">
          The ultimate celebration of technology, innovation, and creativity.
          Join us for three days of mind-blowing events.
        </p>
        <div className="mt-10 animate-hero-text [animation-delay:600ms]">
          <CountdownTimer targetDate={festDate} />
        </div>
        <div className="mt-10 flex items-center justify-center gap-x-6 animate-hero-text [animation-delay:800ms]">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 glow-shadow" asChild>
                <Link href="/auth?form=signup">
                    Register Now
                    <Rocket className="ml-2 h-5 w-5" />
                </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
                <Link href="/events">
                    View Events &rarr;
                </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
