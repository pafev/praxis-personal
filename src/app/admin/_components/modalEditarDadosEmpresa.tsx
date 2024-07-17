"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Label } from "~/components/ui/label";

export default function ModalEditarDadosEmpresa() {
  const formSchema = z.object({
    whatsapp: z.string(),
    instagram: z.string(),
    linkedin: z.string(),
  });

  const pegaDadoAtual = api.praxis.get.useQuery();

  const router = useRouter();
  const updateDadosEmpresa = api.praxis.update.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      whatsapp: pegaDadoAtual.data?.whatsapp,
      instagram: pegaDadoAtual.data?.instagram,
      linkedin: pegaDadoAtual.data?.linkedin,
    },
  });

  useEffect(() => {
    if (pegaDadoAtual.data) {
      form.reset({
        whatsapp: pegaDadoAtual.data.whatsapp,
        instagram: pegaDadoAtual.data.instagram,
        linkedin: pegaDadoAtual.data.linkedin,
      });
    }
  }, [pegaDadoAtual.data, form]);

  const [response, setResponse] = useState("");

  const onSubmit = async (dados: z.infer<typeof formSchema>) => {
    setResponse("");
    await updateDadosEmpresa
      .mutateAsync({ ...dados })
      .then(() => {
        router.refresh();
        setResponse("Alteração feita com sucesso!");
      })
      .catch(() => {
        setResponse("Ocorreu um erro ao tentar modificar os dados da empresa!");
      });
  };

  return (
    <Card className="rounded-xl border border-vermelho-gentileza font-noto shadow-md shadow-off-black/30">
      <CardContent className="rounded-3xl bg-white ">
        <CardHeader className="text-center font-noto">
          <CardTitle>Editar dados da empresa</CardTitle>
          <CardDescription>
            Formulário utilizado para editar dados da empresa.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="whatsapp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link para o whatsapp</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Linkedin</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4 flex justify-end">
              <Button type="submit">Editar dados</Button>
            </div>
          </form>
        </Form>
        <Label className="text-vermelho-excelencia">{response}</Label>
      </CardContent>
    </Card>
  );
}
