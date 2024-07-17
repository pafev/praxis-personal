"use client;";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "./styles-blocknote.css";
import { useCreateBlockNote } from "@blocknote/react";
import {
  type BlockConfig,
  type BlockNoteEditor,
  type InlineContentSchema,
  locales,
  type StyleSchema,
  type PartialBlock,
} from "@blocknote/core";
import { uploadUrl } from "~/lib/cloudinaryUpload";

function useMyBlockNoteEditor(
  initialContent: PartialBlock[] | undefined = [
    { type: "paragraph", content: "Começe a Escrever Agora!!!" },
  ],
) {
  const editor: unknown = useCreateBlockNote({
    trailingBlock: false,
    initialContent,
    dictionary: locales.pt,
    uploadFile: async (file: File) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const { url } = await uploadUrl({ url: reader.result as string });
          return url;
        } catch (error) {
          throw error;
        }
      };
      reader.readAsDataURL(file);
      return new Promise<string>((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
      });
    },
  });

  return editor as BlockNoteEditor<
    Record<string, BlockConfig>,
    InlineContentSchema,
    StyleSchema
  >;
}

export default function ArticleContentEditor({
  initialContent,
  setFormData,
}: {
  initialContent?: object[];
  setFormData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      description: string;
      content: object[];
      imageSrc: string;
      themes: {
        name: string;
      }[];
    }>
  >;
}) {
  const editor = useMyBlockNoteEditor(initialContent);

  function handleChange() {
    setFormData((prevData) => ({
      ...prevData,
      content: editor.document,
    }));
  }

  return (
    <BlockNoteView
      editor={editor}
      onChange={handleChange}
      data-theming-css-demo
      theme={"light"}
    />
  );
}
