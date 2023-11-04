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
			const rawImage = (await fetch(request.headers.image_url)
				.then((x) => x.arrayBuffer())
				.then((i) => decode(Buffer.from(i)))) as Image;

			rawImage.invert();
			rawImage.resize(rawImage.width - 50, rawImage.height - 50);

			const result =
				request.headers.response_type === "jpeg"
					? await rawImage.encodeJPEG(5)
					: await rawImage.encode();

			reply.header(
				"Content-Type",
				`image/${request.headers.response_type ?? "png"}`,
			);
			reply.header("X-Response-Time", Math.round(reply.getResponseTime()));
			reply.header("X-Original-Size", `${rawImage.width}x${rawImage.height}`);
			reply.send(result);
		},
	);
};

export default invert;
