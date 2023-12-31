import { FastifyPluginAsync } from "fastify";
import { Image } from "imagescript";
import { ImageBodyOptions } from "../../lib/types";
import { loadSource, setHeaders } from "../../lib/utils";

const opacity: FastifyPluginAsync = async (fastify): Promise<void> => {
	fastify.post<{ Body: ImageBodyOptions }>(
		"/opacity",
		async (request, reply) => {
			try {
				const opacity = Number(request.body.value);

				const image = await loadSource<Image>(request.body.image_url).catch(
					() => reply.badRequest("invalid buffer provided"),
				);

				if (!opacity || opacity < 0 || opacity > 1) {
					reply.badRequest(
						"Provided opacity value was incorrect. (Please make sure its between 0 and 1, you can use decimals)",
					);
				}

				image.opacity(opacity);
				image.resize(image.width - 50, image.height - 50);

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
