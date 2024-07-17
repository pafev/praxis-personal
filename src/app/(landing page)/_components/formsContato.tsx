"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Checkbox } from "~/components/ui/checkbox";

import { cn } from "~/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { api } from "~/trpc/react";
import { Textarea } from "~/components/ui/textarea";

interface Servicos {
  value: string;
  label: string;
}

export function FormsContato() {
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const { data: portfolios } = api.portfolio.getAll.useQuery();

  const servicos: Servicos[] = (portfolios ?? []).map((servico) => {
    return { value: servico.name, label: servico.name };
  });

  const formSchema = z.object({
    empresa: z
      .string()
      .min(2, {
        message: "Nome da empresa deve conter pelo menos 2 caracteres",
      })
      .max(100, {
        message: "Nome da empresa deve conter menos que 50 caracteres",
      }),
    nome: z
      .string()
      .min(2, { message: "Nome deve conter pelo menos 2 caracteres" })
      .max(50, { message: "Nome deve conter menos que 50 caracteres" }),
    email: z
      .string()
      .min(2, { message: "Email deve conter pelo menos 2 caracteres" })
      .max(50, { message: "Email deve conter menos que 50 caracteres" })
      .email({ message: "Email inserido é inválido" }),
    servico: z.string(),
    outros: z.string().optional(),
    mensagem: z
      .string()
      .min(2, { message: "Mensagem deve conter pelo menos 2 caracteres" }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      empresa: "",
      nome: "",
      email: "",
      servico: "",
      outros: "",
      mensagem: "",
    },
  });

  const handleSubmit = async (data: {
    empresa: string;
    nome: string;
    email: string;
    servico: string;
    outros?: string;
    mensagem: string;
  }) => {
    const body = {
      service_id: process.env.NEXT_PUBLIC_MAIL_SERVICE_ID,
      template_id: process.env.NEXT_PUBLIC_MAIL_TEMPLATE_ID,
      user_id: process.env.NEXT_PUBLIC_MAIL_USER_ID,
      template_params: {
        ...data,
        servico: `${data.servico}${data.servico.length && data.outros?.length ? ", " : ""}${data.outros}`,
      },
    };
    await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(data);
  };

  const toggleService = (value: string) => {
    setSelectedValues((prev) => {
      const newValues = prev.includes(value)
        ? prev.filter((val) => val !== value)
        : [...prev, value];
      form.setValue("servico", newValues.join(", "));
      return newValues;
    });
  };

  return (
    <div
      className="flex w-screen bg-gradient-to-r from-vermelho-praxis-translucido to-vermelho-praxis pb-32 pt-16"
      id="Contato"
    >
      <div className="mx-8 w-full text-white md:mr-0 md:w-[403px] lg:ml-36">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="space-y-8">
              <FormField
                control={form.control}
                name="empresa"
                render={({ field }) => (
                  <FormItem className="relative flex flex-col">
                    <FormControl className="h-11 border-2 border-transparent border-b-off-white/85 bg-transparent transition-all ease-linear focus:border-b-white">
                      <input
                        placeholder="Empresa"
                        className="cor-branca font-noto text-off-white outline-none md:text-lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-off-white" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem className="relative flex flex-col">
                    <FormControl className="h-11 border-2 border-transparent border-b-off-white/85 bg-transparent transition-all ease-linear focus:border-b-white">
                      <input
                        placeholder="Nome"
                        className="cor-branca font-noto text-off-white outline-none md:text-lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-off-white" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="relative flex flex-col">
                    <FormControl className="h-11 border-2 border-transparent border-b-off-white/85 bg-transparent transition-all ease-linear focus:border-b-white">
                      <input
                        placeholder="Email"
                        className="cor-branca font-noto text-off-white outline-none md:text-lg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-off-white" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="servico"
                render={() => (
                  <FormItem className="relative flex flex-col">
                    <Popover open={open} onOpenChange={setOpen}>
                      <FormControl className="h-11 rounded-none border-transparent bg-transparent transition-all ease-linear focus:border-b-white">
                        <PopoverTrigger asChild>
                          <Button
                            aria-expanded={open}
                            className="justify-between p-0 font-noto ring-0 ring-offset-0 hover:bg-transparent focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 md:text-lg"
                          >
                            <div className="overflow-y-auto">
                              {selectedValues.length
                                ? selectedValues
                                    .map(
                                      (value) =>
                                        servicos.find(
                                          (servico) => servico.value === value,
                                        )?.label,
                                    )
                                    .join(", ")
                                : "Serviços"}
                            </div>
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                      </FormControl>
                      <PopoverContent className="border-2 border-vermelho-excelencia p-0">
                        <Command className="bg-white font-noto font-medium text-off-black backdrop-blur">
                          <CommandInput />
                          <CommandEmpty className="border-none pb-2 text-center">
                            Serviço não encontrado
                          </CommandEmpty>
                          <CommandGroup className="border-t-2 border-vermelho-excelencia  text-off-black">
                            {servicos.map((servico) => (
                              <CommandItem
                                key={servico.value}
                                value={servico.value}
                                onSelect={() => toggleService(servico.value)}
                                className="ring-off-black hover:ring"
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedValues.includes(servico.value)
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {servico.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-off-white" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="outros"
                render={({ field }) => (
                  <FormItem className="relative flex flex-col">
                    <FormControl className="flex h-11 items-center border-2 border-transparent border-b-white bg-transparent">
                      <span>
                        <Checkbox
                          checked={checked}
                          onCheckedChange={handleCheckboxChange}
                          className="mr-2 h-5 w-5 rounded-md border-white data-[state=checked]:bg-white data-[state=checked]:text-vermelho-excelencia"
                        />
                        <input
                          disabled={!checked}
                          placeholder="Clique para adicionar outro serviço"
                          {...field}
                          className="cor-branca w-full bg-transparent font-noto text-lg text-off-white focus:outline-none"
                        />
                      </span>
                    </FormControl>
                    <FormMessage className="text-off-white" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mensagem"
                render={({ field }) => (
                  <FormItem className="relative flex flex-col">
                    <FormControl className="h-11 border-2 border-transparent border-b-off-white/85 bg-transparent transition-all ease-linear focus:border-b-white">
                      <Textarea
                        placeholder="Mensagem adicional"
                        {...field}
                        className="max-h-40 px-0 font-noto text-base text-off-white outline-none placeholder:text-off-white focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 md:text-lg"
                      />
                    </FormControl>
                    <FormMessage className="text-off-white" />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="mt-11 rounded border-2 border-white bg-transparent px-4 py-6 hover:bg-transparent focus-visible:ring-0 md:text-lg"
            >
              Enviar
            </Button>
          </form>
        </Form>
      </div>
      <Image
        src="/Praxis-Logo-Completa-Branca.png"
        alt="logo praxis"
        width={500}
        height={250}
        className="ml-auto mr-40 hidden self-center md:mr-auto md:flex"
      />
    </div>
  );
}
