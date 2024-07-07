import Link from "next/link";
import { CldImage } from "~/components/cldImage";
import { conversorDataTexto } from "~/lib/conversorDataTexto";
import { type ArticleGetAllPerPage } from "~/server/api/routers";

export function ArticleCard({ article }: { article: ArticleGetAllPerPage }) {
  return (
    <div className="flex h-[420px] w-[260px] flex-col outline-none transition-all ease-out sm:h-[480px] sm:w-[320px] lg:w-[380px]">
      <Link href={"/blog/" + article.slug}>
        <CldImage
          src={article.imageSrc ?? "what-is-unsplash_axoalg"}
          alt="banner-artigo"
          height={260}
          width={380}
          className="flex h-[200px] w-full rounded-lg shadow-md transition-all duration-200 ease-in-out hover:opacity-85 hover:shadow-xl sm:h-[260px]"
          crop={"fill"}
        />
      </Link>
      <div className="mt-4 flex flex-col px-4 text-sm opacity-70 sm:flex-row">
        <span className="text-vermelho-excelencia">
          {conversorDataTexto(article.createdAt)},
        </span>
        <span className="max-w-[180px] truncate font-light sm:ml-1">
          por {article.createdBy.name}
        </span>
      </div>
      <h2 className="w-full truncate px-4 text-2xl font-semibold sm:text-3xl">
        {article.title}
      </h2>
      <p className="mt-4 line-clamp-2 min-h-10 px-4 text-sm font-light opacity-70 sm:min-h-12 sm:text-base">
        {article.description}
      </p>
      <Link
        className="mx-4 my-2 self-start rounded font-bold hover:underline"
        href={"/blog/" + article.slug}
      >
        Leia Mais
      </Link>
    </div>
  );
}
