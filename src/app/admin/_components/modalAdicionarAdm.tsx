"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
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
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useState } from "react";
import { Label } from "~/components/ui/label";

export default function ModalEditarUsuario() {
  const formSchema = z.object({
    email: z.string().email({ message: "Valor deve ser um email válido." }),
    role: z.string(),
  });

  const router = useRouter();
  const updateUser = api.user.updateRole.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      role: "",
    },
  });

  const [response, setResponse] = useState("");

  const onSubmit = async (dados: z.infer<typeof formSchema>) => {
    setResponse("");
    await updateUser
      .mutateAsync({
        ...dados,
      })
      .then(() => {
        router.refresh();
        setResponse("Alteração feita com sucesso!");
      })
      .catch(() => {
        setResponse(
          "Ocorreu um erro ao tentar modificar o nível de permissão do usuário! Certifique se o email requerido está correto e se este email realizou login no site antes.",
        );
      });
  };

  return (
    <Card className="rounded-xl border border-red-500 font-noto shadow-md shadow-gray-300">
      <CardContent className="rounded-3xl bg-white">
        <CardHeader className="text-center font-noto">
          <CardTitle>Editar dados do usuário</CardTitle>
          <CardDescription>
            Formulário utilizado para editar dados do usuário.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
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
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mudar cargo do usuário</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o cargo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ADMIN">ADMIN</SelectItem>
                        <SelectItem value="USER">USER</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4 flex justify-end">
              <Button type="submit">Salvar alterações</Button>
            </div>
          </form>
        </Form>
        <Label className="text-vermelho-excelencia">{response}</Label>
      </CardContent>
    </Card>
  );
}
