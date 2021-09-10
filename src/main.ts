import { Game, Node, Component } from './core';
import { RenderSystem } from './core/components/render';

const game = new Game();
game.addSystem(new RenderSystem());
game.ticker.elapsedMS = 1;
game.start();

window.addEventListener('click', () => {
	game.pause();
});

const a = new Node();

game.scene.addChild(a);

console.log(game);
