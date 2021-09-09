import { Container } from '../../utils';
import { Component } from '../Component';
import { System } from '../System';

export class SystemContainer extends Container<System> {
	public constructor() {
		super('System');
	}

	public update(dt: number) {
		this.forEach(system => {
			// @ts-expect-error
			if (system.started) return;
			if (system.start) {
				// @ts-expect-error
				system.started = true;
				system.start();
			}

			if (system.update) {
				system.update(dt);
			}
		});
	}

	public lateUpdate(dt: number) {
		this.forEach(system => {
			if (system.lateUpdate) {
				system.lateUpdate(dt);
			}
		});
	}
}
