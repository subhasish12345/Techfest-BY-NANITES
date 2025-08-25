
"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { EventCard } from "@/components/events/event-card";
import { Filters } from "@/components/events/filters";
import type { Event } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { events as dummyEvents } from "@/lib/data";

async function getEvents(): Promise<Event[]> {
  try {
    const eventsCollection = collection(db, "events");
    const eventSnapshot = await getDocs(eventsCollection);
    
    if (!eventSnapshot.empty) {
      const eventList = eventSnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Event)
      );
      return eventList;
    }
  } catch (error) {
    console.error("Error fetching events from Firestore:", error);
  }
  
  // Fallback to dummy data if Firestore is empty or fails
  console.log("Firestore is empty or failed to fetch, using fallback dummy data.");
  return dummyEvents;
}


export default function EventsPage() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const events = await getEvents();
      setAllEvents(events);
      setFilteredEvents(events);
      setLoading(false);
    };
    fetchEvents();
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
