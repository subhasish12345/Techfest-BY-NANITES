
"use client"

import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from "@/components/ui/chart";

export function DashboardAnalytics() {
  // Hardcoded fake data for demonstration
  const eventParticipationData = [
    { name: "Code Combat", participants: 125, category: "Programming" },
    { name: "Robo Wars", participants: 98, category: "Hardware" },
    { name: "Tech Quiz", participants: 85, category: "Competition" },
    { name: "LAN Gaming", participants: 72, category: "Entertainment" },
    { name: "App Dev Challenge", participants: 65, category: "Programming" },
    { name: "Treasure Hunt", participants: 55, category: "Competition" },
    { name: "Drone Racing", participants: 42, category: "Hardware" },
  ].sort((a, b) => b.participants - a.participants);

  const engagementByDayData = [
    { date: "Day 1", registrations: 280 },
    { date: "Day 2", registrations: 350 },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      <Card className="bg-card border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Daily Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementByDayData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                <Tooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Legend content={<ChartLegendContent />} />
                <Line name="Registrations" type="monotone" dataKey="registrations" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="bg-card border-primary/20">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Top Event Participation</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={eventParticipationData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 0 }}>
                <Tooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <Legend content={<ChartLegendContent />} />
                <Bar name="Participants" dataKey="participants" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
