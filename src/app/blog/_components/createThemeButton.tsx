"use client";

import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

export function CreateThemeButtton({ children }: React.PropsWithChildren) {
  const { toast } = useToast();
  const router = useRouter();

  const { mutateAsync, isPending } = api.theme.createUnique.useMutation();

  function createTheme(formData: FormData) {
    const name = formData.get("name") as string;
    if (name) {
      mutateAsync({ name })
        .then(() => {
          router.refresh();
          toast({
            title: "Sucesso!",
            description:
              "Tema criado com sucesso!! Recarregue a Página para ver a alteração",
          });
        })
        .catch((error) => {
          console.log(error);
          toast({
            title: "Erro",
            description:
              "Erro ao criar o tema. Verifique se o tema já não existe",
            variant: "destructive",
          });
        });
    } else {
      toast({
        title: "Erro",
        description:
          "Erro ao criar o tema. Verifique se preencheu o nome corretamente",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger className={buttonVariants()}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crie um Tema</DialogTitle>
          <DialogDescription>
            Digite o nome de um novo tema e depois clique em Criar
          </DialogDescription>
        </DialogHeader>
        <form action={createTheme} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="name">Nome para o tema</Label>
            <Input
              id="name"
              name="name"
              placeholder="Nome"
              className="outline-none ring-0 focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
            />
          </div>
          <Button disabled={isPending}>Criar</Button>
        </form>
        <DialogFooter>
          <DialogClose className={buttonVariants()} disabled={isPending}>
            Fechar
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
