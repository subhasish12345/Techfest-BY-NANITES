
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
import { useAuth } from "@/hooks/use-auth";
import type { Event } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Download, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


export function MyCertificates() {
  const { userData, loading: authLoading } = useAuth();
  const [completedEvents, setCompletedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCompletedEvents = async () => {
      if (!userData?.registeredEvents || userData.registeredEvents.length === 0) {
        setCompletedEvents([]);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      try {
        const eventsRef = collection(db, 'events');
        // Fetch all events that the user is registered for AND are completed.
        const q = query(eventsRef, 
            where('__name__', 'in', userData.registeredEvents),
            where('status', '==', 'completed')
        );
        const querySnapshot = await getDocs(q);
        const eventsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
        setCompletedEvents(eventsData);
      } catch (error) {
        console.error("Error fetching completed events: ", error);
        toast({ variant: 'destructive', title: 'Error', description: 'Could not fetch your certificates.' });
      } finally {
        setLoading(false);
      }
    };
    
    if (!authLoading && userData) {
        fetchCompletedEvents();
    }
  }, [userData, authLoading, toast]);

  const handleDownload = (eventName: string) => {
    // In a real application, this would trigger a PDF/Image generation service
    toast({
        title: "Certificate Downloading",
        description: `Your certificate for ${eventName} is being prepared.`,
    });
  }

  const renderSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
            <Card key={i}>
                <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-10 w-full" />
                </CardContent>
            </Card>
        ))}
    </div>
  );

  return (
    <Card className="bg-card border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            My Certificates
        </CardTitle>
        <CardDescription>
          Download your certificates for completed events here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? renderSkeleton() : completedEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedEvents.map((event) => (
                <Card key={event.id} className="flex flex-col justify-between bg-background">
                    <CardHeader>
                        <CardTitle className="text-lg text-primary-foreground">{event.title}</CardTitle>
                        <CardDescription>{event.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button className="w-full" onClick={() => handleDownload(event.title)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download Certificate
                        </Button>
                    </CardContent>
                </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">You have no certificates available yet. Certificates appear after you attend and complete an event.</p>
        )}
      </CardContent>
    </Card>
  );
}
