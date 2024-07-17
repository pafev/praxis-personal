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
import { Label } from "~/components/ui/label";
import { useState } from "react";

export default function ModalEditar({
  id,
  className = "",
}: {
  id: number;
  className?: string;
}) {
  const { mutateAsync } = api.partners.updateUnique.useMutation();

  const formSchema = z.object({
    image: z.string(),
    link: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { image: "", link: "" },
  });

  const router = useRouter();
  const [response, setResponse] = useState("");

  const onSubmit = (dados: z.infer<typeof formSchema>) => {
    setResponse("");
    mutateAsync({ id, ...dados })
      .then(() => {
        router.refresh();
        setResponse("Alteração realizada com sucesso!");
      })
      .catch(() => setResponse("Ocorreu um erro ao editar o parceiro!"));
  };

  return (
    <div className={className}>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-transparent transition ease-linear hover:-translate-y-1 hover:bg-transparent">
            <Pencil size={36} color="green" />
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
                <Button>Editar parceiro</Button>
              </div>
            </form>
          </Form>
          <Label className="w-full text-center font-semibold text-vermelho-excelencia">
            {response}
          </Label>
        </DialogContent>
      </Dialog>
    </div>
  );
}
