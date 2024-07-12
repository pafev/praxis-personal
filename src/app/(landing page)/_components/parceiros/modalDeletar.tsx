"use client";

import { Trash2 } from "lucide-react";
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
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export function ModalDeletar({
  id,
  className = "",
}: {
  id: number;
  className?: string;
}) {
  const router = useRouter();
  const { mutate } = api.partners.deleteUnique.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  return (
    <div className={className}>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-off-white hover:bg-off-white">
            <Trash2 size={36} color="red" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar o parceiro</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Você tem certeza que quer deletar
              esse parceiro?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => mutate({ id })}>
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
