"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  eventSchema,
  type EventFormData,
  type Event,
  eventCategoriesList,
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";

interface EventFormProps {
  event?: Event;
}

export function EventForm({ event }: EventFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!event;

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: event?.title || "",
      description: event?.description || "",
      category: event?.category || "",
      type: event?.type || "technical",
      date: event?.date || "",
      time: event?.time || "",
      image: event?.image || "",
      rules: event?.rules || [""],
      prizes: event?.prizes || [""],
    },
  });

  const { fields: rulesFields, append: appendRule, remove: removeRule } = useFieldArray({
    control: form.control,
    name: "rules",
  });

  const { fields: prizesFields, append: appendPrize, remove: removePrize } = useFieldArray({
    control: form.control,
    name: "prizes",
  });

  const onSubmit = async (data: EventFormData) => {
    setIsLoading(true);
    try {
      if (isEditing && event.id) {
        const eventRef = doc(db, "events", event.id);
        await setDoc(eventRef, data);
        toast({
          title: "Event Updated",
          description: "The event has been successfully updated.",
        });
      } else {
        await addDoc(collection(db, "events"), data);
        toast({
          title: "Event Created",
          description: "The new event has been successfully created.",
        });
      }
      router.push("/admin/events");
      router.refresh();
    } catch (error) {
      console.error("Failed to save event:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save the event. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Event" : "Create New Event"}</CardTitle>
        <CardDescription>
          {isEditing
            ? "Update the details of the event below."
            : "Fill in the details for the new event."}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Code Combat" {...field} />
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
                    <Textarea
                      placeholder="Describe the event..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            {eventCategoriesList.map((category) => (
                                <SelectItem key={category} value={category}>
                                {category}
                                </SelectItem>
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a type" />
                            </Trigger>
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
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            <Input placeholder="e.g., 10:00 AM" {...field} />
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
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://placehold.co/600x400.png" {...field} />
                  </FormControl>
                   <FormDescription>
                    Use a placeholder from placehold.co or a direct image link.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormLabel>Rules</FormLabel>
               <div className="space-y-2 mt-2">
                {rulesFields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`rules.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2">
                        <FormControl>
                          <Input placeholder={`Rule ${index + 1}`} {...field} />
                        </FormControl>
                        <Button type="button" variant="destructive" size="icon" onClick={() => removeRule(index)}>
                            <Trash2 />
                        </Button>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendRule("")}>
                Add Rule
              </Button>
            </div>
             <div>
              <FormLabel>Prizes</FormLabel>
               <div className="space-y-2 mt-2">
                {prizesFields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`prizes.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2">
                        <FormControl>
                          <Input placeholder={`Prize ${index + 1}`} {...field} />
                        </FormControl>
                        <Button type="button" variant="destructive" size="icon" onClick={() => removePrize(index)}>
                            <Trash2 />
                        </Button>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendPrize("")}>
                Add Prize
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 animate-spin" />}
              {isEditing ? "Save Changes" : "Create Event"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
