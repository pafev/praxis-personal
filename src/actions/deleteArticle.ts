"use server";

import { permanentRedirect } from "next/navigation";
import { api } from "~/trpc/server";

export async function deleteArticle(artiicleId: number) {
  try {
    await api.article.deleteUnique({ id: artiicleId });
    permanentRedirect("/blog");
  } catch (error) {
    throw error;
  }
}
