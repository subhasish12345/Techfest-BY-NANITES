import { Hero } from "@/components/landing/hero";
import { EventCategories } from "@/components/landing/event-categories";
import { ScheduleTimeline } from "@/components/landing/schedule-timeline";
import { Sponsors } from "@/components/landing/sponsors";
import { LiveUpdates } from "@/components/landing/live-updates";
import { Gallery } from "@/components/landing/gallery";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <EventCategories />
        <Separator className="my-16 md:my-24 bg-primary/20" />
        <ScheduleTimeline />
        <Separator className="my-16 md:my-24 bg-primary/20" />
        <Sponsors />
        <Separator className="my-16 md:my-24 bg-primary/20" />
        <LiveUpdates />
        <Separator className="my-16 md:my-24 bg-primary/20" />
        <Gallery />
      </div>
    </div>
  );
}
