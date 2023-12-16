import { FastifyPluginAsync } from "fastify";
import { Image, decode } from "imagescript";
import { ImageHeaders } from "../../lib/types";
import { setHeaders } from "../../lib/utils";

export interface OpacityImageHeaders extends ImageHeaders {
	image_opacity: number;
}

const opacity: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	fastify.post<{ Headers: OpacityImageHeaders }>(
		"/opacity",
		async (request, reply) => {
			try {
				const response = await fetch(request.headers.image_url);
				const opacity = Number(request.headers.image_opacity);
				if (!response.ok) {
					reply.badRequest("Failed to fetch the image");
					return;
				}

				const buffer = await response
					.arrayBuffer()
					.catch(() => reply.badRequest("An invalid image was provided"));
				const rawImage = (await decode(Buffer.from(buffer))) as Image;

				if (!opacity || opacity < 0 || opacity > 1) {
					reply.badRequest(
						"Provided opacity value was incorrect. (Please make sure its between 0 and 1, you can use decimals)",
					);
				}

				rawImage.opacity(opacity);
				rawImage.resize(rawImage.width - 50, rawImage.height - 50);

				const result =
					request.headers.response_type === "jpeg"
						? await rawImage.encodeJPEG(request.headers.quality ?? 70)
						: await rawImage.encode();

				setHeaders(reply, request, {
					"X-Output-Size": `${rawImage.width}x${rawImage.height}`
				})

				reply.send(result);
			} catch (error) {
				reply.code(500).send("Internal Server Error");
			}
		},
	);
};

export default opacity;
