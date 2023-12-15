export class ZeyrAPI {
	baseURL: string;
	constructor(baseURL: string) {
		this.baseURL = baseURL;
	}

	public async invert(image_url: string) {
		const data = await this.post("/image/invert", {
			image_url,
		});

		return {
			data: await data.arrayBuffer(),
			time: data.headers.get("X-Response-Time"),
		};
	}

	public async speechBalloon(image_url: string) {
		const data = await this.post("/image/speech-balloon", {
			image_url,
		});

		return {
			data: await data.arrayBuffer(),
			time: data.headers.get("X-Response-Time"),
		};
	}

	public async opacity(image_url: string, image_opacity: number) {
		const data = await this.post("/image/opacity", {
			image_url,
			image_opacity,
		});

		return {
			data: await data.arrayBuffer(),
			time: data.headers.get("X-Response-Time"),
		};
	}

	private async post(
		endpoint: string,
		headers: Record<string, string | number>,
	) {
		return fetch(this.baseURL + endpoint, {
			headers: {
				...headers,
			} as HeadersInit,
			method: "POST",
		});
	}
}
