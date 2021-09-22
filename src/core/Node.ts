import { SystemEvent } from './SystemEvent';
import { Component } from './Component';
import { Transform } from './components/renderer';
import { NodeComponentContainer } from './containers';
import { Container } from '../adapter';

const generateID = (function () {
	let _uid = 0;
	return () => ++_uid;
})();

/**
 * 节点
 */
export class Node {
	private _componentContainer: NodeComponentContainer;

	private _id: number;
	/**
	 * 组件唯一ID
	 */
	public get id() {
		return this._id;
	}

	private _parent: Node | null = null;
	/**
	 * 节点的父亲
	 */
	public get parent() {
		return this._parent;
	}

	private _children: Node[] = [];

	public get children() {
		return this._children;
	}

	/**
	 * 每个节点对应的实体，分离实体的目的是分离渲染层
	 */
	public $entity: Container | undefined | null;

	private _transform: Transform;

	public get transform() {
		return this._transform;
	}

	public get position() {
		return this._transform.position;
	}

	protected _visible = true;
	/**
	 * 组件是否可见，决定了是否渲染
	 */
	public get visible() {
		return this._visible;
	}
	public set visible(val: boolean) {
		if (this._visible !== val) this._visible = val;

		if (this._visible) {
			this.parent?.addChild(this);
		} else {
			this.parent?.removeChild(this, false);
		}
	}

	public get width() {
		return this.$entity!.width;
	}

	public get height() {
		return this.$entity!.height;
	}

	public constructor(public name?: string) {
		this._id = generateID();
		if (!name) {
			this.name = 'node_' + this.id;
		}
		this.$entity = new Container();
		this._componentContainer = new NodeComponentContainer(this);

		this._transform = new Transform();
		this.addComponent(this._transform);
	}

	/**
	 * 挂载组件
	 * @param name
	 * @returns
	 */
	public addComponent<T extends Component>(name: T) {
		return this._componentContainer.add<T>(name);
	}

	/**
	 * 移除组件
	 * @param name
	 * @returns
	 */
	public removeComponent(name: string | Component) {
		return this._componentContainer.remove(name);
	}

	/**
	 * 获取组件
	 * @param name
	 * @returns
	 */
	public getComponent(name: string) {
		return this._componentContainer.get(name);
	}

	/**
	 * 移除所有组件
	 */
	public removeAllComponents() {
		return this._componentContainer.removeAll();
	}

	/**
	 * 激活
	 * @param dt
	 * @returns
	 */
	public start() {
		if (!this.visible) return;

		this._componentContainer.start();

		this._children.forEach(child => {
			child.start();
		});
	}

	/**
	 * 更新
	 * @param dt
	 * @returns
	 */
	public update(dt: number) {
		if (!this.visible) return;

		this._componentContainer.update(dt);

		this._children.forEach(child => {
			child.update(dt);
		});
	}

	/**
	 * 更新之后
	 * @param dt
	 * @returns
	 */
	public lateUpdate(dt: number) {
		if (!this.visible) return;

		this._componentContainer.lateUpdate(dt);

		this._children.forEach(child => {
			child.lateUpdate(dt);
		});
	}

	/**
	 * 添加子节点
	 * @param child
	 */
	public addChild(child: Node) {
		if (child.parent) {
			child.parent.removeChild(child);
		}
		child._parent = this;
		this._children.push(child);
		SystemEvent.instance.emit(SystemEvent.Node.ADD, child);
	}

	/**
	 * 移除子节点
	 * @param child
	 */
	public removeChild(child: Node, isDeleteParent: boolean = true) {
		let index = this._children.findIndex(item => item === child);
		if (index > -1) {
			SystemEvent.instance.emit(SystemEvent.Node.REMOVE, child);
			this._children.splice(index, 1);
			if (isDeleteParent) {
				child._parent = null;
			}
		}
	}

	/**
	 * 清空所有节点
	 */
	public removeAllChildren() {
		this._children.length = 0;
	}
}
