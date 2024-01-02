export class MushAPI {
	baseURL: string;
	constructor(baseURL: string) {
		this.baseURL = baseURL;
	}

	public async invert(image_url: string) {
		const data = await this.post("/image/invert", {
			image_url,
		});

		return this.result(data);
	}

	public async speechBalloon(image_url: string) {
		const data = await this.post("/image/speech-balloon", {
			image_url,
		});

		return this.result(data);
	}

	public async opacity(image_url: string, value: string) {
		const data = await this.post("/image/opacity", {
			image_url,
			value,
		});

		return this.result(data);
	}

	public async saturation(image_url: string, value: string) {
		const data = await this.post("/image/saturation", {
			image_url,
			value,
		});

		return this.result(data);
	}

	public async ping() {
		return fetch(this.baseURL)
			.then((x) => x.json())
			.then((i) => i.root) as unknown as boolean;
	}

	private async result(data: Response) {
		return {
			data: await data.arrayBuffer(),
			time: data.headers.get("X-Response-Time"),
		};
	}

	private async post(endpoint: string, body: Record<string, number | string>) {
		return fetch(this.baseURL + endpoint, {
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
		});
	}
}
