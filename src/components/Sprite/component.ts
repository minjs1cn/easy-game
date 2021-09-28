import { Sprite, Texture, BaseTexture } from '../../adapter';
import { Component, RES } from '../../core';

export class SpriteComponent extends Component {
	public static componentName = 'SpriteComponent';

	private _sprite: Sprite;

	/**
	 * 纹理
	 */
	protected set texture(texture: Texture | undefined) {
		if (this._sprite.texture) {
			this._sprite.texture.destroy(false);
		}
		if (texture) {
			this._sprite.texture = texture;
		}
	}

	/**
	 * 资源
	 */
	public set resource(resource: string) {
		const { texture, data } = RES.resources[resource];

		if (texture) {
			this.texture = texture;
		} else {
			this.texture = new Texture(new BaseTexture(data));
		}
	}

	/**
	 * 宽
	 */
	public get width() {
		return this._sprite.width;
	}

	/**
	 * 高
	 */
	public get height() {
		return this._sprite.height;
	}

	/**
	 * 锚点
	 */
	public get anchor() {
		return this._sprite.anchor;
	}

	public constructor() {
		super();
		this._sprite = new Sprite();
	}
}
