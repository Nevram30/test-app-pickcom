import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
login: publicProcedure
  .input(z.object({ username: z.string(), password: z.string() }))
  .mutation(async ({ ctx, input }) => {
    const user = await ctx.db.user.findFirst({
      where: {
        name: input.username,
      },
    });

    if (!user) {
      throw new Error("Invalid username or password");
    }

    // Generate and return a JWT token
    const token = generateToken(user.id);
    return { token };
  }),

findUser: publicProcedure
  .input(z.object({ userId: z.number() }))
  .query(async ({ ctx, input }) => {
    const user = await ctx.db.user.findUnique({
      where: {
        id: input.userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }),

})

function generateToken(_userId: number): string {
    return "generated_token";
}
