import { FastifyPluginAsync } from "fastify";
import { Image } from "imagescript";
import { ImageBodyOptions } from "../../lib/types";
import { loadSource, setHeaders } from "../../lib/utils";

const opacity: FastifyPluginAsync = async (fastify): Promise<void> => {
	fastify.post<{ Body: ImageBodyOptions }>(
		"/opacity",
		async (request, reply) => {
			try {
				const image = await loadSource<Image>(request.body.image_url).catch(
					() => reply.badRequest("invalid buffer provided"),
				);
				const opacity = Number(request.body.value);

				image.opacity(opacity);

				const result = await image.encode();

				setHeaders(reply, request, {
					"X-Output-Width": image.width,
					"X-Output-Height": image.height,
				});

				reply.send(result);
			} catch (error) {
				console.log(error);
				reply.internalServerError("internal server error");
			}
		},
	);
};

export default opacity;
