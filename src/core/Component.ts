import { Node } from './node';

/**
 * 所有组件的抽象类
 */
export abstract class Component {
	[index: string]: unknown;
	/**
	 * 自定义名称
	 */
	public static componentName: string;

	/**
	 * 唯一名称
	 */
	public get $name() {
		// @ts-expect-error
		if (this.constructor.componentName) return this.constructor.componentName;
		// @ts-expect-error
		this.constructor.componentName = this.constructor.name;
		return this.constructor.name;
	}

	private _node: Node | undefined | null;
	/**
	 * 挂载的节点
	 */
	public get node() {
		return this._node;
	}

	private _enabled = true;
	/**
	 * 状态
	 */
	public get enabled() {
		return this._enabled;
	}

	public set enabled(value) {
		if (this._enabled === value) return;

		this._enabled = value;

		if (this._enabled) {
			// 激活
			this.enable();
		} else {
			// 禁止
			this.disable();
		}
	}

	public constructor() {}

	/**
	 * 加载的时候
	 */
	public onLoad() {}
	private load() {
		console.log(this.$name + ' load');
		this.onLoad();
	}

	/**
	 * 激活
	 */
	public onEnable() {}
	private enable() {
		this.onEnable();
	}

	/**
	 * 禁止
	 */
	public onDisable() {}
	private disable() {
		this.onDisable();
	}

	/**
	 * 首次帧循环
	 */
	public start() {}

	/**
	 * 帧循环
	 * @param dt
	 */
	public update(dt: number) {}

	/**
	 * 所有帧循环后
	 * @param dt
	 */
	public lateUpdate(dt: number) {}

	/**
	 * 销毁
	 */
	public onDestroy() {}
	public destroy() {
		this.onDestroy();
	}
}
