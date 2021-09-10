import { Scene } from '.';
import { Ticker, EventEmitter } from '../adapter';
import { SystemContainer, ComponentContainer } from './containers';
import { System } from './System';

export class Game extends EventEmitter {
	/**
	 * 游戏时钟
	 */
	public ticker: Ticker;

	/**
	 * 系统管理容器
	 */
	private systemContainer: SystemContainer;

	/**
	 * 组件管理容器
	 */
	private componentContainer: ComponentContainer;

	public scene = new Scene();

	public constructor() {
		super();
		this.systemContainer = new SystemContainer();
		this.componentContainer = new ComponentContainer();

		this.ticker = new Ticker();
		this.ticker.autoStart = false;
		this.ticker.add(this.mainLoop, this);
	}

	/**
	 * 游戏主循环
	 * @param dt
	 */
	private mainLoop(dt: number) {
		this.systemContainer.update(dt);
		this.systemContainer.lateUpdate(dt);
	}

	/**
	 * 添加系统
	 * @param system
	 */
	public addSystem(system: System) {
		this.systemContainer.add(system);
		// @ts-expect-error
		system.install(this);
	}

	/**
	 * 游戏开始
	 */
	public start() {
		this.ticker.start();
	}

	/**
	 * 游戏暂停
	 */
	public pause() {
		this.ticker.stop();
	}

	/**
	 * 游戏恢复
	 */
	public resume() {
		this.ticker.start();
	}
}
