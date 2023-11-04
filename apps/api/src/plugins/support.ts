import fp from "fastify-plugin";

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type SupportPluginOptions = {};

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<SupportPluginOptions>(async (fastify, opts) => {
	fastify.decorate("someSupport", function () {
		return "hugs";
	});
});

// When using .decorate you have to specify added properties for Typescript
declare module "fastify" {
	export interface FastifyInstance {
		someSupport(): string;
	}
}