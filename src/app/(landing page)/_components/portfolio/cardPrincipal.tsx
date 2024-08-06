import { type ReactNode } from "react";
import { CloudImage } from "../cldImage";
import { cn } from "~/lib/utils";

export const CardPrincipalPortfolio = {
  Root: cardPrincipalPortfolioRoot,
  Image: CardPrincipalPortfolioImage,
  Title: cardPrincipalPortfolioTitle,
  Description: cardPrincipalPortfolioDescription,
};

export function cardPrincipalPortfolioRoot({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative z-10 min-h-72 text-wrap py-2 shadow-md shadow-off-black/30 grayscale transition-all duration-150 ease-linear hover:shadow-lg hover:shadow-off-black/30 hover:grayscale-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardPrincipalPortfolioImage({
  url,
  className = "",
}: {
  url: string;
  className?: string;
}) {
  return (
    <CloudImage
      alt=""
      src={url}
      fill
      className={cn(
        `absolute -z-10 h-full w-full object-cover brightness-[35%] transition-all ease-linear`,
        className,
      )}
    />
  );
}

export function cardPrincipalPortfolioTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "mx-4 my-2 cursor-default font-semibold text-white md:my-6 md:text-lg lg:mx-12",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function cardPrincipalPortfolioDescription({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mx-4 mt-4 cursor-default text-sm text-white md:mb-6 md:text-base lg:mx-12",
        className,
      )}
    >
      {children}
    </p>
  );
}
