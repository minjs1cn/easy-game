import { Ticker } from 'pixi.js';

const ticker = new Ticker();
ticker.autoStart = false;

ticker.addOnce(a => {
	console.log(ticker.autoStart, ticker.started);
});

// ticker.start();
