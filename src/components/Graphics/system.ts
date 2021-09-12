import { Component, System, SystemEvent } from '../../core';
import { GraphicsComponent } from './component';

export class GraphicsSystem extends System {
	public static systemName = 'GraphicsSystem';

	public constructor() {
		super();
	}

	public init() {
		console.log(this.$name + ' init');
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
		if (component.$name === GraphicsComponent.componentName) {
			console.log(component);
			component.node?.$entity?.addChild(
				(component as GraphicsComponent).graphics,
			);
		}
	}

	private onComponentRemove(component: Component) {
		if (component.$name === GraphicsComponent.componentName) {
			console.log(this.$name + ' onComponentUpdate');
			component.node?.$entity?.removeChild(
				(component as GraphicsComponent).graphics,
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
