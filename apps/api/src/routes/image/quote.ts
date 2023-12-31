import { FastifyPluginAsync } from "fastify";
import { Image, TextLayout } from "imagescript";
import { ImageBody } from "../../lib/types";
import { loadFont, loadSource, setHeaders } from "../../lib/utils";

/**
 * BETA ROUTE!!!
 *
 * Changes:
 * - Using Request body instead of headers
 * - Using functions instead of cloning conditions
 * - Few changes (minor)
 */

interface QuoteHeaders extends ImageBody {
	quote: string;
	user: string;
}

const quote: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	fastify.post<{ Body: QuoteHeaders }>("/quote", async (request, reply) => {
		try {
			const avatar = await loadSource<Image>(request.body.image_url).catch(() =>
				reply.badRequest("invalid buffer provided"),
			);
			const fakeGradient = await loadSource<Image>(
				"https://imgur.com/29uSOP0.png",
			);
			const quoteFont = await loadFont(
				"https://github.com/zeyrbot/assets/raw/main/fonts/IBMPlexSerif-MediumItalic.ttf",
			);

			const base = new Image(1200, 560);

			avatar.saturation(0);
			base.composite(avatar.resize(558, 560), 0, 0);
			base.composite(fakeGradient.resize(base.width, base.height));

			const quoteTextLayout = new TextLayout({
				verticalAlign: "center",
				horizontalAlign: "middle",
				maxWidth: 542,
			});

			const quoteText = await Image.renderText(
				quoteFont,
				48,
				`“${request.body.quote}”`,
				undefined,
				quoteTextLayout,
			);
			const userText = await Image.renderText(
				quoteFont,
				20,
				`— ${request.body.user}`,
			);
			base.composite(quoteText, 600, 219.04);
			base.composite(userText, 600, 280.5);

			const result = await base.encode();

			setHeaders(reply, request, {
				"X-Output-Width": base.width,
				"X-Output-Height": base.height,
			});

			reply.send(result);
		} catch (error) {
			console.log(error);
			reply.internalServerError("internal server error");
		}
	});
};

export default quote;
