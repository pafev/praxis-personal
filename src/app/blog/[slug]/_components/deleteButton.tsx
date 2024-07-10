"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { buttonVariants } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/server";

export function DeleteButton({
  children,
  artiicleId,
}: React.PropsWithChildren<{ artiicleId: number }>) {
  const { toast } = useToast();

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={buttonVariants({
          className:
            "shadow-md transition-shadow duration-100 ease-in-out hover:shadow-lg",
        })}
      >
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem Certeza Absoluta?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Ao continuar, o artigo será apagado
            permanentemente do blog.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              try {
                await api.article.deleteUnique({ id: artiicleId });
              } catch (error) {
                toast({
                  title: "Ops! Não Deu para Excluir o Artigo",
                  description:
                    "Erro Interno no Servidor! Não Foi Possível Excluir o Artigo Desejado",
                  variant: "destructive",
                });
              }
            }}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    // </Button>
  );
}
