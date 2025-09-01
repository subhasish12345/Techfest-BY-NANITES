
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { Menu, Rocket, Code, LogOut, User, Shield, Home, Calendar, LayoutDashboard, Ticket } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Separator } from "../ui/separator";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/events", label: "Events", icon: Ticket },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

export function Header() {
  const { user, userData, loading, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Code className="h-8 w-8 text-primary" />
          <span className="font-headline text-xl font-bold text-primary">
            NANITES
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Button key={link.href} variant="link" asChild className="text-muted-foreground hover:text-primary">
                <Link href={link.href} className="flex items-center gap-2 text-sm font-medium">
                    <link.icon className="h-4 w-4" />
                    {link.label}
                </Link>
            </Button>
          ))}
           {userData?.role === 'admin' && (
             <Button variant="link" asChild className="text-accent hover:text-primary">
                <Link href="/admin" className="flex items-center gap-2 text-sm font-medium">
                    <Shield className="h-4 w-4" />
                    Admin Panel
                </Link>
             </Button>
           )}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {loading ? null : user ? (
            <>
              <span className="text-sm text-muted-foreground hidden lg:inline">Welcome, {user.displayName || user.email}</span>
              <Button variant="outline" onClick={logout} size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/auth">Log In</Link>
              </Button>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link href="/auth?form=signup">
                  Register Now
                  <Rocket className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </>
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
             <SheetHeader>
                <SheetTitle>
                    <Link href="/" className="flex items-center gap-2 self-start">
                        <Code className="h-8 w-8 text-primary" />
                        <span className="font-headline text-xl font-bold text-primary">
                        NANITES
                        </span>
                    </Link>
                </SheetTitle>
             </SheetHeader>
             <Separator className="my-4" />
            <div className="flex h-full flex-col justify-between">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                    <Button key={link.href} variant="ghost" asChild className="justify-start">
                        <Link href={link.href} className="text-lg flex items-center gap-4">
                            <link.icon className="h-5 w-5 text-primary" />
                            {link.label}
                        </Link>
                    </Button>
                ))}
                 {userData?.role === 'admin' && (
                    <Button variant="ghost" asChild className="justify-start">
                        <Link href="/admin" className="text-lg flex items-center gap-4">
                            <Shield className="h-5 w-5 text-accent" />
                            Admin
                        </Link>
                    </Button>
                 )}
              </nav>
              <div className="flex flex-col gap-4">
                <Separator />
                {loading ? null : user ? (
                  <>
                     <div className="text-center text-muted-foreground">
                        Signed in as {user.displayName || user.email}
                     </div>
                    <Button variant="outline" onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" asChild>
                      <Link href="/auth">Log In</Link>
                    </Button>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                      <Link href="/auth?form=signup">
                        Register Now
                        <Rocket className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
