"use client";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

import "./styles-blocknote.css";
import { type PartialBlock } from "@blocknote/core";

export default function ArticleContentView({
  content,
}: {
  content: PartialBlock[];
}) {
  const editor = useCreateBlockNote({
    trailingBlock: false,
    initialContent: content,
  });

  return (
    <BlockNoteView
      editor={editor}
      theme={"light"}
      data-theming-css-demo
      editable={false}
    />
  );
}
