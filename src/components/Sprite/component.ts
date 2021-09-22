import { Sprite, Texture } from '../../adapter';
import { Component } from '../../core';

export class SpriteComponent extends Component {
	public static componentName = 'SpriteComponent';

	private _sprite: Sprite;

	public set texture(texture: Texture | undefined) {
		if (this._sprite.texture) {
			this._sprite.texture.destroy(false);
		}
		if (texture) {
			this._sprite.texture = texture;
		}
	}

	public get anchor() {
		return this._sprite.anchor;
	}

	public constructor() {
		super();
		this._sprite = new Sprite();
	}
}
