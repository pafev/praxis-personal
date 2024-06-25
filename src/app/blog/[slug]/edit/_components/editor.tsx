"use client";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useState } from "react";
import { locales, type PartialBlock } from "@blocknote/core";

import "./editor.css";
import { api } from "~/trpc/react";

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
