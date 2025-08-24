import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import { CountdownTimer } from "./countdown-timer";

export function Hero() {
  const festDate = new Date("2024-10-26T09:00:00");

  return (
    <div className="relative isolate overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"
      ></div>
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#00D4FF] to-[#10B981] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-white sm:text-6xl animate-glow">
          TechFest <span className="text-primary">2024</span>
        </h1>
        <p className="mt-6 font-body text-lg leading-8 text-gray-300">
          The ultimate celebration of technology, innovation, and creativity.
          Join us for three days of mind-blowing events.
        </p>
        <div className="mt-10">
          <CountdownTimer targetDate={festDate} />
        </div>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button size="lg" className="glow-shadow">
            Register Now
            <Rocket className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="link" className="text-primary">
            View Events &rarr;
          </Button>
        </div>
      </div>
    </div>
  );
}
