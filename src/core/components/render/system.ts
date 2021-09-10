import { System } from '../..';
import { Transform } from './component';

export class RenderSystem extends System {
	public static systemName = 'RenderSystem';

	public init() {
		console.log(this.$name + ' init');
		this.watch(Transform.componentName);
	}
}
