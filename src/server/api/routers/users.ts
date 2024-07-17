import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

export const UserRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.findMany();

    return users;
  }),

  updateUnique: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        email: z.string(),
        role: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { id, ...data } = input;
        const updatedUserRole = await ctx.db.user.update({
          where: { id },
          data: {
            role: data.role,
          },
        });
        return updatedUserRole;
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
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Erro na atualização da instância",
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
  updateRole: protectedProcedure
    .input(
      z.object({
        email: z.string(),
        role: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { email, ...data } = input;
        const updatedUserRole = await ctx.db.user.update({
          where: { email },
          data,
        });
        revalidatePath("/admin");
        return updatedUserRole;
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
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Erro na atualização da instância",
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
