
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
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { addEvent } from "@/app/actions/event-actions";


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
      image: undefined,
      rules: event?.rules || [""],
      prizes: event?.prizes || [{ position: "", prize: "" }],
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
    
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'image' && value instanceof File) {
        formData.append(key, value);
      } else if (key === 'rules' && Array.isArray(value)) {
        value.forEach(rule => formData.append('rules[]', rule));
      } else if (key === 'prizes' && Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      }
      else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    try {
      // For now, we only handle creation. Editing would require a separate action.
      if (isEditing) {
          // TODO: Implement edit functionality
          toast({ variant: "destructive", title: "Editing not implemented yet."});
          return;
      }

      await addEvent(formData);
      toast({
        title: "Event Created",
        description: "The new event has been successfully created.",
      });

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
  
  const fileRef = form.register("image");

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
                    <FormLabel>Event Poster</FormLabel>
                    <FormControl>
                        <Input type="file" accept="image/*" {...fileRef} />
                    </FormControl>
                    <FormDescription>
                        Upload an image for the event.
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
               <div className="space-y-4 mt-2">
                {prizesFields.map((field, index) => (
                  <div key={field.id} className="flex items-end gap-2 p-2 border rounded-md">
                     <FormField
                        control={form.control}
                        name={`prizes.${index}.position`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Position</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 1st Place" {...field} />
                            </FormControl>
                             <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name={`prizes.${index}.prize`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Prize</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Trophy + Certificate" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    <Button type="button" variant="destructive" size="icon" onClick={() => removePrize(index)}>
                        <Trash2 />
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
              {isEditing ? "Save Changes" : "Create Event"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
