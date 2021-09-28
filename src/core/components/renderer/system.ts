import { Component } from '../../Component';
import { System } from '../..//System';
import { SystemEvent } from '../../SystemEvent';
import { Transform } from './component';
import { Node } from '../../Node';
import { Application, IApplicationOptions, Container } from '../../../adapter';

export class RendererSystem extends System {
	public static systemName = 'RendererSystem';

	private application: Application | undefined;
	private applicationOptions: IApplicationOptions | undefined;

	public constructor(config?: IApplicationOptions) {
		super();
		this.applicationOptions = config;
	}

	public init() {
		console.log(this.$name + ' init');
		this.application = new Application(this.applicationOptions);
		this.game.view = this.application.view;
		// @ts-expect-error
		this.game.stage = this.application.stage;

		SystemEvent.instance.on(SystemEvent.Node.ADD, this.onNodeAdd, this);
		SystemEvent.instance.on(SystemEvent.Node.REMOVE, this.onNodeRemove, this);

		SystemEvent.instance.on(
			SystemEvent.Component.ADD,
			this.onComponentAdd,
			this,
		);
		SystemEvent.instance.on(
			SystemEvent.Component.UPDATE,
			this.onComponentUpdate,
			this,
		);
	}

	private onNodeAdd(node: Node) {
		console.log('onNodeAdd');
		if (!node.$entity) {
			node.$entity = new Container();
		}
		// @ts-expect-error
		node._game = this.game;
		node.parent?.$entity?.addChild(node.$entity);
	}

	private onNodeRemove(node: Node) {
		console.log('onNodeRemove');
		node.parent?.$entity?.removeChild(node.$entity as Container);
	}

	private onComponentAdd(component: Component) {
		if (component.$name === Transform.componentName) {
			// component.node!.$entity = new Container();
			console.log(this.$name + ' onComponentAdd');
		}
	}

	private onComponentUpdate(component: Component, dt: number) {
		if (component.$name === Transform.componentName) {
			component.update(dt);
		}
	}

	public update(dt: number) {
		this.game.scene?.update(dt);
	}

	public lateUpdate(dt: number) {
		this.game.scene?.lateUpdate(dt);
	}

	public destroy() {
		SystemEvent.instance.off(SystemEvent.Node.ADD, this.onNodeAdd, this);
		SystemEvent.instance.off(SystemEvent.Node.REMOVE, this.onNodeRemove, this);
		SystemEvent.instance.off(
			SystemEvent.Component.ADD,
			this.onComponentAdd,
			this,
		);
		SystemEvent.instance.off(
			SystemEvent.Component.UPDATE,
			this.onComponentUpdate,
			this,
		);
	}
}
