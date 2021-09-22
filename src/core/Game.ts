import { Scene } from './Scene';
import { Ticker, EventEmitter, Container, Loader } from '../adapter';
import { SystemContainer } from './containers';
import { System } from './System';

export class Game extends EventEmitter {
	/**
	 * 游戏时钟
	 */
	public ticker: Ticker;

	public loader = new Loader();

	/**
	 * 系统管理容器
	 */
	private systemContainer: SystemContainer;

	private stage: Container | undefined | null;
	private _scene: Scene | undefined | null;

	public canvas: HTMLCanvasElement | undefined;

	public get scene() {
		return this._scene;
	}

	public constructor() {
		super();
		this.systemContainer = new SystemContainer();

		this.ticker = new Ticker();
		this.ticker.autoStart = false;
		this.ticker.add(this.mainLoop, this);
	}

	public mount(selector: string | HTMLElement) {
		if (typeof selector === 'string') {
			document.querySelector(selector)?.appendChild(this.canvas!);
			return;
		}

		selector.appendChild(this.canvas!);
	}

	public startScene(scene: Scene) {
		this._scene = scene;
		console.log(this.stage);
		this.stage?.addChild(scene.$entity as Container);
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
	public addSystem(...systems: System[]) {
		systems.forEach(system => {
			this.systemContainer.add(system);
			// @ts-expect-error
			system.install(this);
		});
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
