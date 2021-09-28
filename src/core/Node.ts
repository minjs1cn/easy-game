import { SystemEvent } from './SystemEvent';
import { Component } from './Component';
import { Transform } from './components/renderer';
import { NodeComponentContainer } from './containers';
import { Container } from '../adapter';
import { Game } from './Game';

let _uid = 0;

/**
 * 节点
 */
export class Node {
	/**
	 * 管理节点上的组件
	 */
	private _componentContainer: NodeComponentContainer;

	/**
	 * 节点ID
	 * TODO：目前存在无法缓存的问题
	 */
	private _id: number;
	/**
	 * 组件唯一ID
	 */
	public get id() {
		return this._id;
	}

	private _parent: Node | null = null;

	private _game!: Game;

	public get stage() {
		return this._game.view;
	}
	/**
	 * 节点的父亲
	 */
	public get parent() {
		return this._parent;
	}

	private _children: Node[] = [];

	/**
	 * 节点的儿子们
	 */
	public get children() {
		return this._children;
	}

	/**
	 * 每个节点对应的实体，分离实体的目的是分离渲染层
	 */
	public $entity: Container;

	private _transform: Transform;

	/**
	 * 节点变换，最终是同步到节点实体上
	 */
	public get transform() {
		return this._transform;
	}

	/**
	 * 节点位置
	 */
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
		if (this._visible === val) return;
		this._visible = val;

		if (this._visible) {
			this.parent?.addChild(this);
		} else {
			this.parent?.removeChild(this, false);
		}
	}

	/**
	 * 节点宽度
	 */
	public get width() {
		return this.$entity!.width;
	}
	public set width(w: number) {
		this.$entity!.width = w;
	}

	/**
	 * 节点高度
	 */
	public get height() {
		return this.$entity!.height;
	}
	public set height(h: number) {
		this.$entity!.height = h;
	}

	public constructor(public name?: string) {
		// 节点ID
		this._id = ++_uid;
		// 节点名称
		if (!name) {
			this.name = 'node_' + this.id;
		}
		// 节点实体
		this.$entity = new Container();
		// 节点组件管理器
		this._componentContainer = new NodeComponentContainer(this);

		// 节点默认自带transform组件
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

	/**
	 * 通过ID查找子节点
	 * @param id
	 * @returns
	 */
	public findNodeById(id: number): Node | null {
		return this.findBy('_id', id);
	}

	/**
	 * 通过名称查询子节点
	 * @param name
	 * @returns
	 */
	public findNodeByName(name: string): Node | null {
		return this.findBy('name', name);
	}

	private findBy(key: '_id' | 'name', id: number | string): Node | null {
		let children = this.children;
		let findNode: Node | null;
		for (let i = 0; i < children.length; i++) {
			findNode = children[i];
			if (findNode[key] === id) return findNode;
		}
		for (let i = 0; i < children.length; i++) {
			findNode = children[i].findBy(key, id);
			if (findNode) return findNode;
		}
		return null;
	}
}
