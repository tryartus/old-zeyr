import { FastifyPluginAsync } from "fastify";
import { Image } from "imagescript";
import sharp from "sharp";
import { ImageBody } from "../../lib/types";
import { loadSource, setHeaders } from "../../lib/utils";

const targets = ["gif", "png", "jpeg", "avif", "webp"]

interface ConvertBody extends ImageBody {
    target: "gif" | "png" | "jpeg" | "avif" | "webp"
}

const convert: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.post<{ Body: ConvertBody }>("/convert", async (request, reply) => {
        try {
            const image = await loadSource<Image>(request.body.image_url).catch(() =>
                reply.badRequest("invalid buffer provided"),
            );

            if (!targets.includes(request.body.target)) {
                reply.badRequest("invalid target")
            }

            const result = await sharp(await image.encode())[request.body.target]().toBuffer()

            request.headers.response_type = request.body.target

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

export default convert;
