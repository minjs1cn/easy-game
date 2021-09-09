export class Log {
	public constructor(private namespace: string) {}

	public warn(method: string, message: string) {
		console.warn(`${this.namespace}.${method}: ${message}`);
	}
}
