import { Point } from 'pixi.js';
import { Component } from './Component';

export class Transform extends Component {
	public name = 'Transform';

	private _position: Point;
	/**
	 * 平移
	 */
	public get position() {
		return this._position;
	}

	private _scale: Point;
	/**
	 * 缩放
	 */
	public get scale() {
		return this._scale;
	}

	/**
	 * 旋转
	 */
	public rotation = 0;

	private _skew: Point;
	/**
	 * 斜切
	 */
	public get skew() {
		return this._skew;
	}

	private _pivot: Point;
	/**
	 * 旋转中心
	 */
	public get pivot() {
		return this._pivot;
	}

	public constructor() {
		super();

		this._position = new Point(0, 0);
		this._scale = new Point(1, 1);
		this._skew = new Point(0, 0);
		this._pivot = new Point(0, 0);
	}
}
