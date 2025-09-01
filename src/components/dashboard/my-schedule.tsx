
"use client";

import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
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
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import type { Event } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { QrCode } from "lucide-react";
import { QrCodeDialog } from "./qr-code-dialog";
import { useToast } from "@/hooks/use-toast";

export function MySchedule() {
  const { user, userData, loading: authLoading } = useAuth();
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [qrCodeData, setQrCodeData] = useState<{ eventTitle: string, qrValue: string } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      if (!userData || !userData.registeredEvents || userData.registeredEvents.length === 0) {
        setRegisteredEvents([]);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        // Use a single 'in' query to fetch all registered events at once.
        // Note: 'in' queries are limited to 30 items by Firestore. For more, pagination would be needed.
        const eventsRef = collection(db, 'events');
        const q = query(eventsRef, where('__name__', 'in', userData.registeredEvents));
        const querySnapshot = await getDocs(q);
        const eventsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
        setRegisteredEvents(eventsData);
      } catch (error) {
        console.error("Error fetching registered events: ", error);
        toast({ variant: 'destructive', title: 'Error', description: 'Could not fetch your schedule.' });
      } finally {
        setLoading(false);
      }
    };
    
    if (!authLoading && userData) {
        fetchRegisteredEvents();
    }
  }, [userData, authLoading, toast]);

  const handleShowQrCode = (event: Event) => {
    if (!user) return;
    const qrValue = JSON.stringify({ userId: user.uid, eventId: event.id, eventTitle: event.title });
    setQrCodeData({ eventTitle: event.title, qrValue });
  };

  const renderSkeleton = () => (
    <Table>
      <TableHeader>
        <TableRow>
            <TableHead>Event</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead className="text-right">Ticket</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(3)].map((_, i) => (
            <TableRow key={i}>
                <TableCell><Skeleton className="h-5 w-3/4" /></TableCell>
                <TableCell><Skeleton className="h-5 w-1/2" /></TableCell>
                <TableCell><Skeleton className="h-5 w-1/2" /></TableCell>
                <TableCell className="text-right"><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
            </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <>
    <Card className="bg-card border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">My Registered Events</CardTitle>
        <CardDescription>
          Your personalized timeline for TechFest 2024. Show the QR code for entry.
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
                <TableHead className="text-right">Ticket</TableHead>
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
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => handleShowQrCode(event)}>
                        <QrCode className="mr-2 h-4 w-4" />
                        Show QR Code
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-muted-foreground text-center py-8">You haven't registered for any events yet. Check out the <a href="/events" className="text-primary underline">event catalog</a>!</p>
        )}
      </CardContent>
    </Card>
    {qrCodeData && (
        <QrCodeDialog 
            isOpen={!!qrCodeData}
            onClose={() => setQrCodeData(null)}
            eventTitle={qrCodeData.eventTitle}
            qrValue={qrCodeData.qrValue}
        />
    )}
    </>
  );
}
