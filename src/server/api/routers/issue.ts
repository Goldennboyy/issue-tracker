import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { Status } from "@prisma/client";

export const issueRouter = createTRPCRouter({
  createIssue: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(100),
        description: z.string().min(1).max(1000),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;

      if (!user) {
        throw new TRPCError({
          message: "You need to be signed in",
          code: "UNAUTHORIZED",
        });
      }

      return await ctx.db.issue.create({
        data: {
          title: input.title,
          description: input.description,
          User: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    }),

  getIssues: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.issue.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
      },
    });
  }),

  deleteIssue: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.issue.delete({
        where: {
          id: input.id,
        },
      });
    }),

  updateIssue: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).max(100),
        description: z.string().min(1).max(1000),
        status: z.enum([Status.CLOSED, Status.OPEN, Status.IN_PROGRESS]), // corrected typo
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;

      if (!user) {
        throw new TRPCError({
          message: "You need to be signed in",
          code: "UNAUTHORIZED",
        });
      }

      return await ctx.db.issue.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          description: input.description,
          status: input.status,
        },
      });
    }),
});
