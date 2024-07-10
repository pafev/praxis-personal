"use client";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "~/components/ui/button";
import Image from "next/image";
import { useMyBlockNoteEditor } from "~/hooks/useMyBlockNoteEditor";
import { ArticleContentEditor } from "~/components/articleContentEditor";
import { getCldImageUrl } from "next-cloudinary";
import { useFormUpdateArticle } from "~/hooks/useFormUpdateArticle";
import { ImageUp } from "lucide-react";
import { useDisabePgKey } from "~/hooks/useDisablePgKey";

export default function FormEditArticle({
  initialData,
}: {
  initialData: {
    id: number;
    title: string;
    description?: string;
    content: object[];
    imageSrc?: string;
    createdByImageSrc: string;
  };
}) {
  const { id: articleId, createdByImageSrc, ...initialFormData } = initialData;

  const router = useRouter();

  const { mutate, isPending } = api.article.updateUnique.useMutation({
    onSuccess: (data) => {
      router.push("/blog/" + data);
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const editor = useMyBlockNoteEditor(initialFormData.content);

  const {
    formData,
    handleChangeContent,
    handleChangeImageSrc,
    handleChangeInputText,
    handleSubmit,
  } = useFormUpdateArticle({
    editor,
    updateFn: mutate,
    articleId,
    initialFormData,
  });

  const urlDefaultBanner = getCldImageUrl({ src: "what-is-unsplash_axoalg" });

  useDisabePgKey();

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen bg-white pb-28 font-noto"
    >
      <div className="pb-16 shadow-md">
        <div className="relative flex h-40 items-end justify-between lg:h-64">
          <Image
            src={formData.imageSrc || urlDefaultBanner}
            fill
            alt="banner-artigo"
            className="absolute h-full w-screen object-cover"
          />
          <Image
            src={createdByImageSrc ?? ""}
            alt="foto-autor"
            width={80}
            height={80}
            className="z-10 -mb-10 ml-8 rounded-[50%] lg:ml-36"
          />
          <div className="absolute flex h-full w-screen items-end justify-end bg-off-black/20 opacity-0 transition-opacity ease-in-out hover:opacity-100">
            <input
              className="hidden"
              type="file"
              id="imageSrc"
              onChange={handleChangeImageSrc}
              accept="image/*"
            />
            <label
              className={buttonVariants({
                className:
                  "z-10 mb-4 mr-8 cursor-pointer rounded-sm shadow-md hover:shadow-lg lg:mr-36",
              })}
              htmlFor="imageSrc"
            >
              <ImageUp className="mr-2" size={18} />
              Alterar Banner
            </label>
          </div>
        </div>
        <input
          type="text"
          name="title"
          placeholder="Título do artigo"
          onChange={handleChangeInputText}
          className="mx-8 mt-12 w-[88%] border-none font-lora text-5xl font-semibold outline-none lg:mx-36 lg:text-7xl"
          value={formData.title}
        />
        <input
          type="text"
          name="description"
          placeholder="Descrição sucinta do artigo"
          onChange={handleChangeInputText}
          className="mx-8 w-[88%] border-none outline-none lg:mx-36"
          value={formData.description}
        />
      </div>
      <ArticleContentEditor editor={editor} onChange={handleChangeContent} />
      <Button
        disabled={isPending}
        className="mx-8 mt-20 rounded-sm border-2 border-vermelho-praxis bg-white text-vermelho-praxis shadow-md transition-all ease-in-out hover:border-vermelho-praxis hover:bg-white hover:text-vermelho-praxis hover:shadow-lg lg:mx-36"
      >
        Finalizar Edição
      </Button>
    </form>
  );
}
