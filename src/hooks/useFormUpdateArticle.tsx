import type {
  BlockConfig,
  BlockNoteEditor,
  InlineContentSchema,
  StyleSchema,
} from "@blocknote/core";
import type { UseMutateFunction } from "@tanstack/react-query";
import { useState } from "react";
import { uploadUrl } from "~/lib/cloudinaryUpload";

export function useFormUpdateArticle({
  editor,
  updateFn,
  initialFormData,
  articleId,
}: {
  editor: BlockNoteEditor<
    Record<string, BlockConfig>,
    InlineContentSchema,
    StyleSchema
  >;
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
  };
  articleId: number;
}) {
  const [formData, setFormData] = useState({
    title: initialFormData.title,
    description: initialFormData.description ?? "",
    content: initialFormData.content,
    imageSrc: initialFormData.imageSrc ?? "",
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
    if (formData.content) {
      updateFn({
        content: formData.content,
        title: formData.title,
        description: formData.description,
        imageSrc: uploadedImage.url,
        id: articleId,
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
