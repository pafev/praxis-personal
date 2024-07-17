"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { DialogHeader } from "~/components/ui/dialog";
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
import { useState } from "react";
import { Label } from "~/components/ui/label";

export default function ModalCriar() {
  const createParceiro = api.partners.createUnique.useMutation();
  const [response, setResponse] = useState("");

  const formSchema = z.object({
    image: z.string().min(1, { message: "Campo não pode ser nulo." }),
    link: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { image: "", link: "" },
  });

  const router = useRouter();

  const onSubmit = async (dados: z.infer<typeof formSchema>) => {
    setResponse("");
    await createParceiro
      .mutateAsync(dados)
      .then(() => {
        router.refresh();
        setResponse("Parceiro criado com sucesso!");
      })
      .catch(() => setResponse("Ocorreu um erro ao criar o parceiro!"));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="col-span-full row-start-2 mx-auto w-fit md:col-span-3 md:row-start-1">
          Criar parceiro
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar um parceiro</DialogTitle>
          <DialogDescription>
            Formulário utilizado para criar um novo parceiro.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagem*</FormLabel>
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
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button>Criar parceiro</Button>
            </div>
          </form>
        </Form>
        <Label className="w-full text-center font-semibold text-vermelho-excelencia">
          {response}
        </Label>
      </DialogContent>
    </Dialog>
  );
}
