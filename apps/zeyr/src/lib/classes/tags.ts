import { type IParser, Interpreter } from "tagscript";

export class Tags {
	interpreter: Interpreter;
	constructor(...parsers: IParser[]) {
		this.interpreter = new Interpreter(...parsers);
	}

	public async format(content: string) {
		return await this.interpreter.run(content);
	}
}
