import { GraphicsComponent } from './components/Graphics/component';
import { GraphicsSystem } from './components/Graphics/system';
import { Game, Node, Component, Scene } from './core';
import { RendererSystem } from './core/components/renderer';

const game = new Game();
game.addSystem(
	new RendererSystem({
		antialias: true,
	}),
);
game.addSystem(new GraphicsSystem());
game.start();

const scene = new Scene();
game.startScene(scene);

let started: boolean;

window.addEventListener('click', () => {
	if (started) {
		started = false;
		scene.addChild(a);
	} else {
		started = true;
		scene.removeChild(a);
	}
});

const a = new Node();
a.transform.pivot.x = 100;
a.transform.pivot.y = 100;
scene.addChild(a);
const g = a.addComponent(new GraphicsComponent()) as GraphicsComponent;
g.graphics.beginFill(0xff5500);
g.graphics.drawCircle(100, 100, 30);
g.graphics.endFill();

console.log(game);

game.ticker.add(() => {
	// a.transform.position.x += 1;
	a.transform.rotation += 0.01;
});

game.mount(document.body);
