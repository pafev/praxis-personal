"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/trpc/react";
import { Textarea } from "~/components/ui/textarea";

export function FormsContato() {
  const { data: portfolios } = api.portfolio.getAll.useQuery();

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
      mensagem: "",
    },
  });

  const handleSubmit = async (data: {
    empresa: string;
    nome: string;
    email: string;
    servico: string;
    mensagem: string;
  }) => {
    const body = {
      service_id: process.env.NEXT_PUBLIC_MAIL_SERVICE_ID,
      template_id: process.env.NEXT_PUBLIC_MAIL_TEMPLATE_ID,
      user_id: process.env.NEXT_PUBLIC_MAIL_USER_ID,
      template_params: data,
    };
    await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div
      className="flex w-screen bg-gradient-to-r from-vermelho-praxis-translucido to-vermelho-praxis pb-32 pt-16"
      id="contato"
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
                render={({ field }) => (
                  <FormItem className="relative flex flex-col ">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="h-11 rounded-none border-b-2 border-transparent border-b-off-white/85 bg-transparent  transition-all ease-linear focus:border-b-white">
                        <SelectTrigger className="p-0 font-noto ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 md:text-lg">
                          <SelectValue placeholder="Serviço" className="" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="cursor-pointer border-0 bg-vermelho-praxis/80 text-white backdrop-blur">
                        {portfolios?.map((portfolio) => (
                          <SelectItem
                            key={portfolio.id}
                            value={portfolio.name}
                            className="cursor-pointer"
                          >
                            {portfolio.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
