import { FastifyPluginAsync } from "fastify";
import sagiwi from "sagiri";

const sauceClient = sagiwi(process.env.SAUCENAO_KEY!);

interface SauceBody {
	image_url?: string;
	results?: number;
}

const find: FastifyPluginAsync = async (fastify, _): Promise<void> => {
	fastify.post<{ Body: string }>("/find", async function (request, reply) {
		const body = JSON.parse(request.body) as SauceBody;
		if (!body.image_url) {
			return reply.badRequest("invalid image url provided");
		}

		const sauce = await sauceClient(body.image_url, {
			results: body.results ?? 10,
		});

		return reply.send({
			results: sauce,
		});
	});
};

export default find;
