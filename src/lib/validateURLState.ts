import { type Theme } from "@prisma/client";

export function validDate(date: string | string[] | undefined) {
  if (typeof date != "string") return "Mais Recentes";
  return date != "Mais Recentes" && date != "Menos Recentes"
    ? "Mais Recentes"
    : date;
}

export function validSearch(search: string | string[] | undefined) {
  return typeof search != "string" ? "" : search;
}

export function validPage(page: string | string[] | undefined) {
  if (typeof page != "string") return "1";
  return (parseInt(page) || 1) < 1 ? "1" : page;
}

export function validTheme(
  themes: Theme[],
  theme: string | string[] | undefined,
) {
  const isThemeInThemes =
    typeof theme != "string"
      ? false
      : themes.reduce((acc, cur) => acc || cur.name === theme, false);
  return isThemeInThemes ? theme : "Ver Tudo";
}
