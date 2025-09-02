import Image from "next/image";
import Link from "next/link";
import type { Event } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock } from "lucide-react";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden bg-card border-primary/20 transition-all duration-300 hover:border-accent hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            data-ai-hint="event cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Badge variant="outline" className="mb-2 border-accent text-accent font-code">{event.category}</Badge>
        <CardTitle className="font-headline text-xl text-primary-foreground mb-2">{event.title}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-3">{event.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col items-start gap-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-primary"/>
                <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary"/>
                <span>{event.time}</span>
            </div>
        </div>
        <Button variant="link" className="p-0 h-auto text-primary" asChild>
          <Link href={`/events/${event.id}`}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
