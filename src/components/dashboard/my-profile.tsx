
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { userProfileSchema, type UserProfileFormData } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2, User } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Textarea } from "../ui/textarea";

export function MyProfile() {
  const { userData, loading: authLoading, updateUserProfile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileSchema),
    values: {
      displayName: userData?.displayName || "",
      email: userData?.email || "",
      regNo: userData?.regNo || "",
      degree: userData?.degree || "",
      branch: userData?.branch || "",
      semester: userData?.semester || "",
      section: userData?.section || "",
      mobileNo: userData?.mobileNo || "",
      profile: userData?.profile || "",
      profilePhoto: userData?.profilePhoto || "",
    },
  });

  const onSubmit = async (data: UserProfileFormData) => {
    setIsLoading(true);
    try {
      await updateUserProfile(data);
      toast({
        title: "Profile Updated",
        description: "Your details have been successfully saved.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: error.message || "An unknown error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
        <Card className="bg-card border-primary/20">
            <CardHeader>
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-4 w-full max-w-lg" />
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-10 w-full" /></div>
                <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-10 w-full" /></div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-10 w-full" /></div>
                    <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-10 w-full" /></div>
                </div>
            </CardContent>
             <CardFooter>
                 <Skeleton className="h-10 w-32" />
             </CardFooter>
        </Card>
    )
  }

  return (
    <Card className="bg-card border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          <User className="h-6 w-6 text-primary" />
          My Profile
        </CardTitle>
        <CardDescription>
          Keep your details up to date. This information will be used for event
          registrations and certificates.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <FormField
                  control={form.control}
                  name="displayName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Alex Turing" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="user@example.com" {...field} disabled />
                      </FormControl>
                       <FormDescription>
                        Email address cannot be changed.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField
                  control={form.control}
                  name="regNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registration No.</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 21BCE1234" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="mobileNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile No.</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 12345 67890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <FormField
                  control={form.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degree</FormLabel>
                      <FormControl>
                        <Input placeholder="B.Tech" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="branch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Branch</FormLabel>
                      <FormControl>
                        <Input placeholder="CSE" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="semester"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Semester</FormLabel>
                      <FormControl>
                        <Input placeholder="6th" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="section"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section</FormLabel>
                      <FormControl>
                        <Input placeholder="A" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
             <FormField
                control={form.control}
                name="profile"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>About You</FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="Tell us a bit about your interests..."
                        {...field}
                        />
                    </FormControl>
                     <FormDescription>
                        This will be used for AI recommendations.
                      </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 animate-spin" />}
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
