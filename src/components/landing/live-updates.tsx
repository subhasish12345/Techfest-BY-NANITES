
"use client";

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Rss } from "lucide-react";
import type { Update } from "@/lib/types";
import { Skeleton } from '../ui/skeleton';

export function LiveUpdates() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "updates"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatesData: Update[] = [];
      querySnapshot.forEach((doc) => {
        updatesData.push({ id: doc.id, ...doc.data() } as Update);
      });
      setUpdates(updatesData);
      setLoading(false);
    }, (error) => {
      console.error("LiveUpdates Error: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const formatTimestamp = (timestamp: any) => {
    if (!timestamp || typeof timestamp.toDate !== 'function') return 'Just now';
    
    const date = timestamp.toDate();
    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffSeconds < 60) return `${diffSeconds}s ago`;
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const renderSkeleton = () => (
     <ul className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
            <li key={i} className="flex items-start gap-4">
                <div className="mt-1">
                    <Skeleton className="h-5 w-5 rounded-full" />
                </div>
                <div className='w-full space-y-2'>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-1/4" />
                </div>
            </li>
        ))}
     </ul>
  )


  return (
    <section className="py-16 md:py-24">
      <div className="text-center">
        <h2 className="font-headline text-3xl font-bold text-primary sm:text-4xl">
          Live Updates
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Stay in the loop with real-time announcements from the fest.
        </p>
      </div>
      <div className="mt-12 max-w-2xl mx-auto">
        <Card className="bg-card border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Rss className="h-6 w-6 text-accent" />
              <CardTitle className="font-headline text-2xl text-primary-foreground">
                Announcements
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? renderSkeleton() : updates.length > 0 ? (
                 <ul className="space-y-6">
                    {updates.map((update) => (
                        <li key={update.id} className="flex items-start gap-4">
                        <div className="mt-1">
                            <Bell className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-foreground">{update.message}</p>
                            <p className="font-code text-sm text-muted-foreground">
                            {formatTimestamp(update.timestamp)}
                            </p>
                        </div>
                        </li>
                    ))}
                 </ul>
            ) : (
                <p className="text-muted-foreground text-center py-4">No live updates at the moment. Check back soon!</p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
