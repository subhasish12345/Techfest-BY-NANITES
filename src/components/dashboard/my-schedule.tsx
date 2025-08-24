"use client";

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
import { events as allEvents } from "@/lib/data";
import { useAuth } from "@/hooks/use-auth";
import type { Event } from "@/lib/types";

export function MySchedule() {
  const { userData } = useAuth();

  const registeredEvents: Event[] = userData?.registeredEvents
    ? userData.registeredEvents.map(eventId => allEvents.find(event => event.id === eventId)).filter((event): event is Event => !!event)
    : [];

  return (
    <Card className="bg-card border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">My Registered Events</CardTitle>
        <CardDescription>
          Your personalized timeline for TechFest 2024.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {registeredEvents.length > 0 ? (
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
