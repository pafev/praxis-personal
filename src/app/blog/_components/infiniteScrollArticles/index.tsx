"use client";
import { type BlogFilterParams } from "../../page";
import { ArticleCard } from "../articles";
import type { ArticleGetAllPerPage } from "~/server/api/routers";
import { useInfiniteScroll } from "~/hooks/useInfiniteScroll";

export function InfiniteScrollArticles({
  filterParams,
  initialContent,
}: {
  filterParams: BlogFilterParams;
  initialContent: ArticleGetAllPerPage[];
}) {
  const { articles, isLoading, ref } = useInfiniteScroll({
    filterParams,
    initialContent,
  });

  return (
    <section className="mx-8 mb-20 flex flex-col lg:mx-36">
      <div className="flex w-full flex-wrap justify-center gap-8">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      {!!isLoading && (
        <span ref={ref} className="mb-6 mt-8 self-center">
          Carregando...
        </span>
      )}
    </section>
  );
}
