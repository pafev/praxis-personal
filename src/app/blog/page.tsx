import { HeaderBlog } from "./_components/headerBlog";
import { SearchBar } from "./_components/searchbar";
import { Filters } from "./_components/filter";
import { validDate, validSearch, validTheme } from "~/lib/validateURLState";
import { getServerAuthSession } from "~/server/auth";
import { buttonVariants } from "~/components/ui/button";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { InfiniteScrollArticles } from "./_components/infiniteScrollArticles";
import { getThemes, getArticlesPerPage } from "~/actions";

export type BlogFilterParams = {
  date: "Menos Recentes" | "Mais Recentes";
  search: string;
  theme: string;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  noStore();
  const themes = await getThemes();

  const params = {
    date: validDate(searchParams.date),
    search: validSearch(searchParams.search),
    theme: validTheme(themes, searchParams.theme),
  } as BlogFilterParams;

  const session = await getServerAuthSession();

  const initialContent = await getArticlesPerPage({ ...params, page: 1 });

  return (
    <main className="flex min-h-screen w-screen flex-col bg-white font-noto">
      <HeaderBlog>Blog</HeaderBlog>

      <SearchBar filterParams={params} />

      {session?.user.id && (
        <Link
          href={"/blog/create"}
          className={buttonVariants({ className: "mx-8 mb-6 w-40 lg:mx-36" })}
        >
          Adicionar Artigo
        </Link>
      )}

      <Filters themes={themes} filterParams={params} />

      <div key={Math.random()}>
        <InfiniteScrollArticles
          filterParams={params}
          initialContent={initialContent}
        />
      </div>
    </main>
  );
}
