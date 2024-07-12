import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

export const portfolioRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const portfolios = await ctx.db.portfolio.findMany();
    return portfolios;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      try {
        const portfolio = await ctx.db.portfolio.findUnique({ where: input });
        return portfolio;
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
        name: z.string().min(1),
        description: z.string().min(1),
        image: z.string().url().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const createdPortfolio = await ctx.db.portfolio.create({
          data: input,
        });
        return createdPortfolio;
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
        name: z.string().optional(),
        description: z.string().optional(),
        image: z.string().url().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { id, ...data } = input;
        const updatedPoportfolio = await ctx.db.portfolio.update({
          where: { id },
          data,
        });
        return updatedPoportfolio;
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
        const deletedPoportfolio = await ctx.db.portfolio.delete({
          where: input,
        });
        return deletedPoportfolio;
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
