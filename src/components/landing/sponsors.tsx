import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { sponsors } from "@/lib/data";

export function Sponsors() {
  return (
    <section className="py-16 md:py-24">
      <div className="text-center">
        <h2 className="font-headline text-3xl font-bold text-primary sm:text-4xl">
          Our Sponsors
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Powering innovation and supporting the future of tech.
        </p>
      </div>
      <div className="mt-12">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {sponsors.map((sponsor) => (
              <CarouselItem key={sponsor.id} className="md:basis-1/3 lg:basis-1/4">
                <div className="p-1">
                  <Link href={sponsor.url} target="_blank" rel="noopener noreferrer">
                    <div className="flex aspect-video items-center justify-center p-6 bg-card rounded-lg border border-primary/20 transition-all duration-300 hover:border-accent hover:shadow-lg hover:shadow-accent/20">
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        width={150}
                        height={75}
                        className="object-contain"
                        data-ai-hint="company logo"
                      />
                    </div>
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-primary hover:text-accent" />
          <CarouselNext className="text-primary hover:text-accent" />
        </Carousel>
      </div>
    </section>
  );
}
