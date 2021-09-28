type TContainerKey = string | number;

interface AnyThing {
	[index: string | number]: any;
}
/**
 * 容器管理基类
 */
export abstract class Container<T extends AnyThing> {
	/**
	 * 容器集合
	 */
	private containers: {
		[name: TContainerKey]: any;
	} | null = null;

	/**
	 * 容器的唯一标识属性键值
	 */
	protected abstract key: string;

	/**
	 * 构造函数
	 */
	protected constructor(private name: string) {}

	/**
	 * 获取容器的唯一标志
	 * @param container
	 * @returns
	 */
	private getContainerName(container: TContainerKey | T) {
		return typeof container === 'string' || typeof container === 'number'
			? container
			: (container[this.key] as string);
	}

	/**
	 * 遍历容器
	 * @param fn
	 * @returns
	 */
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
	public get(container: TContainerKey) {
		if (!this.containers) return null;

		const name = this.getContainerName(container);

		console.log(this.name + ' get ' + name);
		return this.containers[name] || null;
	}

	/**
	 * 添加容器，过滤掉存在的容器
	 * @param container
	 * @param name
	 * @returns
	 */
	public add(
		container: T,
		name: TContainerKey = container[this.key] as TContainerKey,
	) {
		if (!this.containers) this.containers = {};

		if (this.containers[name]) {
			console.warn(`${name} container existed`);
			return;
		}

		this.containers[name] = container;
		return container;
	}

	/**
	 * 移除容器
	 * @param container
	 */
	public remove(container: TContainerKey | T) {
		if (!this.containers) return false;

		const name = this.getContainerName(container);

		if (!this.containers[name]) return false;

		delete this.containers[name];
		return true;
	}

	/**
	 * 移除所有容器
	 */
	public removeAll() {
		this.containers = null;
		return true;
	}
}
