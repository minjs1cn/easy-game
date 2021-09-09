type TGetFun<T> = () => T;

/**
 * 对象池
 */
export class Pool<T> {
	/**
	 * 对象池默认大小
	 */
	public static MAX_SIZE = 5;

	private cache: T[];
	private count = 0;
	private _get: TGetFun<T>;

	public constructor(get: TGetFun<T>, size: number = Pool.MAX_SIZE) {
		this._get = get;
		this.cache = [];
		for (let i = 0; i < size; i++) {
			this.push(this._get());
		}
	}

	/**
	 * 对象池大小
	 * @returns
	 */
	public size() {
		return this.count;
	}

	/**
	 * 对象池是否为空
	 * @returns
	 */
	public isEmpty() {
		return this.count === 0;
	}

	/**
	 * 回收对象
	 * @param obj
	 */
	public push(obj: T) {
		this.cache.push(obj);
		this.count++;
	}

	/**
	 * 获取对象
	 * @returns
	 */
	public get() {
		if (this.isEmpty()) {
			return this._get();
		}
		this.count--;
		return this.cache[this.count];
	}
}
