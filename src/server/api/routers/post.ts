import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({

    getAll: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.post.findMany()
    }),

    getLatest: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.post.findMany({
            orderBy: [{
                createAt: 'desc'
            }],
            take: 10,
        })
    }),

    getOne: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(({ ctx, input }) => {
            return ctx.prisma.post.findUnique({ where: { id: input.id } })
        }),

    create: protectedProcedure
        .input(z.object({
            title: z.string(),
            content: z.string(),
            tags: z.string().array(),
            authorName: z.string(),
        }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.post.create({
                data: {
                    title: input.title,
                    content: input.content,
                    authorName: ctx.session.user.name || input.authorName,
                    authorId: ctx.session.user.id,
                    tags: input.tags,
                }
            })
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.post.delete({
                where: {
                    id: input.id
                }
            })
        }),

    update: protectedProcedure
        .input(z.object({
            id: z.string(),
            title: z.string().optional(),
            content: z.string().optional(),
            authorName: z.string().optional(),
            authorId: z.string().optional(),
            tags: z.string().optional(),
        })).mutation(({ ctx, input }) => {
            return ctx.prisma.post.update({
                where: {
                    id: input.id
                },
                data: {
                    title: input.title,
                    content: input.content,
                    authorName: ctx.session.user.name || input.authorName,
                    authorId: ctx.session.user.id,
                    tags: input.tags,
                }
            })
        })
});