"use client";

import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Image } from "../projects/_components/types";

interface Props {
  images: Image[];
  isEditing?: boolean;
  isEditable: boolean;
  setIsEditing?: Dispatch<SetStateAction<boolean>>;
  onDelete?: () => void;
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

export function ImageCarousel({
  images,
  isEditing,
  isEditable,
  setIsEditing,
  onDelete,
}: Props) {
  const validImages = images.filter((img) => img.url && img.url.length > 0);

  if (validImages.length === 0) return null;

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  );

  return (
    <div className="relative w-full h-full  rounded">
      {!isEditing && isEditable && (
        <div className="flex gap-x-1  absolute top-2 right-3 z-10 opacity-10 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            className="btn btn-sm border-2 btn-ghost bg-base-100/80 hover:border-gray-300"
            onClick={() => setIsEditing?.(true)}
          >
            ✏️ Edit
          </button>
          <button
            type="button"
            className="btn btn-sm border-2 btn-ghost bg-base-100/80 text-red-500 hover:border-gray-300"
            onClick={onDelete}
          >
            ✕
          </button>
        </div>
      )}

      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full rounded *:data-[slot=carousel-content]:h-full"
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => {
          // play() can be wrong when uninstalling the component
          try {
            plugin.current?.play?.();
          } catch {
            // ignore
          }
        }}
        opts={{ align: "start", loop: true }}
      >
        <CarouselContent className="h-full">
          {validImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className=" relative w-full h-full rounded">
                {/* <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain rounded"
                /> temporary fix*/}
                <img
                  src={image.url}
                  key={index}
                  alt={image.alt ?? ""}
                  className=" w-full object-contain rounded"
                  sizes="(max-width: 768px) 100vw, 50vw"
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
