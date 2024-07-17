import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

export const membershipsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const memberships = await ctx.db.membership.findMany({
      orderBy: { id: "asc" },
    });
    return memberships;
  }),

  updateUnique: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        role: z.string().optional(),
        profilePicture: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { id, ...data } = input;

        const updatedMembership = await ctx.db.membership.update({
          where: { id },
          data: {
            name: data.name?.length ? data.name : undefined,
            role: data.role?.length ? data.role : undefined,
            profilePicture: data.profilePicture?.length
              ? data.profilePicture
              : undefined,
          },
        });
        revalidatePath("/");
        return updatedMembership;
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
