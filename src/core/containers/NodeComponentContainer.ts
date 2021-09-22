import { Component } from '../Component';
import { Container } from '../../utils';
import { Node } from '../Node';
import { SystemEvent } from '..';

export class NodeComponentContainer extends Container<Component> {
	protected key = '$name';

	private owner: Node;

	public constructor(node: Node) {
		super('NodeComponentContainer');
		this.owner = node;
	}

	public add<T extends Component>(component: T, name?: string): T {
		if (!super.add(component, name)) return component;

		// @ts-expect-error
		component._node = this.owner;
		// @ts-expect-error
		component.load();
		SystemEvent.instance.emit(SystemEvent.Component.ADD, component);
		return component;
	}

	public remove(component: string | number | Component) {
		if (!super.remove(component)) return false;

		SystemEvent.instance.emit(SystemEvent.Component.REMOVE, component);
		return true;
	}

	public start() {}

	public update(dt: number) {
		this.forEach(component => {
			component.update(dt);
			SystemEvent.instance.emit(SystemEvent.Component.UPDATE, component, dt);
		});
	}

	public lateUpdate(dt: number) {
		this.forEach(component => {
			component.lateUpdate(dt);
		});
	}

	public destroy() {
		this.forEach(component => {
			component.destroy();
		});
	}
}
