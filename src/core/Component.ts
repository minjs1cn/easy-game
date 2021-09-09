import { Node } from '../node';

/**
 * 所有组件的抽象类
 */
export abstract class Component {
	/**
	 * 组件名·
	 */
	public abstract name: string;

	/**
	 * 组件挂载的节点
	 */
	public node: Node | null = null;

	private _enabled = true;
	/**
	 * 组件状态
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

	public load() {
		this.onLoad();
	}

	/**
	 * 组件加载的时候
	 */
	public onLoad() {}

	public enable() {
		this.onEnable();
	}

	/**
	 * 组件激活
	 */
	public onEnable() {}

	public disable() {
		this.onDisable();
	}

	/**
	 * 组件禁止
	 */
	public onDisable() {}

	/**
	 * 组件首次渲染的时候
	 */
	public start() {}

	/**
	 * 组件更新的时候
	 * @param dt
	 */
	public update(dt: number) {}

	/**
	 * 所有组件更新之后
	 * @param dt
	 */
	public lateUpdate(dt: number) {}

	public destroy() {
		this.onDestroy();
	}

	/**
	 * 组件销毁
	 */
	public onDestroy() {}
}
