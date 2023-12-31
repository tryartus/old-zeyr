import { FastifyReply, FastifyRequest } from "fastify";
import { decode as idecode } from "imagescript";
import sharp from "sharp";

export function setHeaders(
	reply: FastifyReply,
	request: FastifyRequest,
	headers: Record<string, string | number | boolean>,
) {
	return reply.headers({
		"Content-Type": `image/${request.headers.response_type ?? "png"}`,
		"X-Response-Time": Math.round(reply.getResponseTime()).toString(),
		"X-Output-Quality": request.headers.quality ?? 70,
		...headers,
	});
}

export async function decode(input: Buffer) {
	return idecode(await sharp(input).png().toBuffer());
}

export async function loadSource<T>(url: string): Promise<T> {
	const buffer = await (await fetch(url))
		.arrayBuffer();

	return await decode(Buffer.from(buffer)) as T
}

export async function loadFont(url: string) {
	return fetch(url)
		.then((i) => i.arrayBuffer())
		.then((f) => new Uint8Array(f));
}