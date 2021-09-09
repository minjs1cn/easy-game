import { SystemContainer } from './containers';
import { Game } from './Game';

/**
 * 所有系统的抽象类
 */
export abstract class System {
	/**
	 * 系统对游戏实例的引用
	 */
	protected game!: Game;

	/**
	 * 系统唯一名称
	 */
	public abstract name: string;

	protected components: string[];

	/**
	 * 系统是否启动
	 */
	private started = false;

	protected constructor() {
		this.components = [];
	}

	private install(game: Game) {
		this.game = game;
	}

	protected watch(name: string) {
		this.components.push(name);
	}

	/**
	 * 系统初始化
	 */
	public init?(): boolean;

	/**
	 * 系统启动
	 */
	public start?(): void;

	/**
	 * 系统帧循环
	 * @param dt
	 */
	public update?(dt: number): void;

	/**
	 * 所有系统帧循环后
	 * @param dt
	 */
	public lateUpdate?(dt: number): void;

	/**
	 * 系统销毁
	 */
	public destroy?(): boolean;
}
