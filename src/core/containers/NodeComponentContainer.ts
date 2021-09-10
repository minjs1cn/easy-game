import { Component } from '../Component';
import { Container } from '../../utils';

export class NodeComponentContainer extends Container<Component> {
	protected key = '$name';

	public constructor() {
		super('nodeComponent');
	}

	public start() {}

	public update(dt: number) {}

	public lateUpdate(dt: number) {}

	public destroy() {
		this.forEach(component => {
			// @ts-expect-error
			component.destroy();
		});
	}
}
