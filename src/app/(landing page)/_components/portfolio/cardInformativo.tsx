import { MessagesSquare } from "lucide-react";
import { type ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

export const cardInformativo = {
  Root: cardInformativoRoot,
  Card: cardInformativoCard,
};

export function cardInformativoRoot({ children }: { children: ReactNode }) {
  return (
    <Accordion
      type="multiple"
      className="flex w-full flex-wrap justify-between gap-y-12"
    >
      {children}
    </Accordion>
  );
}

export function cardInformativoCard({
  titulo,
  descricao,
  value,
}: {
  titulo: string;
  descricao: string;
  value: number;
}) {
  return (
    <AccordionItem
      value={`item-${value}`}
      className="w-full border-b-0 font-noto font-normal text-off-white md:text-lg lg:w-[48%]"
    >
      <div className="w-full rounded-sm bg-gradient-to-b from-vermelho-praxis to-vermelho-praxis-translucido px-4 py-1 shadow-md">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex w-full">
            <MessagesSquare size={24} className="shrink-0 self-center" />
            <h2 className="mx-auto">{titulo}</h2>
          </div>
        </AccordionTrigger>
        <AccordionContent>{descricao}</AccordionContent>
      </div>
    </AccordionItem>
  );
}
