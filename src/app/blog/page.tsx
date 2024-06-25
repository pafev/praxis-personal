import { datas } from "~/lib/datasBlog";
import { api } from "~/trpc/server";
import { HeaderBlog } from "./_components/headerBlog";
import { SearchBar } from "./_components/searchbar";
import { Filters } from "./_components/filter";
import { ArticleCard } from "./_components/articles/articleCard";
import {
  validDate,
  validPage,
  validSearch,
  validTheme,
} from "~/lib/validateURLState";
import { ArticlesContainer } from "./_components/articles/articlesContainer";
import { getServerAuthSession } from "~/server/auth";
import { buttonVariants } from "~/components/ui/button";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { unstable_noStore as noStore } from "next/cache";

export type BlogFilterParams = {
  date: "Menos Recentes" | "Mais Recentes";
  search: string;
  theme: string;
  page: string;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  noStore();
  const themes = [{ id: 0, name: "Ver Tudo" }].concat(await api.theme.getAll());

  const params = {
    date: validDate(searchParams.date),
    search: validSearch(searchParams.search),
    theme: validTheme(themes, searchParams.theme),
    page: validPage(searchParams.page),
  } as BlogFilterParams;

  const articles = await api.article.getAllPerPage({
    search: params.search,
    theme: params.theme,
    date: params.date,
    page: parseInt(params.page),
  });

  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen w-screen flex-col bg-white font-noto">
      <HeaderBlog>Blog</HeaderBlog>

      <SearchBar filterParams={params} />

      {session?.user.id && (
        <Link
          href={"/blog/create"}
          className={cn(buttonVariants(), "mx-8 mb-6 w-40 lg:mx-36")}
        >
          Adicionar Artigo
        </Link>
      )}

      <Filters datas={datas} themes={themes} filterParams={params} />

      <ArticlesContainer>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </ArticlesContainer>
    </main>
  );
}
