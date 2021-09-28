import { BaseTexture, Texture } from '@pixi/core';
import { SpriteComponent } from './components/Sprite';
import { TextComponent } from './components/Text';
import { Node, Component, Scene, RES } from './core';

export class A extends Node {
	public constructor() {
		super();

		const sprite = this.addComponent(new SpriteComponent());
		sprite.resource = 'ele1.png';
	}
}

export class LoadingScene extends Scene {
	private count = 0;
	private text!: TextComponent;

	public async init() {
		this.runGame();
		await this.loadResource();
		this.startScene(new StartScene());
	}

	private runGame() {
		const a = new Node();
		const t = a.addComponent(new TextComponent());
		t.text = 'loading';
		this.text = t;
		this.addChild(a);

		a.position.set(
			(this.stage.width - a.width) / 2,
			(this.stage.height - a.height) / 2,
		);
	}

	private onProgress(...args: any[]) {
		++this.count;
		this.text.text = 'count_' + this.count;
	}

	private loadResource() {
		const resources = [
			'sounds/click.mp3',
			'again_btn.png',
			'baoxiang.png',
			'bg.jpg',
			'dangqianfenshu.png',
			'download.png',
			'ele1.png',
			'ele2.png',
			'ele3.png',
			'ele4.png',
			'ele5.png',
			'start.mp4',
		];
		return new Promise(resolve => {
			for (let i = 0; i < resources.length; i++) {
				RES.add(resources[i]);
			}
			RES.load(resolve).onProgress.add(this.onProgress.bind(this));
		});
	}
}

export class StartScene extends Scene {
	public init() {
		this.runGame();

		window.addEventListener('click', () => {
			const a = new Node('video');
			const sprite = a.addComponent(new SpriteComponent());
			sprite.resource = 'start.mp4';
			this.addChild(a);
			a.position.x = (this.stage.width - a.width) / 2;

			a.transform.pivot.set(a.width / 2, 0);
			a.transform.scale.set(0.5);
			console.log(a.width);
			console.log(this.stage.width);
		});
	}

	private runGame() {
		const a = new A();
		this.addChild(a);
		const s = a.getComponent(SpriteComponent.componentName) as SpriteComponent;
		s.anchor.set(0.5, 0.5);

		const b = new A();
		this.addChild(b);

		b.position.set(100, 100);
	}
}
