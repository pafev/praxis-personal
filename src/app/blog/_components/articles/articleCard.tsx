import Link from "next/link";
import { CldImage } from "~/components/cldImage";
import { type ArticleGetAllPerPage } from "~/server/api/routers";

export function ArticleCard({ article }: { article: ArticleGetAllPerPage }) {
  return (
    <Link
      className="flex h-[480px] w-[380px] cursor-pointer flex-col shadow-lg outline-none transition-all ease-out hover:shadow-xl"
      href={"/blog/" + article.slug}
    >
      <div className="flex h-[260px] w-full">
        <CldImage
          src="coffee"
          alt="banner-artigo"
          height={260}
          width={380}
          className="absolute rounded-t-sm"
          crop={"fill"}
        />
      </div>
      <div className="mt-4 flex px-4 text-sm opacity-70">
        <span className="text-vermelho-excelencia">
          {article.createdAt.toDateString()}
        </span>
        <span className="ml-1 max-w-[180px] truncate font-light">
          by {article.createdBy.name}
        </span>
      </div>
      <h2 className="mx-4 truncate text-3xl font-semibold">{article.title}</h2>
      <p className="tex-sm mx-4 mt-4 line-clamp-2 h-12 font-light opacity-70">
        {article.description}
      </p>
      <div className="flex h-16 items-end">
        <span className="mx-4 my-2 rounded font-bold">Leia Mais</span>
      </div>
    </Link>
  );
}
