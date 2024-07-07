"use server";

import { api } from "~/trpc/server";

export async function getArticlesPerPage(params: {
  search: string;
  theme: string;
  date: string;
  page: number;
}) {
  const articles = await api.article.getAllPerPage(params);
  return articles;
}
