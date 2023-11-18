import { FastifyPluginAsync } from "fastify";
import sagiwi from "sagiri";

const sauceClient = sagiwi(process.env.SAUCENAO_KEY!);

interface SauceBody {
	image_url?: string;
	results?: number;
}

const find: FastifyPluginAsync = async (fastify, _): Promise<void> => {
	fastify.post<{ Body: SauceBody }>("/find", async function (request, reply) {
		if (!request.body.image_url) {
			return reply.badRequest("invalid image url provided");
		}

		const sauce = await sauceClient(request.body.image_url, {
			results: request.body.results ?? 10,
		});

		return reply.send({
			results: sauce,
		});
	});
};

export default find;
