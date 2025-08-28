
import Image from "next/image";
import { galleryImages } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Gallery() {
  return (
    <section className="py-16 md:py-24">
      <div className="text-center">
        <h2 className="font-headline text-3xl font-bold text-primary sm:text-4xl">
          Glimpses from the Past
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Relive the moments that made our previous fests unforgettable.
        </p>
      </div>
      <div className="relative mt-12 w-full overflow-hidden">
        <div className="flex w-max animate-marquee group-hover:pause">
          {[...galleryImages, ...galleryImages].map((image, index) => (
            <div key={index} className="relative aspect-video w-72 mx-3 shrink-0 overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                  data-ai-hint="tech event"
                />
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent"></div>
      </div>
    </section>
  );
}

