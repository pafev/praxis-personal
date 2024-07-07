"use client";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "~/components/ui/button";
import Image from "next/image";
import { useMyBlockNoteEditor } from "~/hooks/useMyBlockNoteEditor";
import { BlockNoteArticle } from "~/components/blockNoteArticle";
import { getCldImageUrl } from "next-cloudinary";
import { useFormArticle } from "~/hooks/useFormArticle";

export default function CreateArticlePage() {
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

  const editor = useMyBlockNoteEditor();
  const {
    formData,
    handleChangeContent,
    handleChangeImageSrc,
    handleChangeInputText,
    handleSubmit,
  } = useFormArticle({ editor, mutate, user: session?.user });

  const urlDefaultBanner = getCldImageUrl({ src: "what-is-unsplash_axoalg" });

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen w-screen bg-white pb-28 font-noto"
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
            src={session?.user.image ?? ""}
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
        />
        <input
          type="text"
          name="description"
          placeholder="Descrição do artigo"
          onChange={handleChangeInputText}
          className="mx-8 w-[88%] border-none outline-none lg:mx-36"
        />
      </div>
      <BlockNoteArticle editor={editor} onChange={handleChangeContent} />
      <Button
        disabled={isPending}
        className="mx-8 mt-20 rounded-sm border-2 border-vermelho-praxis bg-white text-vermelho-praxis shadow-md transition-all ease-in-out hover:border-vermelho-praxis hover:bg-white hover:text-vermelho-praxis hover:shadow-lg lg:mx-36"
      >
        Criar Artigo
      </Button>
    </form>
  );
}
