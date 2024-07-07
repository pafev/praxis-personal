"use client;"
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "./styles-blocknote.css";
import type { BlockNoteViewProps } from "@blocknote/react";
import type { BlockConfig, InlineContentSchema, StyleSchema } from "@blocknote/core";

export function BlockNoteArticle(
  props: BlockNoteViewProps<Record<string, BlockConfig>, InlineContentSchema, StyleSchema>
) {
  return <BlockNoteView {...props} data-theming-css-demo theme={"light"}/>
}