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
import { useState } from "react";
import { Label } from "~/components/ui/label";

export function ModalDeletar({
  id,
  className = "",
}: {
  id: number;
  className?: string;
}) {
  const router = useRouter();
  const [response, setResponse] = useState("");
  const { mutate } = api.partners.deleteUnique.useMutation({
    onSuccess: () => {
      router.refresh();
      setResponse("Parceiro deletado com sucesso!");
    },
    onError: () => {
      setResponse("Ocorreu um erro ao deletar o parceiro!");
    },
  });
  return (
    <div className={className}>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-transparent transition ease-linear hover:-translate-y-1 hover:bg-transparent">
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
            <AlertDialogAction
              onClick={() => {
                setResponse("");
                mutate({ id });
              }}
            >
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
          <Label className="text-vermelho-excelencia">{response}</Label>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
