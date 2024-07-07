"use server";

import { api } from "~/trpc/server";

export async function getThemes() {
  const themes = [{ id: 0, name: "Ver Tudo" }].concat(await api.theme.getAll());
  return themes;
}
