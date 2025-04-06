import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { prompts } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";

// Input validation schema for creating/updating prompts
const promptSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  aiTool: z.string().min(1, "AI tool is required").max(255),
  content: z.string().min(1, "Prompt content is required"),
});

// Input validation schema for prompt ID
const promptIdSchema = z.object({
  id: z.string().min(1, "Prompt ID is required"),
});

export const promptRouter = createTRPCRouter({
  // Create a new prompt
  create: protectedProcedure
    .input(promptSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const [prompt] = await ctx.db
        .insert(prompts)
        .values({
          title: input.title,
          aiTool: input.aiTool,
          content: input.content,
          userId,
        })
        .returning();

      return prompt;
    }),

  // Get a single prompt by ID
  getById: publicProcedure
    .input(promptIdSchema)
    .query(async ({ ctx, input }) => {
      const [prompt] = await ctx.db
        .select()
        .from(prompts)
        .where(eq(prompts.id, input.id))
        .limit(1);

      if (!prompt) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Prompt not found",
        });
      }

      return prompt;
    }),

  // Get all prompts
  getAll: publicProcedure.query(async ({ ctx }) => {
    const allPrompts = await ctx.db.select().from(prompts);
    return allPrompts;
  }),

  // Get all prompts for the current user
  getMine: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const myPrompts = await ctx.db
      .select()
      .from(prompts)
      .where(eq(prompts.userId, userId));

    return myPrompts;
  }),

  // Update a prompt
  update: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1, "Prompt ID is required"),
        ...promptSchema.shape,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // Verify prompt exists and belongs to the user
      const [existingPrompt] = await ctx.db
        .select()
        .from(prompts)
        .where(and(eq(prompts.id, input.id), eq(prompts.userId, userId)))
        .limit(1);

      if (!existingPrompt) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Prompt not found or you don't have permission to update it",
        });
      }

      // Update the prompt
      const [updatedPrompt] = await ctx.db
        .update(prompts)
        .set({
          title: input.title,
          aiTool: input.aiTool,
          content: input.content,
          updatedAt: new Date(),
        })
        .where(eq(prompts.id, input.id))
        .returning();

      return updatedPrompt;
    }),

  // Delete a prompt
  delete: protectedProcedure
    .input(promptIdSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // Verify prompt exists and belongs to the user
      const [existingPrompt] = await ctx.db
        .select()
        .from(prompts)
        .where(and(eq(prompts.id, input.id), eq(prompts.userId, userId)))
        .limit(1);

      if (!existingPrompt) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Prompt not found or you don't have permission to delete it",
        });
      }

      // Delete the prompt
      await ctx.db.delete(prompts).where(eq(prompts.id, input.id));

      return { success: true, id: input.id };
    }),
});
