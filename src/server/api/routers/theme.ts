import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";

export const themeRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const themes = await ctx.db.theme.findMany();

    return themes;
  }),

  createUnique: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const createdTheme = await ctx.db.theme.create({
          data: input,
        });
        return createdTheme;
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

  deleteUnique: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const deletedTheme = await ctx.db.theme.delete({ where: input });
        return deletedTheme;
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
