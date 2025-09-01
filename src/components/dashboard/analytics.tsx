"use client"

import { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from "@/components/ui/chart";
import { Skeleton } from "../ui/skeleton";
import type { Event, UserData } from "@/lib/types";

export function DashboardAnalytics() {
  const [eventData, setEventData] = useState<Event[]>([]);
  const [userData, setUserData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const eventsQuery = query(collection(db, "events"));
    const usersQuery = query(collection(db, "users"));

    const unsubscribeEvents = onSnapshot(eventsQuery, (snapshot) => {
      const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
      setEventData(events);
      setLoading(false);
    });

    const unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
      const users = snapshot.docs.map(doc => doc.data() as UserData);
      setUserData(users);
      setLoading(false);
    });

    return () => {
      unsubscribeEvents();
      unsubscribeUsers();
    };
  }, []);

  const eventParticipationData = eventData.map(event => {
    const participants = userData.filter(user => user.registeredEvents?.includes(event.id)).length;
    return { name: event.title, participants: participants, category: event.category };
  }).sort((a, b) => b.participants - a.participants).slice(0, 7); // Top 7 events by participation


  const engagementByDay = () => {
    const day1Registrations = userData.reduce((acc, user) => {
        const count = user.registeredEvents?.filter(eventId => {
            const event = eventData.find(e => e.id === eventId);
            return event?.date === "Day 1";
        }).length || 0;
        return acc + count;
    }, 0);
    const day2Registrations = userData.reduce((acc, user) => {
        const count = user.registeredEvents?.filter(eventId => {
            const event = eventData.find(e => e.id === eventId);
            return event?.date === "Day 2";
        }).length || 0;
        return acc + count;
    }, 0);

    return [
        { date: "Day 1", registrations: day1Registrations },
        { date: "Day 2", registrations: day2Registrations },
    ]
  }

  const renderSkeleton = () => (
     <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      <Card className="bg-card border-primary/20">
        <CardHeader>
          <Skeleton className="h-7 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
      <Card className="bg-card border-primary/20">
        <CardHeader>
          <Skeleton className="h-7 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    </div>
  )

  if (loading) {
    return renderSkeleton();
  }

  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      <Card className="bg-card border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Daily Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementByDay()} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                <Tooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Legend content={<ChartLegendContent />} />
                <Line name="Registrations" type="monotone" dataKey="registrations" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="bg-card border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Top Event Participation</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={eventParticipationData} layout="vertical" margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                <Tooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} />
                <Legend content={<ChartLegendContent />} />
                <Bar name="Participants" dataKey="participants" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
