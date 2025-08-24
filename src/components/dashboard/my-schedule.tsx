import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { events } from "@/lib/data";

// Mock data for user's registered events
const registeredEvents = events.slice(0, 3);

export function MySchedule() {
  return (
    <Card className="bg-card border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">My Registered Events</CardTitle>
        <CardDescription>
          Your personalized timeline for TechFest 2024.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registeredEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium text-primary-foreground">{event.title}</TableCell>
                <TableCell>
                    <Badge variant="outline" className="border-accent text-accent font-code">{event.category}</Badge>
                </TableCell>
                <TableCell className="font-code">{event.date}, {event.time}</TableCell>
                <TableCell>
                  <Badge className="bg-accent text-accent-foreground">Registered</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
