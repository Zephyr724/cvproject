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

const images = [
  { id: 1, src: "https://picsum.photos/2560/1440", alt: "风景照 1" },
  { id: 2, src: "https://picsum.photos/1920/1080", alt: "风景照 2" },
  { id: 3, src: "https://picsum.photos/720/1024", alt: "风景照 3" },
  { id: 4, src: "https://picsum.photos/720/1024", alt: "风景照 3" },
  { id: 5, src: "https://picsum.photos/1920/1080", alt: "风景照 3" },
  { id: 6, src: "https://picsum.photos/1920/1080", alt: "风景照 3" },
  { id: 7, src: "https://picsum.photos/1920/1080", alt: "风景照 3" },
  { id: 8, src: "https://picsum.photos/1920/1080", alt: "风景照 3" },
  { id: 9, src: "https://picsum.photos/2560/1440", alt: "风景照 3" },
];

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
    <div className="flex justify-center gap-2 py-3">
      {scrollSnaps.map((_, idx) => (
        <button
          key={idx}
          className={`h-2 rounded-full transition-all duration-300 ${
            selectedIndex === idx ? "bg-white w-4" : "bg-gray-200 w-2"
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
    <Carousel
      plugins={[plugin.current]}
      className="w-full overflow-hidden"
      onMouseEnter={() => plugin.current.stop()}
      onMouseLeave={() => plugin.current.play()}
      opts={{ align: "start", loop: true }}
    >
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.id}>
            <div className="relative aspect-video overflow-hidden rounded-md">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain "
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <Dots />
    </Carousel>
  );
}
