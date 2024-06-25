import dynamic from "next/dynamic";
import { api } from "~/trpc/server";
import { unstable_noStore as noStore } from "next/cache";
import { type ArticleGetOneBySlug } from "~/server/api/routers";

const Editor = dynamic(() => import("./_components/editor"), { ssr: false });

export default async function EditBlogPage({
  params,
}: {
  params: { slug: string };
}) {
  noStore();
  const article = (await api.article.getOneBySlug({
    slug: params.slug,
  })) as ArticleGetOneBySlug;

  return (
    <main className="min-h-screen font-noto">
      {!!article && (
        <>
          {article.content && (
            <Editor articleId={article.id} initialContent={article.content} />
          )}
        </>
      )}
      {!article && <span>Artigo Não Existe</span>}
    </main>
  );
}
