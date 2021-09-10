import { Game } from './Game';

/**
 * 所有系统的抽象类
 */
export abstract class System {
	/**
	 * 自定义名称
	 */
	public static systemName: string;
	/**
	 * 系统对游戏实例的引用
	 */
	protected game!: Game;

	/**
	 * 唯一名称
	 */
	public get $name() {
		// @ts-expect-error
		if (this.constructor.systemName) return this.constructor.systemName;
		return this.constructor.name;
	}

	protected components: string[];

	/**
	 * 系统是否启动
	 */
	private started = false;

	public constructor() {
		this.components = [];
	}

	/**
	 * 系统安装
	 * @param game
	 */
	private install(game: Game) {
		this.game = game;
		this.init && this.init();
	}

	protected watch(name: string) {
		console.log(this.$name + ' watch ' + name);
		this.components.push(name);
	}

	/**
	 * 初始化
	 */
	public init?(): void;

	/**
	 * 首次帧循环
	 */
	public start?(): void;

	/**
	 * 帧循环
	 * @param dt
	 */
	public update?(dt: number): void;

	/**
	 * 所有帧循环后
	 * @param dt
	 */
	public lateUpdate?(dt: number): void;

	/**
	 * 销毁
	 */
	public destroy?(): boolean;
}
