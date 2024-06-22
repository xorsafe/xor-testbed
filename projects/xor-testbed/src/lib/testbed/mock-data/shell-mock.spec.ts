import { hslToRgbColor, linearSplit, randomlyDistribute, splitANumberIntoParts, variableUnevenDistribution } from "./shell-mocks";

describe("Shell mock data", () => {


	it('should split a number into n parts that add up to the original number', () => {
		const originalNumber = 10;
		const numberOfParts = 3;

		const parts = splitANumberIntoParts(originalNumber, numberOfParts);

		// Check if the parts add up to the original number
		const sumOfParts = parts.reduce((sum, part) => sum + part, 0);
		expect(sumOfParts).toBe(originalNumber);

		// Check if the number of parts is correct
		expect(parts.length).toBe(numberOfParts);

		// Check individual parts
		// expect(parts).toEqual([3, 3, 4]); // Parts are in any order

		expect(arraysMatchRegardlessOfOrder(parts, [3, 3, 4])).toBeTruthy();
	});

	it('should throw an error for an invalid number of parts', () => {
		const originalNumber = 10;
		const numberOfParts = 0;

		// Check if the function throws an error for an invalid number of parts
		expect(() => splitANumberIntoParts(originalNumber, numberOfParts)).toThrow();
	});

	it("should distribute a number into unequal parts (all integers)", () => {

		// sometimes this test might fail because of how fractions work
		const number = 50;
		const n = 5;
		const parts = randomlyDistribute(number, n);
		expect(parts.every(v=>isInteger(v))).toBeTruthy();

		expect(parts.length).toBe(n);
		expect(parts.reduce((a, b) => a + b, 0)).toBe(number);
	});

	it("should not produce negative parts", () => {
		const number = 15;
		const n = 4;
		const parts = randomlyDistribute(number, n);

		expect(parts.every(part => part >= 0)).toBe(true);
	});

	it("should throw an error for negative inputs", () => {
		expect(() => randomlyDistribute(-10, 5)).toThrow();
		expect(() => randomlyDistribute(10, -5)).toThrow();
	});

	it("should distribute a number into uneven parts", () => {
        const number = 10;
        const n = 5;
        const parts = variableUnevenDistribution(number, n);

        expect(parts.length).toBe(n);
        expect(parts.reduce((a, b) => a + b, 0)).toBe(number);
    });

    it("should not produce negative parts(using variableDistribution algorithm)", () => {
        const number = 15;
        const n = 4;
        const parts = variableUnevenDistribution(number, n);

        expect(parts.every(part => part >= 0)).toBe(true);
    });

    it("should throw an error for negative inputs(using variableDistribution algorithm)", () => {
        expect(() => variableUnevenDistribution(-10, 5)).toThrow();
        expect(() => variableUnevenDistribution(10, -5)).toThrow();
    });

    it("should have mostly uneven parts", () => {
        const number = 100;
        const n = 10;
        const parts = variableUnevenDistribution(number, n);

        // Check that at least 70% of the parts are not equal to the average
        const average = number / n;
        const unevenParts = parts.filter(part => part !== average);
        const unevenPercentage = (unevenParts.length / n) * 100;

        expect(unevenPercentage).toBeGreaterThanOrEqual(70);
    });

	it("should linearly split a number basis a factor", () => {
		const [a, b] = linearSplit(10, 0.4);
		expect(a).toBe(4);
		expect(b).toBe(6);
	})

	it("should throw error if factor in linear split is not b/w 0 and 1", () => {
		expect(() => linearSplit(10, 4)).toThrow();
		expect(() => linearSplit(10, -2)).toThrow();
	})
})

describe("Utils", () => {
	describe("Color conversion", () => {
		it('should correctly convert HSL to RGB', () => {
			const h = 120; // Green hue
			const s = 50;  // Saturation
			const l = 50;  // Lightness

			const rgbValues = hslToRgbColor(h, s, l);


			expect(rgbValues.r).toEqual(64); // Green RGB values
			expect(rgbValues.g).toEqual(191); // Green RGB values
			expect(rgbValues.b).toEqual(64); // Green RGB values
		});

		it('should handle achromatic colors', () => {
			const h = 0;   // Achromatic hue
			const s = 0;   // Saturation (gray)
			const l = 70;  // Lightness

			const rgbValues = hslToRgbColor(h, s, l);


			expect(rgbValues.r).toEqual(179); // Gray RGB values
			expect(rgbValues.g).toEqual(179); // Gray RGB values
			expect(rgbValues.b).toEqual(179); // Gray RGB values
		});
	})
})

function arraysMatchRegardlessOfOrder<T>(array1: T[], array2: T[]): boolean {
	if (array1.length !== array2.length) {
		return false;
	}

	const sortedArray1 = array1.slice().sort();
	const sortedArray2 = array2.slice().sort();

	return sortedArray1.every((value, index) => value === sortedArray2[index]);
}

function isInteger(number: number): boolean {
	return number === Math.floor(number);
}