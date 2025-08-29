
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart2, Users, Calendar } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ totalUsers: 0, totalEvents: 0, engagementRate: "0%" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAnalytics() {
      setLoading(true);
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const eventsSnapshot = await getDocs(collection(db, "events"));

        const totalUsers = usersSnapshot.size;
        const totalEvents = eventsSnapshot.size;
        const engagementRate = "65.8%"; // Placeholder

        setStats({ totalUsers, totalEvents, engagementRate });
      } catch (error) {
        console.error("Failed to fetch admin analytics:", error);
        // Handle error, e.g., show a toast notification
      } finally {
        setLoading(false);
      }
    }
    getAnalytics();
  }, []);

  const renderSkeleton = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-7 w-12" />
                <Skeleton className="h-4 w-32 mt-1" />
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-7 w-12" />
                <Skeleton className="h-4 w-28 mt-1" />
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-7 w-20" />
                <Skeleton className="h-4 w-36 mt-1" />
            </CardContent>
        </Card>
      </div>
  )

  return (
    <div>
        {loading ? renderSkeleton() : (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
                <p className="text-xs text-muted-foreground">Total users signed up</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{stats.totalEvents}</div>
                <p className="text-xs text-muted-foreground">Total events created</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{stats.engagementRate}</div>
                <p className="text-xs text-muted-foreground">Average across all events</p>
            </CardContent>
        </Card>
      </div>
        )}
      <div className="mt-8">
        <h2 className="text-2xl font-headline font-bold mb-4">Recent Activity</h2>
        {/* Placeholder for recent activity feed */}
        <Card>
            <CardContent className="p-6">
                <p className="text-muted-foreground">No recent activity to display.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
