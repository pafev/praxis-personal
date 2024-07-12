import { ReactNode } from "react";

export function IndicadorSecaoRoot({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className ?? ""}>{children}</div>;
}

export function IndicadorSecaoBarraVermelha({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`relative top-[9px] h-1 w-4 bg-vermelho-praxis md:w-7 ${className}`}
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
      className={`relative top-[9px] h-1 w-4 bg-off-black md:w-7 ${className}`}
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
  return <h1 className={`text-base ${className}`}>{children}</h1>;
}
