"use client";

import type { Theme } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

export function DeleteThemeButton({
  children,
  themes,
}: React.PropsWithChildren<{ themes: Theme[] }>) {
  const { toast } = useToast();
  const { mutateAsync, isPending } = api.theme.deleteUnique.useMutation();
  const router = useRouter();

  function handleClick(themeId: number) {
    mutateAsync({ id: themeId })
      .then(() => {
        router.refresh();
        toast({
          title: "Sucesso!",
          description:
            "Tema deletado com sucesso. Espere uns instantes até o blog atualizar ou recarregue a página",
        });
      })
      .catch(() => {
        toast({
          title: "Erro",
          description: "Erro ao deletar tema!!",
          variant: "destructive",
        });
      });
  }

  return (
    <Dialog>
      <DialogTrigger className={buttonVariants()}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Exclua um Tema</DialogTitle>
          <DialogDescription>
            Clique em Excluir para excluir permanentemente um dos temas abaixo
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-48">
          <ul className="flex flex-col divide-y-2 divide-off-black/20 px-4">
            {themes.map((theme) => (
              <li
                key={theme.id}
                className="flex items-center justify-between px-4 py-2"
              >
                <span>{theme.name}</span>
                <Button
                  onClick={() => handleClick(theme.id)}
                  variant={"ghost"}
                  className="p-0 text-vermelho-praxis hover:text-vermelho-praxis/70"
                >
                  Excluir
                </Button>
              </li>
            ))}
          </ul>
          <ScrollBar className="text-off-black/40" />
        </ScrollArea>
        <DialogClose className={buttonVariants()} disabled={isPending}>
          Fechar
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
