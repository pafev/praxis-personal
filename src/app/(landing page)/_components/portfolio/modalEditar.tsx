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
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ModalEditar({ id }: { id: number }) {
  const formSchema = z.object({
    imagem: z.string(),
    descricao: z.string(),
    nome: z.string(),
  });

  const router = useRouter();

  const { mutateAsync } = api.portfolio.updateUnique.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { nome: "", imagem: "", descricao: "" },
  });

  const onSubmit = (dados: z.infer<typeof formSchema>) => {
    mutateAsync({ id, ...dados })
      .then(() => {
        router.refresh();
      })
      .catch(console.log);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="absolute bottom-4 right-0 z-20 bg-transparent hover:bg-transparent">
          <Pencil
            size={36}
            color="white"
            className="transition duration-300 ease-linear hover:stroke-zinc-600"
          />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar um parceiro</DialogTitle>
          <DialogDescription>
            Formulário utilizado para editar um existente parceiro.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
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
              name="imagem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagem</FormLabel>
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
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descricao</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button>Editar parceiro</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
