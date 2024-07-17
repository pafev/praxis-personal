import { type ReactNode } from "react";
import { cn } from "~/lib/utils";

export function IndicadorSecaoRoot({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("flex", className)}>{children}</div>;
}

export function IndicadorSecaoBarraVermelha({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative top-[9px] h-[3px] w-4 bg-vermelho-praxis shadow-[0_1px_2px_rgba(0,0,0,0.5)] md:w-7",
        className,
      )}
    />
  );
}

export function IndicadorSecaoBarraEscura({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative top-[9px] h-[3px] w-4 bg-off-black shadow-[0_1px_2px_rgba(0,0,0,0.5)] md:w-7",
        className,
      )}
    ></div>
  );
}

export function IndicadorSecaoNome({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <h1 className={`font-lora text-base ${className}`}>{children}</h1>;
}
