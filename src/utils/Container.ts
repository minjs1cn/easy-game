/**
 * 容器管理基类
 */
export class Container<T extends { name: string }> {
	private containers: {
		[name: string]: T | undefined;
	} | null = null;

	protected constructor(private name: string) {}

	private getName(container: string | T) {
		return typeof container === 'string' ? container : container.name;
	}

	public forEach(fn: (container: T) => void) {
		if (!this.containers) return;

		for (const key in this.containers) {
			if (Object.prototype.hasOwnProperty.call(this.containers, key)) {
				fn(this.containers[key] as T);
			}
		}
	}

	/**
	 * 获取容器
	 * @param container
	 * @returns
	 */
	public get(container: string | T) {
		if (!this.containers) return null;

		const name = this.getName(container);
		return this.containers[name] || null;
	}

	/**
	 * 添加容器
	 * @param container
	 * @param name
	 * @returns
	 */
	public add(container: T, name: string = container.name) {
		if (!this.containers) this.containers = {};

		if (this.containers[name]) {
			console.warn(`${name} container`);
			return;
		}
		this.containers[name] = container;
	}

	/**
	 * 移除容器
	 * @param container
	 */
	public remove(container: string | T) {
		if (!this.containers) return;

		const name = this.getName(container);

		if (!this.containers[name]) return;

		delete this.containers[name];
	}

	/**
	 * 移除所有容器
	 */
	public removeAll() {
		this.containers = null;
	}
}
