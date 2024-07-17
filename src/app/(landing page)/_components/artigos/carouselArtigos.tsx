"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import CardArtigoLandingPage from "./cardArtigoLandingPage";
import Autoplay from "embla-carousel-autoplay";
import { api } from "~/trpc/react";

export function CarouselArtigos() {
  const { data: articles } = api.article.getArticlesForCarousel.useQuery();

  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        {articles?.map((article) => (
          <CarouselItem
            key={article.id}
            className="max-w-[538px] px-8 lg:basis-1/3"
          >
            <CardArtigoLandingPage article={article} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
