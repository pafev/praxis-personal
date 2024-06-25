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

export function FormsContato() {
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

  const handleSubmit = form.handleSubmit(({ email }) =>
    console.log("submeteu para o email ", email),
  );

  return (
    <div
      className="flex w-screen bg-gradient-to-r from-vermelho-praxis-translucido to-vermelho-praxis pb-32 pt-16"
      id="contato"
    >
      <div className="mx-8 w-full text-white md:mr-0 md:w-[403px] lg:ml-36">
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              <FormField
                control={form.control}
                name="empresa"
                render={({ field }) => (
                  <FormItem className="relative flex flex-col">
                    <FormControl className="h-11 border-2 border-transparent border-b-white bg-transparent">
                      <input
                        placeholder="Empresa"
                        className="cor-branca font-noto text-lg text-off-white focus:outline-none focus:ring focus:ring-vermelho-excelencia"
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
                    <FormControl className="h-11 border-2 border-transparent border-b-white bg-transparent">
                      <input
                        placeholder="Nome"
                        className="cor-branca font-noto text-lg text-off-white focus:outline-none focus:ring focus:ring-vermelho-excelencia"
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
                    <FormControl className="h-11 border-2 border-transparent border-b-white bg-transparent">
                      <input
                        placeholder="Email"
                        className="cor-branca font-noto text-lg text-off-white focus:outline-none focus:ring focus:ring-vermelho-excelencia"
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
                  <FormItem className="relative flex flex-col">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="h-11 rounded-none border-2 border-transparent border-b-white bg-transparent">
                        <SelectTrigger className="p-0 font-noto text-lg">
                          <SelectValue placeholder="Serviço" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="cursor-pointer bg-vermelho-excelencia text-white">
                        <SelectItem
                          value="Serviço 1"
                          className="cursor-pointer"
                        >
                          Serviço 1
                        </SelectItem>
                        <SelectItem
                          value="Serviço 2"
                          className="cursor-pointer"
                        >
                          Serviço 2
                        </SelectItem>
                        <SelectItem
                          value="Serviço 3"
                          className="cursor-pointer"
                        >
                          Serviço 3
                        </SelectItem>
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
                    <FormControl className="h-11 border-2 border-transparent border-b-white bg-transparent">
                      <input
                        placeholder="Mensagem"
                        className="cor-branca font-noto text-lg text-off-white focus:outline-none focus:ring focus:ring-vermelho-excelencia"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-off-white" />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="mt-11 rounded border-2 border-white bg-transparent"
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
