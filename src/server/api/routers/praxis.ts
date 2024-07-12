import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

export const praxisRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    try {
      const praxis = await ctx.db.praxis.findFirst();
      return praxis;
    } catch (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Erro no servidor",
        cause: err,
      });
    }
  }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        whatsapp: z.string().url().optional(),
        instagram: z.string().url().optional(),
        linkedin: z.string().url().optional(),
        email: z.string().email().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { id, ...data } = input;
        const updatedPraxis = await ctx.db.praxis.update({
          where: { id },
          data,
        });
        return updatedPraxis;
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
});
