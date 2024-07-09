"use client";
import { type Theme } from "@prisma/client";
import { ListFilter, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { datas } from "~/lib/datasBlog";
import { type BlogFilterParams } from "../../page";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export function Filters({
  filterParams,
  themes,
}: {
  filterParams: BlogFilterParams;
  themes: Theme[];
}) {
  const router = useRouter();

  return (
    <div className="mx-8 mb-12 flex flex-col gap-4 lg:mx-36 lg:flex-row lg:justify-between">
      <div className="lg: flex flex-col justify-start gap-4 md:flex-row">
        <Select
          onValueChange={(value) => {
            router.push(
              "?" +
                new URLSearchParams({
                  ...filterParams,
                  theme: value,
                }).toString(),
              { scroll: false },
            );
          }}
          defaultValue={filterParams.theme}
        >
          <SelectTrigger className="min-w-36 border-black bg-white px-4 text-left hover:shadow-md">
            <SelectValue placeholder="Tema" />
          </SelectTrigger>
          <SelectContent className="min-w-36 bg-white">
            {themes.map((theme) => (
              <SelectItem key={theme.id} value={theme.name}>
                {theme.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => {
            router.push(
              "?" +
                new URLSearchParams({
                  ...filterParams,
                  date: value,
                }).toString(),
              { scroll: false },
            );
          }}
          defaultValue={filterParams.date}
        >
          <SelectTrigger className="min-w-40 border-black bg-white px-4 text-left hover:shadow-md">
            <SelectValue placeholder="Data" />
          </SelectTrigger>
          <SelectContent className="min-w-40 bg-white">
            {datas.map((date) => (
              <SelectItem key={date.valor} value={date.valor}>
                {date.valor}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          className="rounded-sm border-2 border-vermelho-praxis bg-transparent p-3 text-vermelho-praxis transition-all ease-in-out hover:text-white hover:shadow-md"
          onClick={() => {
            router.push(
              "?" +
                new URLSearchParams({
                  date: "Mais Recentes",
                  search: filterParams.search,
                  theme: "Ver Tudo",
                  page: "1",
                }).toString(),
              { scroll: false },
            );
          }}
        >
          <X size={18} />
        </Button>
      </div>
      <span className="hidden self-center font-lora font-semibold lg:flex">
        Navegue Pelo Blog Praxis e Conheça Nossos Artigos
      </span>
      <div className="flex items-center gap-2 lg:self-center">
        <ListFilter />
        <span className="">Filtros</span>
      </div>
    </div>
  );
}
