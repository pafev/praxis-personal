"use client";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { locales, type PartialBlock } from "@blocknote/core";

import "./createArticleEditor.css";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { CldImage } from "~/components/cldImage";
import Image from "next/image";

export default function CreateArticleEditor() {
  const initialContent: PartialBlock[] = [
    { type: "paragraph", content: "Começe a Escrever Agora!!!" },
  ];
  const router = useRouter();
  const { mutate, isPending } = api.article.createUnique.useMutation({
    onSuccess: (data) => {
      router.push("/blog/" + data);
    },
    onError: (error) => {
      alert(error.message);
    },
  });
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: initialContent,
  });
  const editor = useCreateBlockNote({
    trailingBlock: false,
    initialContent,
    dictionary: locales.pt,
  });
  function handleChangeContent() {
    setFormData({
      ...formData,
      content: editor.document,
    });
  }
  function handleChange(ev: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
  }
  function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (session?.user && formData.content) {
      mutate({
        content: formData.content,
        title: formData.title,
        description: formData.description,
        createdById: session.user.id,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full pb-16 shadow-md">
        <CldImage
          src="blog-default-banner_f8uh1x"
          width={1800}
          height={320}
          crop={"fill"}
          alt="banner-artigo"
        />
        <Image
          src={session?.user.image ?? ""}
          alt="foto-autor"
          width={80}
          height={80}
          className="mx-8 -mt-10 rounded-[50%] lg:mx-36"
        />
        <input
          type="text"
          name="title"
          placeholder="Título do artigo"
          onChange={handleChange}
          className="mx-8 mt-12 w-[88%] border-none font-lora text-5xl font-semibold outline-none lg:mx-36 lg:text-7xl"
        />
        <input
          type="text"
          name="description"
          placeholder="Descrição do artigo"
          onChange={handleChange}
          className="mx-8 border-none outline-none lg:mx-36"
        />
      </div>
      <BlockNoteView
        editor={editor}
        theme={"light"}
        onChange={handleChangeContent}
        data-theming-css-demo
      />
      <Button
        disabled={isPending}
        className="mx-8 mt-20 rounded-sm border-2 border-vermelho-praxis bg-white text-vermelho-praxis shadow-md transition-all ease-in-out hover:border-vermelho-praxis hover:bg-white hover:text-vermelho-praxis hover:shadow-lg lg:mx-36"
      >
        Criar Artigo
      </Button>
    </form>
  );
}
