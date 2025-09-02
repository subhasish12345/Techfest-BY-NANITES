
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  collection,
  addDoc,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import {
  updateSchema,
  type UpdateFormData,
  type Update,
} from "@/lib/types";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";


const dummyUpdates: Update[] = [
    { id: '1', message: 'The keynote speaker for the closing ceremony has been announced! Welcome Dr. Evelyn Reed.', timestamp: { toDate: () => new Date(Date.now() - 3600000) } as any },
    { id: '2', message: 'Registration for the "Code Combat" hackathon closes in 2 hours. Grab your spot now!', timestamp: { toDate: () => new Date(Date.now() - 7200000) } as any },
    { id: '3', message: 'Check out the new gallery section for highlights from Day 1.', timestamp: { toDate: () => new Date(Date.now() - 86400000) } as any },
];


export default function ManageUpdatesPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loadingUpdates, setLoadingUpdates] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [updateToDelete, setUpdateToDelete] = useState<string | null>(null);

  const form = useForm<UpdateFormData>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      message: "",
    },
  });

  useEffect(() => {
    // Using dummy data
    setLoadingUpdates(true);
    setUpdates(dummyUpdates);
    setLoadingUpdates(false);
  }, []);

  const onSubmit = async (data: UpdateFormData) => {
    setIsLoading(true);
    try {
      // NOTE: This will still try to write to Firestore and may fail if permissions are not set.
      await addDoc(collection(db, "updates"), {
        message: data.message,
        timestamp: serverTimestamp(),
      });
      // Add to local state to simulate
      const newUpdate = { id: Date.now().toString(), message: data.message, timestamp: { toDate: () => new Date() } as any};
      setUpdates([newUpdate, ...updates]);

      toast({
        title: "Update Posted",
        description: "The new update is now live.",
      });
      form.reset();
    } catch (error) {
      console.error("Failed to post update:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to post the update. Check permissions.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (updateId: string) => {
    setUpdateToDelete(updateId);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!updateToDelete) return;
    try {
      // NOTE: This will still try to delete from Firestore and may fail if permissions are not set.
      await deleteDoc(doc(db, "updates", updateToDelete));
      setUpdates(updates.filter(u => u.id !== updateToDelete));
      toast({
        title: "Update Deleted",
        description: "The update has been successfully deleted.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete the update. Check permissions.",
      });
    } finally {
      setShowDeleteDialog(false);
      setUpdateToDelete(null);
    }
  };

  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return 'Just now';
    return new Date(timestamp.seconds * 1000).toLocaleString();
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Post a New Update</CardTitle>
          <CardDescription>
            This announcement will be shown in real-time on the homepage.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Keynote speaker announced for the closing ceremony..."
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 animate-spin" />}
                Post Update
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Updates</CardTitle>
          <CardDescription>A log of all past announcements.</CardDescription>
        </CardHeader>
        <CardContent>
          {loadingUpdates ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start justify-between">
                    <div className="space-y-2 w-full">
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-3 w-1/4" />
                    </div>
                    <Skeleton className="h-8 w-8" />
                </div>
              ))}
            </div>
          ) : updates.length > 0 ? (
            <ul className="space-y-4">
              {updates.map((update) => (
                <li key={update.id} className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-foreground">{update.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatTimestamp(update.timestamp)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDeleteClick(update.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-center py-4">No updates have been posted yet.</p>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              update from the live feed.
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
    </div>
  );
}

    