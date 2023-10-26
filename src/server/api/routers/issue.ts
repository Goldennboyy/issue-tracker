import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

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
});
