import { type IParser, Interpreter, StringTransformer } from "tagscript";

export class Tags {
	interpreter: Interpreter;
	constructor(...parsers: IParser[]) {
		this.interpreter = new Interpreter(...parsers);
	}

	public async format(content: string, args: string) {
		return await this.interpreter.run(content, {
			args: new StringTransformer(args),
		});
	}
}
