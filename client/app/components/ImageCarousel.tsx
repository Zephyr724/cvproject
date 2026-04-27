"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ContentImage } from "../project/_components/types";

interface Props {
  images: ContentImage[];
}

const Dots = () => {
  const { api } = useCarousel();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (!api) return;

    setScrollSnaps(api.scrollSnapList());
    setSelectedIndex(api.selectedScrollSnap());

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (!api || scrollSnaps.length === 0) return null;

  return (
    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
      {scrollSnaps.map((_, idx) => (
        <button
          key={idx}
          className={`h-2 rounded-full transition-all duration-300 hover:bg-white ${
            selectedIndex === idx ? "bg-white/30 w-4" : "bg-gray-200/30 w-2"
          }`}
          onClick={() => api.scrollTo(idx)}
          aria-label={`Go to slide ${idx + 1}`}
        />
      ))}
    </div>
  );
};

export function ImageCarousel({ images }: Props) {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  );

  return (
    <div className="absolute inset-0 overflow-hidden rounded-md ">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full *:data-[slot=carousel-content]:h-full"
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.play()}
        opts={{ align: "start", loop: true }}
      >
        <CarouselContent className="h-full">
          {images.map((image) => (
            <CarouselItem key={image.id}>
              <div className=" relative w-full h-full rounded-md">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover "
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 z-10 border-white/13 bg-black/13 text-white/13  hover:border-white/50 hover:bg-black/50 hover:text-white/50" />
        <CarouselNext className="right-2 z-10  border-white/13 bg-black/13 text-white/13  hover:border-white/50 hover:bg-black/50 hover:text-white/50" />
        <Dots />
      </Carousel>
    </div>
  );
}
