import { FastifyPluginAsync } from "fastify";
import { Image, decode } from "imagescript";
import { ImageHeaders } from "../../lib/types";

const invert: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	fastify.post<{ Headers: ImageHeaders }>("/invert", async (request, reply) => {
		try {
			const response = await fetch(request.headers.image_url);
			if (!response.ok) {
				reply.badRequest("Failed to fetch the image");
				return;
			}

			const buffer = await response
				.arrayBuffer()
				.catch(() => reply.badRequest("An invalid image was provided"));
			const rawImage = (await decode(Buffer.from(buffer))) as Image;

			rawImage.invert();
			rawImage.resize(rawImage.width - 50, rawImage.height - 50);

			const result =
				request.headers.response_type === "jpeg"
					? await rawImage.encodeJPEG(request.headers.quality ?? 70)
					: await rawImage.encode();

			reply.headers({
				"Content-Type": `image/${request.headers.response_type ?? "png"}`,
				"X-Response-Time": Math.round(reply.getResponseTime()).toString(),
				"X-Output-Size": `${rawImage.width}x${rawImage.height}`,
				"X-Output-Quality": request.headers.quality ?? 70,
			});

			reply.send(result);
		} catch (error) {
			reply.code(500).send("Internal Server Error");
		}
	});
};

export default invert;
