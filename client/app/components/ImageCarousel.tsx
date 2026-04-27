"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";


const images = [
  { id: 1, src: "/images/photo-1.jpg", alt: "风景照 1" },
  { id: 2, src: "/images/photo-2.jpg", alt: "风景照 2" },
  { id: 3, src: "/images/photo-3.jpg", alt: "风景照 3" },
];

export function ImageCarousel() {
  // configuration
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  );

  return (
    
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs md:max-w-2xl lg:max-w-4xl"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        align: "start",
        loop: true, // infinite loop
      }}
    >
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.id}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">

                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={800}
                    height={600}
                    className="object-cover rounded-md"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* optional : previous and next */}
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
