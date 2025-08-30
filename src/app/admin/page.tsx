
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart2, Users, Calendar, PlusCircle, Edit, Trash2 } from "lucide-react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import Image from "next/image";
import type { Event } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";


export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ totalUsers: 0, totalEvents: 0, engagementRate: "0%" });
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchEvents = async () => {
    setLoadingEvents(true);
    const eventsCollection = collection(db, "events");
    const eventSnapshot = await getDocs(eventsCollection);
    const eventList = eventSnapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as Event)
    );
    setEvents(eventList);
    setLoadingEvents(false);
  };

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
      } finally {
        setLoading(false);
      }
    }
    getAnalytics();
    fetchEvents();
  }, []);
  
  const handleDeleteClick = (eventId: string) => {
    setEventToDelete(eventId);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!eventToDelete) return;
    try {
      await deleteDoc(doc(db, "events", eventToDelete));
      toast({
        title: "Event Deleted",
        description: "The event has been successfully removed.",
      });
      fetchEvents(); // Refresh the list
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete the event. Please try again.",
      });
    } finally {
      setShowDeleteDialog(false);
      setEventToDelete(null);
    }
  };


  const renderSkeletonCards = () => (
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
  
  const renderSkeletonTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Event</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, i) => (
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
    <div className="space-y-8">
        {loading ? renderSkeletonCards() : (
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
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Manage Events</CardTitle>
                <CardDescription>Create, edit, or delete festival events.</CardDescription>
            </div>
            <Button asChild>
                <Link href="/admin/events/new">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Event
                </Link>
            </Button>
        </CardHeader>
        <CardContent>
            {loadingEvents ? (
            renderSkeletonTable()
            ) : (
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {events.map((event) => (
                    <TableRow key={event.id}>
                    <TableCell>
                        <div className="flex items-center gap-3">
                            <Image src={event.image} alt={event.title} width={40} height={40} className="rounded-sm object-cover" />
                            <span className="font-medium">{event.title}</span>
                        </div>
                    </TableCell>
                    <TableCell>
                        <Badge variant="outline">{event.category}</Badge>
                    </TableCell>
                    <TableCell>
                        {event.date}, {event.time}
                    </TableCell>
                    <TableCell className="text-right">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href={`/admin/events/edit/${event.id}`}>
                                <Edit className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteClick(event.id)}
                        >
                        <Trash2 className="h-4 w-4" />
                        </Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            )}
        </CardContent>
        </Card>
    </div>

     <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the event.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );

    