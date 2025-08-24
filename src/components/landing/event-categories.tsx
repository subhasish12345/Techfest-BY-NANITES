import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Cpu,
  ShieldCheck,
  Code2,
  BrainCircuit,
  Gamepad2,
  Bot,
  Palette,
  Network
} from "lucide-react";
import { eventCategoriesList } from "@/lib/types";

const iconMap: { [key: string]: React.ElementType } = {
  "AI & ML": BrainCircuit,
  "Web Development": Code2,
  "Cybersecurity": ShieldCheck,
  "Hardware & IoT": Cpu,
  "Competitive Programming": Network,
  "Gaming": Gamepad2,
  "Robotics": Bot,
  "UI/UX Design": Palette,
};

export function EventCategories() {
  return (
    <section className="py-16 md:py-24">
      <div className="text-center">
        <h2 className="font-headline text-3xl font-bold text-primary sm:text-4xl">
          Event Categories
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Explore a universe of technology. Find your passion, compete, and learn.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {eventCategoriesList.map((category) => {
          const Icon = iconMap[category] || Code2;
          return (
            <Card key={category} className="group transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/20 bg-card border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Icon className="h-8 w-8 text-accent" />
                  <CardTitle className="font-headline text-xl text-primary-foreground">{category}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Engage in cutting-edge challenges and workshops in {category}.
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
