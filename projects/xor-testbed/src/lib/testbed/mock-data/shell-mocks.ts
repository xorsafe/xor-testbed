import { faker } from '@faker-js/faker';
import { Color } from './base';

export function mockPartner(notificationCount = 0): any {
	return {
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		avatar: faker.image.avatar(),
		notificationCount,
		selected: false
	}
}

/** Given a number splits it into equal parts(integer only) */
export function splitANumberIntoParts(count: number, split: number): number[] {
	if (split <= 0) {
		throw new Error('Number of parts must be greater than 0.');
	}

	const partSize = Math.floor(count / split);
	const remainder = count % split;

	const parts = new Array(split).fill(partSize);

	for (let i = 0; i < remainder; i++) {
		parts[i]++;
	}

	return parts;
}

/**
 * Splits a number randomly into several parts
 * @param n Number to distribute
 * @param totalSplit total splits
 * @param fractionsAllowed True ensures that fractions are allowed, 
 * false gives only integers even if that means that the sum doesnt add up to the original number
 * @returns Distribution as an array
 */
export function randomlyDistribute(n: number, totalSplit: number, fractionsAllowed = false): number[] {
	if (n <= 0 || totalSplit <= 0) {
		throw new Error("Both number and split should be positive");
	} else if (totalSplit == 1) {
		return [n];
	}

	// cut the number in half then make an unequal split
	// (using a random number generator), now you have 2 parts.
	// for the bigger split, repeat the process untill you 
	// get to the desired split count

	let splitsMade = 1;
	const parts: number[] = [n];
	let currentBiggerPartIndex = 0;
	while (splitsMade < totalSplit) {
		const distribution = Math.random();
		const current = parts[currentBiggerPartIndex];
		// split the current bigger part into 
		// two unequal parts basis above distribution.
		// but we will make them integers later
		const [a, b] = linearSplit(current, distribution);
		parts.splice(currentBiggerPartIndex, 1, a, b);
		if (b > a) {
			currentBiggerPartIndex++;
		}
		splitsMade++;
	}

	if (!fractionsAllowed) {
		// find the sum of all fractional parts
		const fractionSum = parts.reduce((p, c) => p + (c % 1), 0);
		for (let i = 0; i < parts.length; i++) {
			parts[i] = Math.floor(parts[i])
		}
		// pick an index at random and add the fraction sum
		// but rounded
		const randomPick = Math.floor(Math.random() * parts.length);
		parts[randomPick] += Math.round(fractionSum)
	}

	return parts;
}

/**
 * Linear split of a number into parts
 * @param n number to distribute
 * @param t basis fraction
 * @returns split
 */
export function linearSplit(n: number, t: number): [number, number] {
	if (t < 0 || t > 1) {
		throw new Error("t has to be between 0 and 1 (inclusive)")
	}
	return [
		n * t,
		n * (1 - t)
	]
}

/**
 * Another variation of the number distribution but this one doesn't produce
 * zero like the random distribution does because it uses statistical variance
 * @param n Number to distribute
 * @param totalSplits total splits
 * @returns Distribution as an array
 */ 
export function variableUnevenDistribution(n: number, totalSplits: number): number[] {
    if (totalSplits <= 0 || n <= 0) {
        throw new Error("Both number and n should be positive");
    }else if(totalSplits==1){
		return [n];
	}

    const parts: number[] = [];

    // Generate n random parts that sum up to the given number
    for (let i = 0; i < totalSplits; i++) {
        const remainingParts = totalSplits - i;
        const minPart = 1;
        const maxPart = Math.ceil(n / remainingParts) * 2; // Adjust for unevenness
        const randomPart = Math.floor(Math.random() * (maxPart - minPart + 1)) + minPart;
        
        // Ensure the random part doesn't exceed the remaining number
        if (randomPart > n) {
            parts.push(n);
            break;
        }

        parts.push(randomPart);
        n -= randomPart;
    }

    return parts;
}


/**
 * Converts HSL to RGB based format
 * @param hue Hue
 * @param saturation Saturation
 * @param lightness Lightness
 * @returns A Color object with rgb values 
 */
export function hslToRgbColor(hue: number, saturation: number, lightness: number): Color {
	hue /= 360; // Convert hue to a value between 0 and 1
	saturation /= 100; // Convert saturation to a value between 0 and 1
	lightness /= 100; // Convert lightness to a value between 0 and 1

	let r, g, b;

	if (saturation === 0) {
		r = g = b = lightness; // Achromatic (gray)
	} else {
		const hueToRgb = (p: number, q: number, t: number) => {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		};

		const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
		const p = 2 * lightness - q;

		r = hueToRgb(p, q, hue + 1 / 3);
		g = hueToRgb(p, q, hue);
		b = hueToRgb(p, q, hue - 1 / 3);
	}

	const color = new Color(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
	return color;

}

export function quickRandomColor(saturation: number = 50, lightness: number = 50): Color {
	const color = hslToRgbColor(Math.floor(Math.random() * 360), saturation, lightness);
	return color;
}