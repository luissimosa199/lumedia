import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
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
        })

    // update ?
    // delete ?
});