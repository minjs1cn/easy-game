import { Graphics } from '../../adapter';
import { Component } from '../../core';

export class GraphicsComponent extends Component {
	public static componentName = 'GraphicsComponent';

	private _graphics: Graphics;

	public get graphics() {
		return this._graphics;
	}

	public constructor() {
		super();
		this._graphics = new Graphics();
	}
}
