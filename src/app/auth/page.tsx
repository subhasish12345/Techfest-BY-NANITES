
"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Loader2 } from "lucide-react";

// Schemas are defined outside the component to prevent re-creation on every render.
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

const signupSchema = z.object({
  displayName: z.string().min(1, { message: "Display name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

// The component that uses useSearchParams must be wrapped in a <Suspense>
function AuthPageContent() {
  const { login, signup, loading, error } = useAuth();
  const searchParams = useSearchParams();
  const initialFormType = searchParams.get('form') === 'signup' ? 'signup' : 'login';
  const [formType, setFormType] = useState<"login" | "signup">(initialFormType);

  const form = useForm({
    resolver: zodResolver(formType === "login" ? loginSchema : signupSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: any) => {
    if (formType === "login") {
      login(values.email, values.password);
    } else {
      signup(values.email, values.password, values.displayName);
    }
  };

  const toggleFormType = () => {
    setFormType(formType === "login" ? "signup" : "login");
    form.reset();
  };
  
  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">
            {formType === "login" ? "Welcome Back!" : "Create an Account"}
          </CardTitle>
          <CardDescription>
            {formType === "login"
              ? "Sign in to access your dashboard."
              : "Sign up to join the tech fest."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {formType === "signup" && (
                <FormField
                  control={form.control}
                  name="displayName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Alex Turing" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="user@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               {error && <p className="text-sm font-medium text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {formType === "login" ? "Log In" : "Sign Up"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            {formType === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <Button
              variant="link"
              onClick={toggleFormType}
              className="font-medium text-primary underline-offset-4 hover:underline p-0"
            >
              {formType === "login" ? "Sign up" : "Log in"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AuthPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
            <AuthPageContent />
        </Suspense>
    )
}
