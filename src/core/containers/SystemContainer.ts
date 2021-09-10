import { Container } from '../../utils';
import { System } from '../System';

export class SystemContainer extends Container<System> {
	protected key = '$name';

	public constructor() {
		super('system');
	}

	public update(dt: number) {
		this.forEach(system => {
			// @ts-expect-error
			if (!system.started) {
				// @ts-expect-error
				system.started = true;
				system.start && system.start();
				console.log(system.$name + ' start');
			}

			if (system.update) {
				console.log(system.$name + ' update');
				system.update(dt);
			}
		});
	}

	public lateUpdate(dt: number) {
		this.forEach(system => {
			if (system.lateUpdate) {
				console.log(system.$name + ' lateUpdate');
				system.lateUpdate(dt);
			}
		});
	}
}
