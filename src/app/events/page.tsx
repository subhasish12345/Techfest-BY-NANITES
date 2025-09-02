
"use client";

import { useState, useEffect } from "react";
import { EventCard } from "@/components/events/event-card";
import { Filters } from "@/components/events/filters";
import type { Event } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { events as dummyEvents } from "@/lib/data";


export default function EventsPage() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use dummy data directly
    setLoading(true);
    setAllEvents(dummyEvents);
    setFilteredEvents(dummyEvents);
    setLoading(false);
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold text-primary sm:text-5xl">
          Event Catalog
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Discover your next challenge. Filter by category, day, or search by name.
        </p>
      </div>
      <Filters allEvents={allEvents} setFilteredEvents={setFilteredEvents} />

      {loading ? (
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 [grid-auto-rows:auto]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[200px] w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 [grid-auto-rows:auto]">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="mt-12 text-center">
            <p className="text-lg text-muted-foreground">No events found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

    