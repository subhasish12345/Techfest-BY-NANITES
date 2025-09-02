
"use client";

import { schedule as fullSchedule } from "@/lib/data";
import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import type { ScheduleItem } from "@/lib/types";


const parseScheduleTime = (item: ScheduleItem): Date => {
  // Base date for the festival
  const baseDate = new Date("2024-10-26T00:00:00");
  if (item.time.startsWith("Day 2")) {
    baseDate.setDate(baseDate.getDate() + 1);
  }

  // Extract time part, e.g., "09:00 AM"
  const timeString = item.time.split(" - ")[1];
  let [hours, minutes] = timeString.match(/\d+/g)!.map(Number);
  const isPM = timeString.includes("PM");

  if (isPM && hours < 12) {
    hours += 12;
  }
  if (!isPM && hours === 12) { // Handle 12:xx AM
    hours = 0;
  }
  
  baseDate.setHours(hours, minutes, 0, 0);
  return baseDate;
};


export function ScheduleTimeline() {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  
  useEffect(() => {
    const updateSchedule = () => {
      const now = new Date();
      const upcoming = fullSchedule
        .filter(item => parseScheduleTime(item) >= now)
        .slice(0, 6);
      setSchedule(upcoming);
    };

    updateSchedule(); // Initial call
    const intervalId = setInterval(updateSchedule, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);
  
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
        {schedule.length > 0 ? (
          <>
            <div
              className="absolute left-1/2 -ml-[2px] h-full w-1 bg-primary/20"
              aria-hidden="true"
            ></div>
            <div className="space-y-12">
              {schedule.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
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
          </>
        ) : (
          <div className="text-center text-muted-foreground">
             <p>The fest has concluded. Thank you for participating!</p>
          </div>
        )}
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
