import { createTRPCRouter, publicProcedure } from "../trpc";

export const themeRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const themes = await ctx.db.theme.findMany();

    return themes;
  }),
});
