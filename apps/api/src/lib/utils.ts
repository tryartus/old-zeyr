import { FastifyReply, FastifyRequest } from "fastify";

export function setHeaders(reply: FastifyReply, request: FastifyRequest, headers: Record<string, string | number | boolean>) {
    return reply.headers({
        "Content-Type": `image/${request.headers.response_type ?? "png"}`,
        "X-Response-Time": Math.round(reply.getResponseTime()).toString(),
        "X-Output-Quality": request.headers.quality ?? 70,
        ...headers
    });
}