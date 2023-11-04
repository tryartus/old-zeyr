import { FastifyPluginAsync } from "fastify";
import { Image, decode } from "imagescript";

type ImageHeaders = {
	image_url: string;
	response_type?: "png" | "jpeg";
};

const invert: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	fastify.post<{ Headers: ImageHeaders }>(
		"/invert",
		async function (request, reply) {
			try {
				const response = await fetch(request.headers.image_url);
				if (!response.ok) {
					reply.code(400).send("Failed to fetch the image");
					return;
				}

				const buffer = await response.arrayBuffer();
				const rawImage = (await decode(Buffer.from(buffer))) as Image;

				rawImage.invert();
				rawImage.resize(rawImage.width - 50, rawImage.height - 50);

				const result =
					request.headers.response_type === "jpeg"
						? await rawImage.encodeJPEG(5)
						: await rawImage.encode();

				reply.headers({
					"Content-Type": `image/${request.headers.response_type ?? "png"}`,
					"X-Response-Time": Math.round(reply.getResponseTime()).toString(),
					"X-Original-Size": `${rawImage.width}x${rawImage.height}`,
				});

				reply.send(result);
			} catch (error) {
				reply.code(500).send("Internal Server Error");
			}
		},
	);
};

export default invert;
