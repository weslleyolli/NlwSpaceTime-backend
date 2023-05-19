
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function memoriesRoutes(app: FastifyInstance) {
    app.get('/memories', async () => {
        const memories = await prisma.memory.findMany({
            orderBy: {
                createdAt: 'asc',
            },
        })

        return memories.map(memory => {
            return {
                id: memory.id,
                coverUrl: memory.coverUrl,
                excerpt: memory.content.substring(0, 115).concat('...'),
            }
        })
    })

    app.post('/memories', async (request) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        const memory = await prisma.memory.findUniqueOrThrow({
            where: {
                id,
            },
        })

        return memory
    })

    app.get('/memories/:id', async () => {

    })

    app.put('/memories/:id', async () => {

    })

    app.delete('/memories/:id', async () => {

    })
}