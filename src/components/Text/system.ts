import { Component, System, SystemEvent } from '../../core';
import { TextComponent } from './component';

export class TextSystem extends System {
	public static systemName = 'TextSystem';

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
		if (component.$name === TextComponent.componentName) {
			// @ts-expect-error
			component.node?.$entity?.addChild((component as TextComponent)._text);
		}
	}

	private onComponentRemove(component: Component) {
		if (component.$name === TextComponent.componentName) {
			component.node?.$entity?.removeChild(
				// @ts-expect-error
				(component as TextComponent)._text,
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
