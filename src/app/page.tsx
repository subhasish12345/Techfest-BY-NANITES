import { Hero } from "@/components/landing/hero";
import { EventCategories } from "@/components/landing/event-categories";
import { ScheduleTimeline } from "@/components/landing/schedule-timeline";
import { Sponsors } from "@/components/landing/sponsors";
import { LiveUpdates } from "@/components/landing/live-updates";
import { Gallery } from "@/components/landing/gallery";
import { Separator } from "@/components/ui/separator";
import { FadeIn } from "@/components/ui/fade-in";


export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <EventCategories />
        </FadeIn>
        <Separator className="my-16 md:my-24 bg-primary/20" />
        <FadeIn>
          <ScheduleTimeline />
        </FadeIn>
        <Separator className="my-16 md:my-24 bg-primary/20" />
        <FadeIn>
          <Sponsors />
        </FadeIn>
        <Separator className="my-16 md:my-24 bg-primary/20" />
        <FadeIn>
          <LiveUpdates />
        </FadeIn>
        <Separator className="my-16 md:my-24 bg-primary/20" />
        <FadeIn>
          <Gallery />
        </FadeIn>
      </div>
    </div>
  );
}
