import { GraphicsSystem } from './components/Graphics';
import { SpriteSystem } from './components/Sprite';
import { TextSystem } from './components/Text';
import { Game } from './core';
import { RendererSystem } from './core/components/renderer';
import { LoadingScene, StartScene } from './prefab';

const game = new Game();

game.addSystem(
	new RendererSystem({
		width: 750,
		height: 1334,
		antialias: true,
		// backgroundAlpha: 0,
		backgroundColor: 0xffeeff,
	}),
	new GraphicsSystem(),
	new TextSystem(),
	new SpriteSystem(),
);
game.start();

const loadingScene = new LoadingScene();

game.startScene(loadingScene);

// const startScene = new StartScene();

game.mount(document.body);
