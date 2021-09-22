import { GraphicsComponent } from './components/Graphics/component';
import { GraphicsSystem } from './components/Graphics/system';
import { SpriteSystem, SpriteComponent } from './components/Sprite';
import { TextComponent, TextSystem } from './components/Text';
import { Game, Node, Component, Scene } from './core';
import { RendererSystem } from './core/components/renderer';

const game = new Game();
game.addSystem(
	new RendererSystem({
		antialias: true,
		backgroundAlpha: 0,
	}),
);
game.addSystem(new GraphicsSystem(), new TextSystem(), new SpriteSystem());
game.start();

const scene = new Scene();
game.startScene(scene);

let started: boolean = true;

const a = new Node('myNode');
scene.addChild(a);

const b = new Node('text');
scene.addChild(b);
const text = b.addComponent(new TextComponent());
text.text = 'hello world';
b.position.set(300, 300);

class MyCom extends Component {
	public update() {
		console.log('mycom');
		this.node!.transform.rotation += 0.01;
	}
}

a.addComponent(new MyCom());

window.addEventListener('click', () => {
	// if (started) {
	// 	started = false;
	// 	scene.removeChild(a);
	// 	game.ticker.remove(move);
	// } else {
	// 	started = true;
	// 	scene.addChild(a);
	// 	game.ticker.add(move);
	// }
});

a.transform.pivot.x = 100;
a.transform.pivot.y = 50;

// a.transform.position.x = 200;
// a.transform.position.y = 100;

const g = a.addComponent(new GraphicsComponent());

g.graphics.beginFill(0xff5500);
g.graphics.drawRect(0, 0, 200, 100);
g.graphics.endFill();

let speed = 2;

function move() {
	// a.transform.position.x += speed;
	// if (a.transform.position.x > game.canvas!.width - 120) {
	// 	speed *= -1;
	// }
	// if (a.transform.position.x < -120) {
	// 	speed *= -1;
	// }
	c.transform.rotation += 0.01;
	console.log(c.$entity?.width);
}

const c = new Node();
const sprite = c.addComponent(new SpriteComponent());
scene.addChild(c);
c.position.set(400, 400);
c.addComponent(new MyCom());

game.loader
	.add('a', 'pixi.png', () => {
		sprite.texture = game.loader.resources['a'].texture;
		sprite.anchor.set(0.5, 0.5);
	})
	.load();

game.mount(document.body);
