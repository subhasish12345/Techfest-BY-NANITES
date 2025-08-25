
"use client";

import { useState, useEffect } from "react";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import type { Event } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export function MySchedule() {
  const { userData, loading: authLoading } = useAuth();
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      if (!userData?.registeredEvents || userData.registeredEvents.length === 0) {
        setRegisteredEvents([]);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        const eventsData: Event[] = [];
        // Firestore 'in' query is limited to 10 items. We fetch docs one by one.
        // For larger scale, a different approach might be needed.
        for (const eventId of userData.registeredEvents) {
          const eventDocRef = doc(db, 'events', eventId);
          const eventDoc = await getDoc(eventDocRef);
          if(eventDoc.exists()){
            eventsData.push({ id: eventDoc.id, ...eventDoc.data() } as Event);
          }
        }
        setRegisteredEvents(eventsData);
      } catch (error) {
        console.error("Error fetching registered events: ", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (!authLoading) {
        fetchRegisteredEvents();
    }
  }, [userData, authLoading]);

  const renderSkeleton = () => (
    <Table>
      <TableHeader>
        <TableRow>
            <TableHead>Event</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(3)].map((_, i) => (
            <TableRow key={i}>
                <TableCell><Skeleton className="h-5 w-3/4" /></TableCell>
                <TableCell><Skeleton className="h-5 w-1/2" /></TableCell>
                <TableCell><Skeleton className="h-5 w-1/2" /></TableCell>
                <TableCell><Skeleton className="h-5 w-1/4" /></TableCell>
            </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Card className="bg-card border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">My Registered Events</CardTitle>
        <CardDescription>
          Your personalized timeline for TechFest 2024.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? renderSkeleton() : registeredEvents.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registeredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium text-primary-foreground">{event.title}</TableCell>
                  <TableCell>
                      <Badge variant="outline" className="border-accent text-accent font-code">{event.category}</Badge>
                  </TableCell>
                  <TableCell className="font-code">{event.date}, {event.time}</TableCell>
                  <TableCell>
                    <Badge className="bg-accent text-accent-foreground">Registered</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-muted-foreground">You haven't registered for any events yet. Check out the <a href="/events" className="text-primary underline">event catalog</a>!</p>
        )}
      </CardContent>
    </Card>
  );
}
