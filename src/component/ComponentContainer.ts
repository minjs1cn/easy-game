import { Node } from '../node';
import { Log } from '../utils';
import { Component } from './Component';

/**
 * 管理节点上的组件
 */
export class ComponentContainer {
	private log = new Log('ComponentContainer');
	private components: {
		[index: string]: Component;
	} | null = null;

	public constructor(private owner: Node) {}

	private _started = false;

	/**
	 * 获取组件
	 * @param name
	 * @returns
	 */
	public get(name: string) {
		if (!this.components) this.components = {};

		return this.components[name];
	}

	/**
	 * 添加组件
	 * @param component
	 * @returns
	 */
	public add(component: Component) {
		if (!this.components) this.components = {};

		if (this.components[component.componentName]) {
			this.log.warn('add', 'Component already added');
			return false;
		}

		component.node = this.owner;
		this.components[component.componentName] = component;
	}

	/**
	 * 移除组件
	 * @param name
	 * @returns
	 */
	public remove(name: string | Component) {
		if (!this.components) this.components = {};

		let component: Component | undefined;

		if (typeof name === 'string') {
			component = this.components[name];

			if (!component) {
				this.log.warn('remove', 'Component already removed');
				return false;
			}

			return this._removeByComponent(component);
		}

		component = name;

		if (!this.components[component.componentName]) {
			this.log.warn('remove', 'Component already removed');
			return false;
		}

		return this._removeByComponent(component);
	}

	private _removeByComponent(component: Component) {
		if (!this.components) this.components = {};

		const oldComponent = this.components[component.componentName];

		if (!oldComponent) {
			this.log.warn('remove', 'Component already removed');
			return false;
		}

		oldComponent.node = null;
		delete this.components[component.componentName];

		return true;
	}

	/**
	 * 移除所有组件
	 * @returns
	 */
	public removeAll() {
		if (!this.components) return;

		const { components } = this;

		let selfComponent: Component;

		for (const key in components) {
			selfComponent = components[key];
			selfComponent.disable();
			selfComponent.node = null;
			delete components[key];
		}

		this.components = null;
	}

	public load() {
		const { components } = this;

		let selfComponent: Component;

		for (const key in components) {
			selfComponent = components[key];
			selfComponent.load();
		}
	}

	public enable() {
		const { components } = this;

		let selfComponent: Component;

		for (const key in components) {
			selfComponent = components[key];
			selfComponent.enable();
		}
	}

	public disable() {
		const { components } = this;

		let selfComponent: Component;

		for (const key in components) {
			selfComponent = components[key];
			selfComponent.disable();
		}
	}

	/**
	 * 开始组件
	 * @param dt
	 */
	public start() {
		if (this._started) return;

		this._started = true;

		const { components } = this;

		let selfComponent: Component;

		for (const key in components) {
			selfComponent = components[key];
			selfComponent.start();
		}
	}

	/**
	 * 更新组件
	 * @param dt
	 */
	public update(dt: number) {
		const { components } = this;

		let selfComponent: Component;

		for (const key in components) {
			selfComponent = components[key];
			selfComponent.update(dt);
		}
	}

	/**
	 * 更新组件
	 * @param dt
	 */
	public lateUpdate(dt: number) {
		const { components } = this;

		let selfComponent: Component;

		for (const key in components) {
			selfComponent = components[key];
			selfComponent.lateUpdate(dt);
		}
	}
}
