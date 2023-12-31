import { FastifyPluginAsync } from "fastify";
import { Image } from "imagescript";
import { ImageBody } from "../../lib/types";
import { loadSource, setHeaders } from "../../lib/utils";

export interface SpeechImageBody extends ImageBody {
	custom_balloon?: string;
}

const speech: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	fastify.post<{ Body: SpeechImageBody }>(
		"/speech-balloon",
		async (request, reply) => {
			try {
				const speech = await loadSource<Image>(request.body.image_url).catch(
					() => reply.badRequest("invalid buffer provided"),
				);
				const balloon = await loadSource<Image>(
					request.body.custom_balloon ?? "https://i.redd.it/z0nqjst12ih61.jpg",
				).catch(() => reply.badRequest("invalid buffer provided"));

				speech.fit(speech.width, speech.height + (balloon.height - 100) * 2);
				speech.composite(
					balloon.resize(speech.width, balloon.height - 100),
					0,
					0,
				);
				speech.crop(0, 0, speech.width, speech.height - balloon.height);

				const result = await speech.encode();

				setHeaders(reply, request, {
					"X-Output-Width": speech.width,
					"X-Output-Height": speech.height,
				});

				return reply.send(result);
			} catch (error) {
				console.log(error);
				reply.internalServerError("internal server error");
			}
		},
	);
};

export default speech;
