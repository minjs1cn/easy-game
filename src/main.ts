import { Game } from './core';
import { Component } from './component';
import { Node } from './node';

const game = new Game();
game.start();

window.addEventListener('click', () => {
	game.pause();
});

const a = new Node();

class A extends Component {
	public componentName = 'A';

	onLoad() {
		console.log('A onload', this.node);
	}

	start() {
		console.log('A start', this.node);
	}

	update(dt: number) {
		console.log('A update');
	}
}

class B extends Component {
	public componentName = 'B';

	onLoad() {
		console.log('B onload', this.node);
	}

	start() {
		console.log('B start', this.node);
	}

	update(dt: number) {
		console.log('B update');
	}
}

a.addComponent(new A());
a.addComponent(new B());

game.scene.addChild(a);
