export interface IPoint {
	x: number;
	y: number;
}

export class Point implements IPoint {
	public constructor(public x = 0, public y = 0) {}

	public clone() {
		return new Point(this.x, this.y);
	}

	public copyFrom(p: IPoint) {
		this.set(p.x, p.y);
		return this;
	}

	public copyTo(p: IPoint) {
		p.x = this.x;
		p.y = this.y;
		return p;
	}

	public equals(p: IPoint) {
		return this.x === p.x && this.y === p.y;
	}

	public set(x: number, y: number = x) {
		this.x = x;
		this.y = y;
		return this;
	}
}
