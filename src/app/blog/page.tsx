import { HeaderBlog } from "./_components/headerBlog";
import { SearchBar } from "./_components/searchbar";
import { Filters } from "./_components/filter";
import { validDate, validSearch, validTheme } from "~/lib/validateURLState";
import { getServerAuthSession } from "~/server/auth";
import { buttonVariants } from "~/components/ui/button";
import Link from "next/link";
import { InfiniteScrollArticles } from "./_components/infiniteScrollArticles";
import { getArticlesPerPage } from "~/actions";
import { CreateThemeButtton } from "./_components/createThemeButton";
import { DeleteThemeButton } from "./_components/deleteThemeButton";
import { api } from "~/trpc/server";

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
  const themes = await api.theme.getAll();

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
        <div className="mx-8 mb-4 flex flex-col gap-4 md:flex-row lg:mx-36">
          <Link
            href={"/blog/create"}
            className={buttonVariants()}
            prefetch={false}
          >
            Criar um Artigo
          </Link>
          <CreateThemeButtton>Criar um Tema</CreateThemeButtton>
          <DeleteThemeButton themes={themes}>Excluir um Tema</DeleteThemeButton>
        </div>
      )}

      <Filters
        themes={[{ id: 0, name: "Ver Tudo" }].concat(themes)}
        filterParams={params}
      />

      <div key={Math.random()}>
        <InfiniteScrollArticles
          filterParams={params}
          initialContent={initialContent}
        />
      </div>
    </main>
  );
}
