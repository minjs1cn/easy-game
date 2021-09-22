import { Component } from '../../Component';
import { Point } from '../../../math';

export class Transform extends Component {
	public static componentName = 'Transform';

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

	public update(dt: number) {
		this.node?.$entity?.pivot.copyFrom(this._pivot);
		this.node?.$entity?.position.copyFrom(this._position);
		this.node!.$entity!.rotation = this.rotation;
		this.node?.$entity?.scale.set(this._scale.x, this._scale.y);
	}
}
