import type { UseMutateFunction } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "~/components/ui/use-toast";
import { uploadUrl } from "~/lib/cloudinaryUpload";
import { urlDefaultImg } from "~/lib/defaultImg";

export function useFormUpdateArticle({
  updateFn,
  initialFormData,
  articleId,
}: {
  updateFn: UseMutateFunction<
    unknown,
    unknown,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >;
  initialFormData: {
    title: string;
    description?: string;
    content: object[];
    imageSrc?: string;
    themes: { name: string }[];
  };
  articleId: number;
}) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: initialFormData.title,
    description: initialFormData.description ?? "",
    content: initialFormData.content,
    imageSrc: initialFormData.imageSrc ?? urlDefaultImg,
    themes: initialFormData.themes,
  });
  function handleChangeInputText(ev: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
  }
  function handleChangeImageSrc(ev: React.ChangeEvent<HTMLInputElement>) {
    if (ev.target.files) {
      const file = ev.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () =>
          setFormData({ ...formData, imageSrc: reader.result as string });
        reader.readAsDataURL(file);
      }
    }
  }
  function handleChangeTheme(value: string) {
    setFormData({ ...formData, themes: [{ name: value }] });
  }
  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const publicId = formData.title
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\W+/g, "-");
    const uploadedImage = await uploadUrl({ url: formData.imageSrc, publicId });
    if (formData.content) {
      try {
        updateFn({
          content: formData.content,
          title: formData.title,
          description: formData.description,
          themes: formData.themes,
          imageSrc: uploadedImage.secure_url,
          id: articleId,
        });
        toast({
          title: "Sucesso!!",
          description:
            "O artigo foi atualizado com sucesso. Agora você pode vê-lo no blog",
        });
      } catch (error) {
        toast({
          title: "Ops! Não Foi Possível Editar o Artigo",
          description:
            "Por Favor! Verifique se Preencheu os Campos Necessários Corretamente ou se Já Não Existe um Artigo com esse Título",
          variant: "destructive",
        });
      }
    }
  }

  return {
    handleChangeInputText,
    handleChangeImageSrc,
    handleChangeTheme,
    handleSubmit,
    formData,
    setFormData,
  };
}
