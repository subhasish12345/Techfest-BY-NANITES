
"use client"

import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartTooltipContent } from "@/components/ui/chart";

const userEngagementData = [
  { date: "Day 1", users: 1200 },
  { date: "Day 2", users: 1800 },
  { date: "Day 3", users: 1500 },
  { date: "Day 4", users: 2200 },
  { date: "Day 5", users: 2500 },
  { date: "Day 6", users: 2300 },
  { date: "Day 7", users: 3000 },
];

const eventParticipationData = [
  { name: "Web Dev", participants: 450 },
  { name: "AI/ML", participants: 680 },
  { name: "CyberSec", participants: 320 },
  { name: "Gaming", participants: 890 },
  { name: "Robotics", participants: 210 },
  { name: "Design", participants: 410 },
];

export function DashboardAnalytics() {
  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      <Card className="bg-card border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">User Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userEngagementData}>
                <Tooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Event Participation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={eventParticipationData}>
                <Tooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Bar dataKey="participants" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
