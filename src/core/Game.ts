import { Scene } from './Scene';
import { Ticker, EventEmitter, Container } from '../adapter';
import { SystemContainer } from './containers';
import { System } from './System';
import { RES } from './Loader';

export class Game extends EventEmitter {
	/**
	 * 游戏时钟
	 */
	public ticker: Ticker;

	/**
	 * 加载器
	 */
	public loader = RES;

	/**
	 * 系统管理容器
	 */
	private systemContainer: SystemContainer;

	/**
	 * 舞台
	 */
	private stage!: Container;

	/**
	 * 视图
	 */
	public view!: HTMLCanvasElement;

	private _scene: Scene | undefined;

	/**
	 * 当前场景
	 */
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
		let container: HTMLElement | null;

		if (typeof selector === 'string') {
			container = document.querySelector(selector);
		} else {
			container = selector;
		}

		if (container) {
			const { view } = this;
			const { width, height } = view;
			const { offsetWidth, offsetHeight } = container;

			// TODO 适配，暂时支持showAll
			view.style.display = 'block';
			view.style.margin = '0 auto';

			if (navigator.userAgent.indexOf('iPhone') !== -1) {
				if (width / height - offsetWidth / offsetHeight > 0) {
					view.style.width = offsetWidth + 'px';
					view.style.height = offsetWidth / (width / height) + 'px';
					view.style.marginTop =
						offsetHeight / 2 - offsetWidth / 2 / (width / height) + 'px';
				} else {
					view.style.height = offsetHeight + 'px';
					view.style.width = (width / height) * offsetHeight + 'px';
				}
			} else if (height > offsetHeight) {
				view.style.height = offsetHeight + 'px';
				view.style.width = (width / height) * offsetHeight + 'px';
			} else {
			}

			container.appendChild(view);
		}
	}

	public startScene(scene: Scene) {
		if (this._scene) {
			this.stage.removeChild(this._scene.$entity);
		}
		this._scene = scene;
		// @ts-expect-error
		this._scene._game = this;
		this._scene.init();
		this.stage.addChild(scene.$entity);
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
