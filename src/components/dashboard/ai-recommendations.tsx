
"use client";

import { useState, useEffect } from "react";
import { generateEventIdeas, type GenerateEventIdeasOutput } from "@/ai/flows/generate-event-ideas";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Bot, Lightbulb, Workflow, BookOpen, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { type Event } from "@/lib/types";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

export function AiRecommendations() {
  const { userData, loading: authLoading } = useAuth();
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [recommendations, setRecommendations] = useState<GenerateEventIdeasOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingEvents, setIsFetchingEvents] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      if (!userData || !userData.registeredEvents || userData.registeredEvents.length === 0) {
        setRegisteredEvents([]);
        setIsFetchingEvents(false);
        return;
      }
      
      setIsFetchingEvents(true);
      try {
        const eventsRef = collection(db, 'events');
        const q = query(eventsRef, where('__name__', 'in', userData.registeredEvents));
        const querySnapshot = await getDocs(q);
        const eventsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
        setRegisteredEvents(eventsData);
      } catch (error) {
        console.error("Error fetching registered events: ", error);
        toast({ variant: 'destructive', title: 'Error', description: 'Could not fetch your registered events.' });
      } finally {
        setIsFetchingEvents(false);
      }
    };
    
    if (!authLoading && userData) {
        fetchRegisteredEvents();
    } else if (!authLoading) {
        setIsFetchingEvents(false);
    }
  }, [userData, authLoading, toast]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEventId) {
        toast({ variant: "destructive", title: "No Event Selected", description: "Please select an event to get ideas." });
        return;
    }
    
    setIsLoading(true);
    setRecommendations(null);

    const selectedEvent = registeredEvents.find(event => event.id === selectedEventId);
    if (!selectedEvent) return;

    try {
      const result = await generateEventIdeas({
        eventTitle: selectedEvent.title,
        eventDescription: selectedEvent.description,
      });
      setRecommendations(result);
    } catch (error) {
      console.error("AI Recommendation Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get AI recommendations. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderSkeleton = () => (
    <div className="space-y-4">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-40" />
    </div>
  )
  
  const renderResults = () => (
    <div className="space-y-8 mt-6">
        <div>
            <h3 className="font-headline text-lg text-primary flex items-center gap-2 mb-3">
                <Lightbulb className="h-5 w-5" />
                Creative Ideas
            </h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {recommendations?.creativeIdeas.map((idea, i) => <li key={i}>{idea}</li>)}
            </ul>
        </div>
         <div>
            <h3 className="font-headline text-lg text-primary flex items-center gap-2 mb-3">
                <Workflow className="h-5 w-5" />
                Implementation Strategies
            </h3>
             <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {recommendations?.implementationStrategies.map((strategy, i) => <li key={i}>{strategy}</li>)}
            </ul>
        </div>
         <div>
            <h3 className="font-headline text-lg text-primary flex items-center gap-2 mb-3">
                <BookOpen className="h-5 w-5" />
                Learning Resources
            </h3>
             <ul className="space-y-3 text-muted-foreground">
                {recommendations?.learningResources.map((resource, i) => (
                    <li key={i} className="border-l-2 border-accent pl-4">
                        <Link href={resource.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary-foreground hover:underline">
                            {resource.title}
                        </Link>
                        <p className="text-sm">{resource.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )

  return (
    <Card className="bg-card border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" /> AI Event Coach
          </CardTitle>
          <CardDescription>
            Select one of your registered events to get personalized ideas, strategies, and resources to help you excel.
          </CardDescription>
        </CardHeader>
        <CardContent>
            {isFetchingEvents ? renderSkeleton() : registeredEvents.length > 0 ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="event-select">Select an Event</Label>
                        <Select onValueChange={setSelectedEventId} value={selectedEventId}>
                            <SelectTrigger id="event-select">
                                <SelectValue placeholder="Choose one of your registered events..." />
                            </SelectTrigger>
                            <SelectContent>
                                {registeredEvents.map(event => (
                                    <SelectItem key={event.id} value={event.id}>{event.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" disabled={isLoading || !selectedEventId}>
                        {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                        </>
                        ) : (
                        "Get Personalized Ideas"
                        )}
                    </Button>
                </form>
            ) : (
                 <p className="text-muted-foreground text-center py-8">You haven't registered for any events yet. <Link href="/events" className="text-primary underline">Register for an event</Link> to get personalized coaching!</p>
            )}
        </CardContent>

        {recommendations && (
             <CardFooter className="flex-col items-start gap-4">
                {renderResults()}
             </CardFooter>
        )}
    </Card>
  );
}
