import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getArticlesPerPage } from "~/actions";
import { type BlogFilterParams } from "~/app/blog/page";
import type {
  ArticleGetAllPerPage,
  ArticlesGetAllPerPage,
} from "~/server/api/routers";

export function useInfiniteScroll({
  filterParams,
  initialContent,
}: {
  filterParams: BlogFilterParams;
  initialContent: ArticleGetAllPerPage[];
}) {
  const [articles, setArticles] =
    useState<ArticlesGetAllPerPage>(initialContent);
  const [pagesLoaded, setPagesLoaded] = useState(1);
  const [ref, inView] = useInView();
  const [isLoading, setIsLoading] = useState(true);

  async function loadMoreArticles() {
    const nextPage = pagesLoaded + 1;
    const newArticles = await getArticlesPerPage({
      ...filterParams,
      page: nextPage,
    });
    if (newArticles.length) {
      setPagesLoaded(nextPage);
      setArticles((prevArticles: ArticleGetAllPerPage[]) => [
        ...(prevArticles.length ? prevArticles : []),
        ...newArticles,
      ]);
    } else {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (inView) {
      loadMoreArticles().catch((e) => console.log(e));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return { articles, ref, isLoading };
}
