import { api } from "~/trpc/server";
import { unstable_noStore as noStore } from "next/cache";
import { type ArticleGetOneBySlug } from "~/server/api/routers";
import FormEditArticle from "./_components/formEditArticle";
import { type PartialBlock } from "@blocknote/core";

export default async function EditArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  noStore();
  const article = (await api.article.getOneBySlug({
    slug: params.slug,
  })) as ArticleGetOneBySlug;

  if (!article) return <span>Ops! Para que Esse Artigo Não Existe</span>;

  const initialData = {
    id: article.id,
    title: article.title,
    description: article.description ?? undefined,
    content: JSON.parse(article.content) as PartialBlock[],
    imageSrc: article.imageSrc ?? undefined,
    createdByImageSrc: article.createdBy.image,
    themes: article.themes,
  };

  return (
    <main className="min-h-screen font-noto">
      <FormEditArticle initialData={initialData} />
    </main>
  );
}
