"use client";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useState } from "react";
import { locales, type PartialBlock } from "@blocknote/core";

import "./editor.css";
import { api } from "~/trpc/react";
import { uploadUrl } from "~/lib/cloudinaryUpload";

export default function Editor({
  articleId,
  initialContent,
}: {
  articleId: number;
  initialContent: PartialBlock[];
}) {
  const [content, setContent] = useState(initialContent);
  const { mutate } = api.article.updateUnique.useMutation();

  const editor = useCreateBlockNote({
    trailingBlock: false,
    initialContent: initialContent,
    dictionary: locales.pt,
    uploadFile: async (file: File) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const { url } = await uploadUrl(reader.result as string);
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

  function handleChange() {
    setContent(editor.document);
  }

  function updatePost() {
    mutate({
      id: articleId,
      content,
    });
  }

  return (
    <>
      <BlockNoteView
        editor={editor}
        theme={"light"}
        onChange={handleChange}
        data-theming-css-demo
      />
      <button onClick={updatePost}>Salvar post</button>
    </>
  );
}
