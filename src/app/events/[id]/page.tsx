
"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Event } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, Award, Users, FileText, Loader2, CheckCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { events as dummyEvents } from '@/lib/data';


export default function EventDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { user, userData, registerForEvent, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const id = params.id as string;
  
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchEvent = async () => {
        setLoading(true);
        let foundEvent: Event | null = null;
        
        try {
            const eventDocRef = doc(db, 'events', id);
            const eventDoc = await getDoc(eventDocRef);
            if (eventDoc.exists()) {
                foundEvent = { id: eventDoc.id, ...eventDoc.data() } as Event;
            }
        } catch (error) {
            console.log("Firestore fetch failed, will check fallback data.", error);
        }

        if (!foundEvent) {
            const fallbackEvent = dummyEvents.find(e => e.id === id);
            if (fallbackEvent) {
                foundEvent = fallbackEvent;
            }
        }
        
        setEvent(foundEvent);
        
        if (!foundEvent) {
            console.error("No such document!");
        }

        setLoading(false);
    };
    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
            <div className="md:col-span-3">
                <Skeleton className="h-96 w-full rounded-lg" />
                <div className="mt-8">
                    <Skeleton className="h-6 w-1/4 mb-4" />
                    <Skeleton className="h-12 w-3/4 mb-4" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-5/6 mt-2" />
                </div>
            </div>
            <div className="md:col-span-2">
                 <Skeleton className="h-96 w-full rounded-lg" />
            </div>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <p className="text-2xl text-muted-foreground">Event not found.</p>
      </div>
    );
  }

  const isRegistered = userData?.registeredEvents?.includes(event.id);

  const handleRegister = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Not Logged In",
        description: "You need to log in to register for an event.",
      });
      router.push('/auth');
      return;
    }
    try {
      await registerForEvent(event.id);
      toast({
        title: "Registration Successful!",
        description: `You are now registered for ${event.title}.`,
      });
    } catch (e: any) {
        toast({
            variant: "destructive",
            title: "Registration Failed",
            description: e.message || "An unknown error occurred.",
        });
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
        <div className="md:col-span-3">
          <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-lg">
            <Image
              src={event.image}
              alt={event.title}
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint="event cover"
            />
          </div>
          <div className="mt-8">
            <Badge variant="outline" className="mb-2 border-accent text-accent font-code">{event.category}</Badge>
            <h1 className="font-headline text-4xl font-bold text-primary sm:text-5xl">{event.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{event.description}</p>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="bg-card p-6 rounded-lg border border-primary/20 sticky top-24">
            <h2 className="font-headline text-2xl font-bold text-primary-foreground mb-6">Event Details</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Calendar className="h-6 w-6 text-primary"/>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-semibold">{event.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="h-6 w-6 text-primary"/>
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-semibold">{event.time}</p>
                </div>
              </div>
               <div className="flex items-start gap-4">
                <Users className="h-6 w-6 text-primary mt-1"/>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-semibold">{event.category}</p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-border">
              {isRegistered ? (
                 <Button size="lg" className="w-full" disabled>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Registered
                </Button>
              ) : (
                <Button size="lg" className="w-full glow-shadow" onClick={handleRegister} disabled={authLoading}>
                    {authLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Register for this Event'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
       <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-card p-6 rounded-lg border border-primary/20">
                <h3 className="font-headline text-xl text-primary flex items-center gap-2 mb-4"><FileText /> Rules</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {event.rules.map((rule, i) => <li key={i}>{rule}</li>)}
                </ul>
            </div>
             <div className="bg-card p-6 rounded-lg border border-primary/20">
                <h3 className="font-headline text-xl text-primary flex items-center gap-2 mb-4"><Award /> Prizes</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {event.prizes.map((prize, i) => <li key={i}>{prize}</li>)}
                </ul>
            </div>
       </div>
    </div>
  );
}
