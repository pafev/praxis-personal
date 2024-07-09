import { api } from "~/trpc/server";
import { unstable_noStore as noStore } from "next/cache";
import { type ArticleGetOneBySlug } from "~/server/api/routers";
import { CldImage } from "~/components/cldImage";
import Image from "next/image";
import dynamic from "next/dynamic";
import { conversorDataTexto } from "~/lib/conversorDataTexto";
import { getServerAuthSession } from "~/server/auth";
import { MyLinkButton } from "./_components/myLinkButton";
import { DeleteButton } from "./_components/deleteButton";

const Article = dynamic(() => import("~/components/articleContentView"), {
  ssr: false,
});

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  noStore();

  const article = (await api.article.getOneBySlug({
    slug: params.slug,
  })) as ArticleGetOneBySlug;

  const session = await getServerAuthSession();

  return (
    <main className="min-h-screen bg-white pb-28 font-noto">
      {!!article && (
        <>
          <div className="flex w-full flex-col pb-16 shadow-md">
            <CldImage
              src={article.imageSrc ?? "what-is-unsplash_axoalg"}
              width={1800}
              height={320}
              crop={"fill"}
              alt="banner-artigo"
            />
            <Image
              src={article.createdBy.image}
              alt="foto-autor"
              width={80}
              height={80}
              className="mx-8 -mt-10 rounded-[50%] lg:mx-36"
            />
            <h1 className="mx-8 mt-12 font-lora text-5xl font-semibold lg:mx-36 lg:text-7xl">
              {article.title}
            </h1>
            <div className="lg:text-md mx-8 mt-2 flex flex-col text-sm font-light sm:flex-row lg:mx-36">
              <div className="flex items-center">
                por
                <Image
                  src={article.createdBy.image}
                  alt="foto-autor"
                  width={20}
                  height={20}
                  className="ml-2 mr-1 size-7 rounded-[50%]"
                />
                <span className="line-clamp-1">{article.createdBy.name}</span>
              </div>
              <div className="flex items-center">
                <span className="mx-2 pb-[1px] text-lg">●</span>
                {conversorDataTexto(article.createdAt)}
              </div>
            </div>
            {!!session && (
              <div className="mx-8 my-4 flex gap-3 self-start lg:mx-36 lg:-mt-10 lg:mb-0 lg:self-end">
                <MyLinkButton href={`/blog/${params.slug}/edit`}>
                  Editar
                </MyLinkButton>
                <DeleteButton>Excluir</DeleteButton>
              </div>
            )}
          </div>
          <Article content={article.content} />
          <MyLinkButton href="/blog" className="mx-8 mt-20 lg:mx-36">
            Voltar para o Blog
          </MyLinkButton>
        </>
      )}
      {!article && <>Ops! Para que Esse Artigo Não Existe</>}
    </main>
  );
}
