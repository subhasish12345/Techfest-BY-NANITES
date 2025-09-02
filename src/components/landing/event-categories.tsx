import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Cpu,
  ShieldCheck,
  Code2,
  BrainCircuit,
  Gamepad2,
  Bot,
  Palette,
  Network,
  Music,
  Paintbrush,
  Users,
  Trophy,
  PartyPopper
} from "lucide-react";
import { eventCategories } from "@/lib/types";

const iconMap: { [key: string]: React.ElementType } = {
  "Programming & Development": Code2,
  "Hardware & Innovation": Cpu,
  "Design & Creativity": Palette,
  "Creative Arts": Paintbrush,
  "Interactive Competitions": Users,
  "Entertainment": Gamepad2,
  "Cultural Fest": PartyPopper,
};

const categoryDescriptions: { [key: string]: string } = {
    "Programming & Development": "Showcase your coding and development skills in various challenges.",
    "Hardware & Innovation": "Build, design, and innovate with cutting-edge hardware.",
    "Design & Creativity": "Bring your creative ideas to life through design and presentation.",
    "Creative Arts": "Express your artistic talents in digital and traditional forms.",
    "Interactive Competitions": "Test your knowledge and strategic thinking in fun competitions.",
    "Entertainment": "Relax and have fun with games, puzzles, and creative contests.",
    "Cultural Fest": "Join the celebration with music, dance, and performances."
}

export function EventCategories() {
  const allCategories = [
      ...eventCategories.technical,
      ...eventCategories["non-technical"],
      ...eventCategories.cultural
  ]
  return (
    <section className="py-16 md:py-24">
      <div className="text-center">
        <h2 className="font-headline text-3xl font-bold text-primary sm:text-4xl">
          Event Categories
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Explore a universe of technology and creativity. Find your passion, compete, and learn.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allCategories.map((category) => {
          const Icon = iconMap[category] || Code2;
          return (
            <Card key={category} className="group transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/20 hover:border-primary bg-card border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Icon className="h-8 w-8 text-accent transition-colors duration-300 group-hover:text-primary" />
                  <CardTitle className="font-headline text-xl text-primary-foreground">{category}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                    {categoryDescriptions[category] || "Engage in cutting-edge challenges and workshops."}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
