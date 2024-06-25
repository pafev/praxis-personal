import { api } from "~/trpc/server";
import { unstable_noStore as noStore } from "next/cache";
import { type ArticleGetOneBySlug } from "~/server/api/routers";
import { CldImage } from "~/components/cldImage";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const Article = dynamic(() => import("./_components/article"), { ssr: false });

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  noStore();

  const article = (await api.article.getOneBySlug({
    slug: params.slug,
  })) as ArticleGetOneBySlug;

  return (
    <main className="min-h-screen w-screen bg-white pb-28 font-noto">
      {!!article && (
        <section>
          <div className="w-full pb-16 shadow-md">
            <CldImage
              src="blog-default-banner_f8uh1x"
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
                <span className="mx-2 pb-[1px] text-xl">●</span>
                {article.createdAt.toDateString()}
              </div>
            </div>
          </div>
          <Article content={article.content} />
          <Link
            href={"/blog"}
            className={cn(
              buttonVariants(),
              "mx-8 mt-20 rounded-sm border-2 border-vermelho-praxis bg-white text-vermelho-praxis shadow-md transition-all ease-in-out hover:border-vermelho-praxis hover:bg-white hover:text-vermelho-praxis hover:shadow-lg lg:mx-36",
            )}
          >
            Voltar para o Blog
          </Link>
        </section>
      )}
      {!article && <>Esse Artigo Não Existe</>}
    </main>
  );
}
