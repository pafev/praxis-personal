import { type PartialBlock } from "@blocknote/core";
import { type Article } from "@prisma/client";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const articleRouter = createTRPCRouter({
  getAllQuantity: publicProcedure
    .input(
      z.object({ search: z.string().optional(), theme: z.string().optional() }),
    )
    .query(async ({ ctx, input }) => {
      const amountArticles = await ctx.db.article.count({
        where: {
          themes: { some: { name: input.theme } },
          title: { contains: input.search },
        },
      });

      return amountArticles;
    }),

  getAllPerPage: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
        theme: z.string().optional(),
        date: z.string().optional(),
        page: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const createdAtOrder = input.date === "Menos Recentes" ? "asc" : "desc";

      const articles = await ctx.db.article.findMany({
        where: {
          themes:
            input.theme === "Ver Tudo"
              ? undefined
              : { some: { name: input.theme } },
          title: { contains: input.search },
        },
        orderBy: {
          createdAt: createdAtOrder,
        },
        include: { createdBy: true, themes: true },
      });

      return articles;
    }),

  getOneBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const article = await ctx.db.article.findUnique({
          where: input,
          select: {
            id: true,
            content: true,
            title: true,
            description: true,
            imageSrc: true,
            createdBy: true,
            createdAt: true,
          },
        });

        return article;
      } catch (err) {
        if (err instanceof PrismaClientValidationError) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              "Erro na passagem dos campos: campo necessário faltando ou campo de tipo inadequado",
            cause: err,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro no servidor",
          cause: err,
        });
      }
    }),

  createUnique: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.custom<PartialBlock[]>(),
        themes: z.array(z.object({ name: z.string().min(1) })).optional(),
        description: z.string().min(1).optional(),
        createdById: z.string(),
        imageSrc: z.string().min(1).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const slug = input.title
          .normalize("NFD")
          .replace(/\p{Mn}/gu, "")
          .replaceAll(" ", "-");
        const createdArticle = await ctx.db.article.create({
          data: {
            title: input.title,
            content: input.content,
            themes: { connect: input.themes },
            createdById: input.createdById,
            slug,
            description: input.description,
            imageSrc: input.imageSrc,
          },
        });
        return createdArticle.slug;
      } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
          if (err.code === "P2002") {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Erro na criação da instância: campo único já existente",
              cause: err,
            });
          }

          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Erro na criação da instância",
            cause: err,
          });
        }

        if (err instanceof PrismaClientValidationError) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              "Erro na passagem dos campos: campo necessário faltando ou campo de tipo inadequado",
            cause: err,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro no servidor",
          cause: err,
        });
      }
    }),

  updateUnique: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        content: z.custom<PartialBlock[]>(),
        themes: z.array(z.object({ name: z.string().min(1) })).optional(),
        imagesrc: z.string().min(1).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const slug = input.title
        ? input.title
            .normalize("NFD")
            .replace(/\p{Mn}/gu, "")
            .replaceAll(" ", "-")
        : undefined;

      try {
        const updatedPost = await ctx.db.article.update({
          where: { id: input.id },
          data: {
            title: input.title,
            slug,
            description: input.description,
            content: input.content,
            imageSrc: input.imagesrc,
            themes: { connect: input.themes },
          },
        });

        return updatedPost;
      } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
          if (err.code === "P2025") {
            throw new TRPCError({
              code: "NOT_FOUND",
              message:
                "Erro na atualização da instância: instância não encontrada",
              cause: err,
            });
          }

          if (err.code === "P2002") {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message:
                "Erro na atualização da instância: campo único já existente",
              cause: err,
            });
          }

          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Erro na atualização da instância",
            cause: err,
          });
        }

        if (err instanceof PrismaClientValidationError) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              "Erro na passagem dos campos: campo necessário faltando ou campo de tipo inadequado",
            cause: err,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro no servidor",
          cause: err,
        });
      }
    }),

  deleteUnique: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const deletedArticle = await ctx.db.article.delete({ where: input });

        return !!deletedArticle;
      } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
          if (err.code === "P2025") {
            throw new TRPCError({
              code: "NOT_FOUND",
              message:
                "Erro na exclusão da instância: instância não encontrada",
              cause: err,
            });
          }

          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Erro na exclusão da instância",
            cause: err,
          });
        }

        if (err instanceof PrismaClientValidationError) {
          console.log(err);

          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              "Erro na passagem dos campos: campo necessário faltando ou campo de tipo inadequado",
            cause: err,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro no servidor",
          cause: err,
        });
      }
    }),
});

type ArticleGetAllPerPage = {
  themes: {
    id: number;
    name: string;
  }[];
  createdBy: {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string;
    role: string;
  };
} & Article;

type ArticlesGetAllPerPage = ArticleGetAllPerPage[];

type ArticleGetOneBySlug = {
  title: string;
  content: PartialBlock[];
  description: string | null;
  imageSrc: string | null;
  id: number;
  createdAt: Date;
  createdBy: {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string;
    role: string;
  };
} | null;

export {
  articleRouter,
  type ArticleGetAllPerPage,
  type ArticlesGetAllPerPage,
  type ArticleGetOneBySlug,
};
