import { Component, System, SystemEvent } from '../../core';
import { SpriteComponent } from './component';

export class SpriteSystem extends System {
	public static systemName = 'SpriteSystem';

	public constructor() {
		super();
	}

	public init() {
		SystemEvent.instance.on(
			SystemEvent.Component.ADD,
			this.onComponentAdd,
			this,
		);
		SystemEvent.instance.on(
			SystemEvent.Component.REMOVE,
			this.onComponentRemove,
			this,
		);
	}

	private onComponentAdd(component: Component) {
		if (component.$name === SpriteComponent.componentName) {
			// @ts-expect-error
			component.node?.$entity?.addChild((component as SpriteComponent)._sprite);
		}
	}

	private onComponentRemove(component: Component) {
		if (component.$name === SpriteComponent.componentName) {
			component.node?.$entity?.removeChild(
				// @ts-expect-error
				(component as SpriteComponent)._sprite,
			);
		}
	}

	// public update(dt: number) {
	// 	console.log(dt);
	// }

	public destroy() {
		SystemEvent.instance.off(
			SystemEvent.Component.ADD,
			this.onComponentAdd,
			this,
		);
		SystemEvent.instance.off(
			SystemEvent.Component.UPDATE,
			this.onComponentRemove,
			this,
		);
	}
}
