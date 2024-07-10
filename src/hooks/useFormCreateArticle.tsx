import type {
  BlockConfig,
  BlockNoteEditor,
  InlineContentSchema,
  StyleSchema,
} from "@blocknote/core";
import type { UseMutateFunction } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "~/components/ui/use-toast";
import { uploadUrl } from "~/lib/cloudinaryUpload";

export function useFormCreateArticle({
  editor,
  createdById,
  createFn,
}: {
  editor: BlockNoteEditor<
    Record<string, BlockConfig>,
    InlineContentSchema,
    StyleSchema
  >;
  createdById?: string;
  createFn: UseMutateFunction<
    unknown,
    unknown,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >;
}) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: [{}],
    imageSrc: "",
  });
  function handleChangeInputText(ev: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
  }
  function handleChangeContent() {
    setFormData((prevData) => ({
      ...prevData,
      content: editor.document,
    }));
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
  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const publicId = formData.title
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\W+/g, "-");
    const uploadedImage = await uploadUrl({ url: formData.imageSrc, publicId });
    if (createdById && formData.content) {
      try {
        createFn({
          content: formData.content,
          title: formData.title,
          description: formData.description,
          imageSrc: uploadedImage.url,
          createdById,
        });
      } catch (error) {
        toast({
          title: "Ops! Não Foi Possível Criar o Artigo",
          description:
            "Por Favor! Verifique se Preencheu os Campos Necessários Corretamente ou se Já Não Existe um Artigo com esse Título",
        });
      }
    }
  }

  return {
    handleChangeInputText,
    handleChangeContent,
    handleChangeImageSrc,
    handleSubmit,
    formData,
  };
}
