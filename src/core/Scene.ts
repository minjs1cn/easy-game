import { Container } from '../adapter';
import { Node } from './node';

export class Scene extends Node {
	public constructor() {
		super();
		this.$entity = new Container();
	}
}
