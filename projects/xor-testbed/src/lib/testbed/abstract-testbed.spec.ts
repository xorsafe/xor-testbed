import { deepCopy } from './abstract-testbed'; // Update this with the actual file path

describe('deepCopy', () => {
	it('should create a deep copy of a JSON object', () => {
		const original = {
			a: 1,
			b: {
				c: 2,
				d: [3, 4],
			},
		};

		const copy = deepCopy(original);
		expect(copy).toEqual(original);
		expect(copy).not.toBe(original); // Check for reference equality

		copy.b.c = 999; // Modify the copied object
		expect(copy.b.c).toBe(999);
		expect(original.b.c).toBe(2); // Original should remain unchanged
	});

	it('should deep copy an array', () => {
		const original: any = [1, [2, 3], { a: 4 }];

		const copy: any = deepCopy(original);
		expect(copy).toEqual(original);
		expect(copy).not.toBe(original);

		copy[1][0] = 999; // Modify the copied array
		expect(copy[1][0]).toBe(999);
		expect(original[1][0]).toBe(2); // Original should remain unchanged
	});

	it('should handle null and non-object values', () => {
		expect(deepCopy(null)).toBe(null);
		expect(deepCopy(42)).toBe(42);
		expect(deepCopy('hello')).toBe('hello');
	});
});
