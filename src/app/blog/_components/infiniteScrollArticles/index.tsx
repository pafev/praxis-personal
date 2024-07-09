"use client";
import { type BlogFilterParams } from "../../page";
import { ArticleCard } from "../articles";
import type { ArticleGetAllPerPage } from "~/server/api/routers";
import { useInfiniteScroll } from "~/hooks/useInfiniteScroll";
import SpinnerLoading from "./spinnerLoading";

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
    <section className="mx-8 my-8 mb-36 flex flex-col lg:mx-36">
      <div className="grid w-full gap-10 lg:grid-cols-2 2xl:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      {!!isLoading && (
        <div ref={ref} className="mt-20 flex items-center justify-center">
          <SpinnerLoading />
        </div>
      )}
    </section>
  );
}
