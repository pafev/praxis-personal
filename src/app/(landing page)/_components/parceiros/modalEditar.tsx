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

export default function ModalEditar({
  id,
  className = "",
}: {
  id: number;
  className?: string;
}) {
  const { mutateAsync } = api.partners.updateUnique.useMutation();

  const formSchema = z.object({
    imagem: z.string(),
    link: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { imagem: "", link: "" },
  });

  const router = useRouter();

  const onSubmit = (dados: z.infer<typeof formSchema>) => {
    mutateAsync({ id, ...dados })
      .then(() => router.refresh())
      .catch(console.log);
  };

  return (
    <div className={className}>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-off-white hover:bg-off-white">
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
                <Button>Editar parceiro</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
