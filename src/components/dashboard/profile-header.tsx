
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { User } from "lucide-react";

export function ProfileHeader({ adminView }: { adminView?: boolean }) {
  const { user, userData } = useAuth();
  
  const getInitials = (email: string) => {
    return email?.charAt(0).toUpperCase() || 'U';
  };

  if (adminView) {
    return (
        <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
                <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || 'Admin'} />
                <AvatarFallback>A</AvatarFallback>
            </Avatar>
             <div>
                <p className="text-sm font-medium text-primary-foreground">{userData?.displayName}</p>
                <p className="text-xs text-muted-foreground">{userData?.email}</p>
            </div>
        </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-lg bg-card border border-primary/20">
      <Avatar className="h-20 w-20">
        <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || user?.email || 'User'} />
        <AvatarFallback>{user?.email ? getInitials(user.email) : 'U'}</AvatarFallback>
      </Avatar>
      <div>
        <h1 className="font-headline text-3xl font-bold text-primary-foreground">
          Welcome, {user?.displayName || user?.email || 'Guest'}!
        </h1>
        <p className="mt-1 text-muted-foreground">
          Here's your personal hub for TechFest 2024.
        </p>
      </div>
    </div>
  );
}
