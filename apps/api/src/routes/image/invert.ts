import { FastifyPluginAsync } from "fastify";
import { Image } from "imagescript";
import { ImageBody } from "../../lib/types";
import { loadSource, setHeaders } from "../../lib/utils";

const invert: FastifyPluginAsync = async (fastify): Promise<void> => {
	fastify.post<{ Body: ImageBody }>("/invert", async (request, reply) => {
		try {
			const image = await loadSource<Image>(request.body.image_url).catch(() =>
				reply.badRequest("invalid buffer provided"),
			);

			image.invert();

			const result = await image.encode();

			setHeaders(reply, request, {
				"X-Output-Width": image.width,
				"X-Output-Height": image.height,
			});

			return reply.send(result);
		} catch (error) {
			console.log(error);
			reply.internalServerError("internal server error");
		}
	});
};

export default invert;
