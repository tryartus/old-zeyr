import {
	FetchMethods,
	FetchResultTypes,
	fetch as sfetch,
} from "@sapphire/fetch";

export class API {
	url: string;
	constructor(url: string) {
		if (url.endsWith("/")) {
			throw new Error("API Url must not end in '/'");
		}

		this.url = url;
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

	public async invert(image: string) {
		return this._get<Buffer>(
			"/image/invert",
			FetchResultTypes.Buffer,
			FetchMethods.Post,
			{
				image_url: image,
			},
		);
	}

	private async _get<T>(
		endpoint: string,
		resultType: FetchResultTypes,
		method?: FetchMethods,
		headers?: HeadersInit,
	) {
		const _data = await sfetch<T>(
			this.url + endpoint,
			{
				method,
				headers,
			},
			resultType,
		);

		return _data as T;
	}
}
