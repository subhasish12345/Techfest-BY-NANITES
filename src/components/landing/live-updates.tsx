import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Rss } from "lucide-react";
import { updates } from "@/lib/data";

export function LiveUpdates() {
  return (
    <section className="py-16 md:py-24">
      <div className="text-center">
        <h2 className="font-headline text-3xl font-bold text-primary sm:text-4xl">
          Live Updates
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Stay in the loop with real-time announcements from the fest.
        </p>
      </div>
      <div className="mt-12 max-w-2xl mx-auto">
        <Card className="bg-card border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Rss className="h-6 w-6 text-accent" />
              <CardTitle className="font-headline text-2xl text-primary-foreground">
                Announcements
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-6">
              {updates.map((update) => (
                <li key={update.id} className="flex items-start gap-4">
                  <div className="mt-1">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-primary-foreground">{update.message}</p>
                    <p className="font-code text-sm text-muted-foreground">
                      {update.timestamp}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
