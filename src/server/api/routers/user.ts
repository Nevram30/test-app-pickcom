import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
createUser: publicProcedure.input(z.object({ name: z.string(), email: z.string(), isLoading: z.boolean() })).mutation(async ({ ctx, input }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = await ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
        },
      });
  
      return user;
    }
  ),

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
  .query(async ({ ctx }) => {
    return ctx.db.user.findFirst({
      where: {
        id: 1,
      },
    });
  } 
  ),

})

function generateToken(_userId: number): string {
    return "generated_token";
}
