import { schedule } from "@/lib/data";
import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ScheduleTimeline() {
  return (
    <section className="py-16 md:py-24">
      <div className="text-center">
        <h2 className="font-headline text-3xl font-bold text-primary sm:text-4xl">
          Fest Schedule
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          A glimpse into the action-packed days of TechFest 2024.
        </p>
      </div>
      <div className="relative mt-12">
        <div
          className="absolute left-1/2 -ml-[2px] h-full w-1 bg-primary/20"
          aria-hidden="true"
        ></div>
        <div className="space-y-12">
          {schedule.map((item, index) => (
            <div
              key={item.title}
              className="relative flex items-center"
            >
              <div
                className={`flex w-1/2 ${
                  index % 2 === 0 ? "justify-end pr-8" : "justify-start pl-8"
                }`}
              >
                {index % 2 === 0 && <ScheduleCard {...item} />}
              </div>
              <div className="absolute left-1/2 -ml-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-accent ring-8 ring-background">
                <Clock className="h-4 w-4 text-accent-foreground" />
              </div>
              <div
                className={`flex w-1/2 ${
                  index % 2 !== 0 ? "justify-start pl-8" : "justify-end pr-8"
                }`}
              >
                {index % 2 !== 0 && <ScheduleCard {...item} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScheduleCard({ time, title, description }: { time: string, title: string, description: string }) {
  return (
    <Card className="w-full max-w-sm transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 bg-card border-primary/20">
      <CardHeader>
        <p className="font-code text-sm text-accent">{time}</p>
        <CardTitle className="font-headline text-xl text-primary-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
