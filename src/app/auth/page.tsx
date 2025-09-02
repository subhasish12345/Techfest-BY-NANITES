
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
import { Loader2, Info, MailCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

const signupSchema = z.object({
  displayName: z.string().min(1, { message: "Display name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const forgotPasswordSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
});


function AuthPageContent() {
    const { login, signup, loading, error, sendPasswordReset, successMessage } = useAuth();
    const searchParams = useSearchParams();
    const initialFormType = searchParams.get('form') === 'signup' ? 'signup' : 'login';
    const [formType, setFormType] = useState<"login" | "signup" | "forgotPassword">(initialFormType);
    
    const formSchemas = {
        login: loginSchema,
        signup: signupSchema,
        forgotPassword: forgotPasswordSchema,
    }

    const form = useForm({
        resolver: zodResolver(formSchemas[formType]),
        defaultValues: {
            displayName: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: any) => {
        if (formType === "login") {
            login(values.email, values.password);
        } else if (formType === "signup") {
            signup(values.email, values.password, values.displayName);
        } else if (formType === "forgotPassword") {
            sendPasswordReset(values.email);
        }
    };

    const toggleFormType = (type: "login" | "signup" | "forgotPassword") => {
        setFormType(type);
        form.reset();
    };

    const isPotentiallyAdmin = form.watch('email') === 'admin@gmail.com' && formType === 'login' && error;

    const titles = {
        login: "Welcome",
        signup: "Create an Account",
        forgotPassword: "Reset Your Password"
    }

    const descriptions = {
        login: "Sign in to access your dashboard.",
        signup: "Sign up to join the tech fest.",
        forgotPassword: "We'll send you a link to reset your password."
    }

    return (
        <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-headline">
                        {titles[formType]}
                    </CardTitle>
                    <CardDescription>
                        {descriptions[formType]}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isPotentiallyAdmin && (
                         <Alert variant="default" className="mb-4 bg-blue-900/20 border-blue-500/50">
                            <Info className="h-4 w-4 text-blue-400" />
                            <AlertTitle className="text-blue-300">Admin Account</AlertTitle>
                            <AlertDescription className="text-blue-400">
                                It looks like you're trying to log in as an admin. Please use the <strong>Sign Up</strong> form to create the admin account first.
                            </AlertDescription>
                        </Alert>
                    )}
                    {successMessage && (
                        <Alert variant="default" className="mb-4 bg-green-900/20 border-green-500/50">
                            <MailCheck className="h-4 w-4 text-green-400" />
                            <AlertTitle className="text-green-300">Success</AlertTitle>
                            <AlertDescription className="text-green-400">
                                {successMessage}
                            </AlertDescription>
                        </Alert>
                    )}
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
                            {formType !== 'login' || (
                                <>
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
                                </>
                            )}
                             {formType === 'signup' && (
                                <>
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
                                </>
                            )}
                            {formType === 'forgotPassword' && (
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
                            )}

                            {error && !isPotentiallyAdmin && <p className="text-sm font-medium text-destructive">{error}</p>}

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {formType === "login" && "Log In"}
                                {formType === "signup" && "Sign Up"}
                                {formType === "forgotPassword" && "Send Reset Link"}
                            </Button>
                        </form>
                    </Form>
                    <div className="mt-4 text-center text-sm">
                        {formType === "login" && (
                             <>
                                Don't have an account?{" "}
                                <Button variant="link" onClick={() => toggleFormType('signup')} className="p-0">Sign up</Button>
                                <span className="mx-2">·</span>
                                <Button variant="link" onClick={() => toggleFormType('forgotPassword')} className="p-0">Forgot Password?</Button>
                             </>
                        )}
                         {formType === "signup" && (
                            <>
                                Already have an account?{" "}
                                <Button variant="link" onClick={() => toggleFormType('login')} className="p-0">Log in</Button>
                            </>
                         )}
                          {formType === "forgotPassword" && (
                            <>
                                Remember your password?{" "}
                                <Button variant="link" onClick={() => toggleFormType('login')} className="p-0">Log in</Button>
                            </>
                         )}
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
