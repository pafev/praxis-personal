import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import {
  articleRouter,
  themeRouter,
  membershipsRouter,
  partnerRouter,
  portfolioRouter,
  praxisRouter,
} from "./routers";
import { UserRouter } from "./routers/users";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  article: articleRouter,
  theme: themeRouter,
  memberships: membershipsRouter,
  partners: partnerRouter,
  portfolio: portfolioRouter,
  praxis: praxisRouter,
  user: UserRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
