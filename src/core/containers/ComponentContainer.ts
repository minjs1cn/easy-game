import { Component } from '../Component';
import { Container } from '../../utils';

export class ComponentContainer extends Container<Component> {
	protected key = '$name';

	public constructor() {
		super('component');
	}
}
