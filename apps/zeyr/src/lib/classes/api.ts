import {
	FetchMethods,
	FetchResultTypes,
	fetch as sfetch,
} from "@sapphire/fetch";
import { SauceResult } from "../types/saucenao";

export class API {
	url: string;
	constructor(url: string) {
		if (url.endsWith("/")) {
			throw new Error("API Url must not end in '/'");
		}

		this.url = url;
	}

	public async sauce(image: string, results?: number | null) {
		return this._get<SauceResult>(
			"/sauce/find",
			FetchResultTypes.JSON,
			FetchMethods.Post,
			{},
			JSON.stringify({
				image_url: image,
				results,
			}),
		);
	}

	public async speechballoon(image: string) {
		return this._get<Buffer>(
			"/image/speech-balloon",
			FetchResultTypes.Buffer,
			FetchMethods.Post,
			{
				image_url: image,
			},
		);
	}

	public async invert(image_url: string) {
		return this._get<Buffer>(
			"/image/invert",
			FetchResultTypes.Buffer,
			FetchMethods.Post,
			{
				image_url,
			},
		);
	}

	public async opacity(image_url: string, image_opacity: string) {
		return this._get<Buffer>(
			"/image/opacity",
			FetchResultTypes.Buffer,
			FetchMethods.Post,
			{
				image_url,
				image_opacity,
			},
		);
	}

	private async _get<T>(
		endpoint: string,
		resultType: FetchResultTypes,
		method?: FetchMethods,
		headers?: HeadersInit,
		body?: BodyInit,
	) {
		const _data = await sfetch<T>(
			this.url + endpoint,
			{
				method,
				headers,
				body,
			},
			resultType,
		);

		return _data as T;
	}
}
