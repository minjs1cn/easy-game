import { EventEmitter } from '../adapter';

enum EComponentEvent {
	ADD = 'component.add',
	UPDATE = 'component.update',
	REMOVE = 'component.remove',
}

enum ENodeEvent {
	ADD = 'node.add',
	UPDATE = 'node.update',
	REMOVE = 'node.remove',
}

export class SystemEvent {
	private static _instance: EventEmitter;

	public static Component = EComponentEvent;
	public static Node = ENodeEvent;

	public static get instance() {
		if (this._instance) return this._instance;
		return (this._instance = new EventEmitter());
	}
}
