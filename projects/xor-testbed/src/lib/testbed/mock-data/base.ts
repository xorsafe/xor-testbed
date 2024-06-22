
export class Color {
	constructor(
		public r: number,
		public g: number,
		public b: number,
		public a = 255
	) { }

	static from(c: Color): Color {
		return new Color(c.r, c.g, c.b, c.a);
	}

	public rgbaString(): string {
		return `rgba(${this.r},${this.g},${this.b},${this.a})`;
	}

	public rgbString(): string {
		return `rgb(${this.r},${this.g},${this.b})`;
	}
}
