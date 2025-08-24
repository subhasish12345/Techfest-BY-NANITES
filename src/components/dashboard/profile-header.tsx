import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfileHeader() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-lg bg-card border border-primary/20">
      <Avatar className="h-20 w-20">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <h1 className="font-headline text-3xl font-bold text-primary-foreground">
          Welcome back, Alex!
        </h1>
        <p className="mt-1 text-muted-foreground">
          Here's your personal hub for TechFest 2024. Manage your schedule, view analytics, and get personalized recommendations.
        </p>
      </div>
    </div>
  );
}
