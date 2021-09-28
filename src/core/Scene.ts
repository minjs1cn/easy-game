import { Node } from './node';

export class Scene extends Node {
	public constructor() {
		super('scene');
	}

	/**
	 * 场景挂载之后会执行
	 */
	public init() {}

	protected startScene(scene: Scene) {
		// @ts-expect-error
		this._game.startScene(scene);
	}
}
