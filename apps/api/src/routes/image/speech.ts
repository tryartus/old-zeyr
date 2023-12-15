import { FastifyPluginAsync } from "fastify";
import { Image, decode } from "imagescript";
import { ImageHeaders } from "../../lib/types";

export interface SpeechImageHeaders extends ImageHeaders {
	custom_balloon?: string;
}

const speech: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	fastify.post<{ Headers: SpeechImageHeaders }>(
		"/speech-balloon",
		async (request, reply) => {
			try {
				const response = await fetch(request.headers.image_url);
				if (!response.ok) {
					reply.badRequest("Failed to fetch the image");
					return;
				}

				const rawSpeech = await response
					.arrayBuffer()
					.catch(() => reply.badRequest("An invalid image was provided"));
				const rawBalloon = await (
					await fetch(
						request.headers.custom_balloon ??
							"https://i.redd.it/z0nqjst12ih61.jpg",
					)
				).arrayBuffer();

				const [balloon, speech] = (await Promise.all([
					decode(rawBalloon as Buffer),
					decode(rawSpeech as Buffer),
				])) as Image[];

				//operations below
				speech.fit(speech.width, speech.height + (balloon.height - 100) * 2);
				speech.composite(
					balloon.resize(speech.width, balloon.height - 100),
					0,
					0,
				);
				speech.crop(0, 0, speech.width, speech.height - balloon.height);

				const result = await speech.encode();

				reply.headers({
					"Content-Type": "image/png",
					"X-Response-Time": Math.round(reply.getResponseTime()).toString(),
					"X-Output-Size": `${speech.width}x${speech.height}`,
					"X-Output-Quality": request.headers.quality ?? 70,
				});

				reply.send(result);
			} catch (error) {
				reply.code(500).send("Internal Server Error");
			}
		},
	);
};

export default speech;
