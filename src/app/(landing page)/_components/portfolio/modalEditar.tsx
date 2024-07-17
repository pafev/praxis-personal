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
import { useState } from "react";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

export default function ModalEditar({ id }: { id: number }) {
  const formSchema = z.object({
    image: z.string(),
    description: z.string(),
    name: z.string(),
  });

  const router = useRouter();
  const [response, setResponse] = useState("");

  const updatePortfolio = api.portfolio.updateUnique.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", image: "", description: "" },
  });

  const onSubmit = async (dados: z.infer<typeof formSchema>) => {
    setResponse("");
    await updatePortfolio
      .mutateAsync({ id, ...dados })
      .then(() => {
        router.refresh();
        setResponse("Alteração feita com sucesso!");
      })
      .catch(() => setResponse("Ocorreu um erro ao editar o portfólio!"));
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
          <DialogTitle>Editar o portfólio</DialogTitle>
          <DialogDescription>
            Formulário utilizado para editar o portfólio.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
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
              name="image"
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descricao</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button>Editar portfólio</Button>
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
