"use client";
import { type BlogFilterParams } from "../../page";
import type { ArticlesGetAllPerPage } from "~/server/api/routers";
import { useInfiniteScroll } from "~/hooks/useInfiniteScroll";
import SpinnerLoading from "./spinnerLoading";
import { ArticleCard } from "./articleCard";

export function InfiniteScrollArticles({
  filterParams,
  initialContent,
}: {
  filterParams: BlogFilterParams;
  initialContent: ArticlesGetAllPerPage;
}) {
  const { articles, isLoading, ref } = useInfiniteScroll({
    filterParams,
    initialContent,
  });

  return (
    <section className="mx-8 mb-36 mt-8 flex flex-col lg:mx-36">
      <div className="grid w-full gap-10 lg:grid-cols-2 2xl:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      {!!isLoading && (
        <div ref={ref} className="relative flex items-center justify-center">
          <SpinnerLoading className="absolute mt-20" />
        </div>
      )}
    </section>
  );
}
