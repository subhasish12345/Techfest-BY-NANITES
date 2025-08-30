
"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { eventSchema, type EventFormData, type Event, eventCategoriesList } from "@/lib/types";
import { addEvent, updateEvent } from "@/app/actions/event-actions";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface EventFormProps {
  eventId?: string;
}

export function EventForm({ eventId }: EventFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(!!eventId);

  const isEditing = !!eventId;

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      type: "technical",
      date: "",
      time: "",
      rules: ["Rule 1"],
      prizes: [{ position: "1st Prize", prize: "" }],
    },
  });

  const { fields: ruleFields, append: appendRule, remove: removeRule } = useFieldArray({
    control: form.control,
    name: "rules",
  });

  const { fields: prizeFields, append: appendPrize, remove: removePrize } = useFieldArray({
    control: form.control,
    name: "prizes",
  });

  useEffect(() => {
    if (isEditing) {
      const fetchEventData = async () => {
        setIsFetching(true);
        try {
          const eventDocRef = doc(db, 'events', eventId);
          const eventDoc = await getDoc(eventDocRef);
          if (eventDoc.exists()) {
            const eventData = eventDoc.data() as Event;
            const fetchedData = {
                ...eventData,
                image: undefined, // Don't try to load the remote image URL into the file input
                prizes: eventData.prizes || [{ position: "1st Prize", prize: "" }],
                rules: eventData.rules || ["Rule 1"]
            };
            form.reset(fetchedData);
          } else {
            toast({ variant: 'destructive', title: 'Error', description: 'Event not found.' });
            router.push('/admin/events');
          }
        } catch (error) {
          toast({ variant: 'destructive', title: 'Error', description: 'Failed to fetch event data.' });
        } finally {
          setIsFetching(false);
        }
      };
      fetchEventData();
    }
  }, [eventId, form, isEditing, router, toast]);

  const onSubmit = async (data: EventFormData) => {
    setIsLoading(true);

    if (!isEditing && !data.image) {
        toast({ variant: 'destructive', title: 'Validation Error', description: 'An event image is required.'});
        setIsLoading(false);
        return;
    }

    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'image' && value) {
        formData.append(key, value);
      } else if (key === 'prizes' && Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else if (key === 'rules' && Array.isArray(value)) {
        value.forEach((item: string) => formData.append(`${key}[]`, item));
      } else if (value != null) {
        formData.append(key, value as string);
      }
    });

    try {
      if (isEditing) {
        await updateEvent(eventId, formData);
        toast({ title: "Success", description: "Event updated successfully." });
      } else {
        await addEvent(formData);
        toast({ title: "Success", description: "Event created successfully." });
      }
      router.push("/admin");
      router.refresh();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Operation Failed",
        description: error.message || "An unknown error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isFetching) {
    return <Card><CardHeader><Skeleton className="h-8 w-1/2" /></CardHeader><CardContent><div className="space-y-4"><Skeleton className="h-10 w-full" /><Skeleton className="h-24 w-full" /><Skeleton className="h-10 w-full" /></div></CardContent></Card>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Event" : "Create New Event"}</CardTitle>
        <CardDescription>
          Fill in the details below to {isEditing ? "update the" : "create a new"} event.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Event Title</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Code Combat (Hackathon)" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Describe the event..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    {eventCategoriesList.map(cat => (
                                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select event type" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="technical">Technical</SelectItem>
                                        <SelectItem value="non-technical">Non-Technical</SelectItem>
                                        <SelectItem value="cultural">Cultural</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Day 1" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Time</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., 9:00 AM - 3:00 PM" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                 <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Event Image</FormLabel>
                        <FormControl>
                           <Input type="file" onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)} />
                        </FormControl>
                        <FormDescription>
                            Upload a high-quality image for the event banner.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <div>
                    <FormLabel>Rules</FormLabel>
                    <div className="space-y-2 mt-2">
                    {ruleFields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-2">
                        <FormField
                            control={form.control}
                            name={`rules.${index}`}
                            render={({ field }) => (
                                <FormItem className="flex-grow">
                                    <FormControl>
                                        <Input placeholder={`Rule ${index + 1}`} {...field} value={field.value || ''}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="button" variant="destructive" size="icon" onClick={() => removeRule(index)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        </div>
                    ))}
                    </div>
                    <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendRule("")}>
                        Add Rule
                    </Button>
                </div>
                <div>
                    <FormLabel>Prizes</FormLabel>
                    <div className="space-y-4 mt-2">
                    {prizeFields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-2 p-2 border rounded-md">
                             <FormField
                                control={form.control}
                                name={`prizes.${index}.position`}
                                render={({ field }) => (
                                    <FormItem className="w-1/3">
                                        <FormControl>
                                            <Input placeholder="Position" {...field} value={field.value || ''} />
                                        </FormControl>
                                         <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name={`prizes.${index}.prize`}
                                render={({ field }) => (
                                    <FormItem className="flex-grow">
                                        <FormControl>
                                            <Input placeholder="Prize description" {...field} value={field.value || ''} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="button" variant="destructive" size="icon" onClick={() => removePrize(index)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    </div>
                    <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendPrize({ position: "", prize: "" })}>
                        Add Prize
                    </Button>
                </div>
            </CardContent>
            <CardFooter>
                 <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 animate-spin" />}
                    {isEditing ? "Update Event" : "Create Event"}
                </Button>
            </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
