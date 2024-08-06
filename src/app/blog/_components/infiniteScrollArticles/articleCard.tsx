import Image from "next/image";
import Link from "next/link";
import { conversorDataTexto } from "~/lib/conversorDataTexto";
// import { urlDefaultImg } from "~/lib/defaultImg";
import { type ArticleGetAllPerPage } from "~/server/api/routers";

export function ArticleCard({ article }: { article: ArticleGetAllPerPage }) {
  return (
    <Link
      href={"/blog/" + article.slug}
      prefetch={false}
      className="mx-auto flex h-[420px] w-[240px] flex-col rounded-md border-[1px] border-off-black/15 shadow outline-none transition-all ease-out hover:shadow-lg sm:h-[480px] sm:w-[380px]"
    >
      <Image
        src={article.imageSrc ?? ""} //{article.imageSrc ?? urlDefaultImg}
        alt="banner-artigo"
        height={260}
        width={380}
        className="rounded-t-mdtransition-all flex h-[180px] w-full object-cover duration-200 ease-in-out hover:opacity-85 sm:h-[260px]"
      />
      <div className="mb-2 mt-4 flex flex-col px-4 text-sm opacity-70 sm:flex-row">
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
      <span className="mx-4 mt-2 self-start rounded font-bold">Leia Mais</span>
    </Link>
  );
}
