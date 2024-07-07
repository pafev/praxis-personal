import type {
  BlockConfig,
  BlockNoteEditor,
  InlineContentSchema,
  PartialBlock,
  StyleSchema,
} from "@blocknote/core";
import type { UseMutateFunction } from "@tanstack/react-query";
import type { User } from "next-auth";
import { useState } from "react";
import { uploadUrl } from "~/lib/cloudinaryUpload";

export function useFormArticle({
  editor,
  user,
  mutate,
}: {
  editor: BlockNoteEditor<
    Record<string, BlockConfig>,
    InlineContentSchema,
    StyleSchema
  >;
  user?: User;
  mutate: UseMutateFunction<
    unknown,
    unknown,
    {
      title: string;
      content: PartialBlock[];
      createdById: string;
      description?: string | undefined;
      themes?:
        | {
            name: string;
          }[]
        | undefined;
      imageSrc?: string | undefined;
    }
  >;
}) {
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
    const uploadedImage = await uploadUrl(formData.imageSrc);
    if (user && formData.content) {
      mutate({
        content: formData.content,
        title: formData.title,
        description: formData.description,
        imageSrc: uploadedImage.url,
        createdById: user.id,
      });
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
