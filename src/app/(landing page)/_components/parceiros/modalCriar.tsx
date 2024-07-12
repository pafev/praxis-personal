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

export default function ModalCriar() {
  const createParceiro = api.parceiros.createParceiro.useMutation();

  const formSchema = z.object({
    imagem: z.string().min(1, { message: "Campo não pode ser nulo." }),
    link: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { imagem: "", link: "" },
  });

  const router = useRouter();

  const onSubmit = (dados: z.infer<typeof formSchema>) => {
    createParceiro.mutateAsync(dados).then(() => router.refresh());
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Criar parceiro</Button>
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
              name="imagem"
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
      </DialogContent>
    </Dialog>
  );
}
