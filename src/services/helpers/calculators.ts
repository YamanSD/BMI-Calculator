/**
 * @param weight of the person in kilograms.
 * @param height of the person in meters.
 * @returns the calculated BMI.
 */
export function calculateBmi(weight: number, height: number): number {
    return weight / (height * height);
}

/**
 * Enum for the upper-bounds of BMI ranges.
 *
 * Ranges are based on this link https://www.cdc.gov/healthyweight/assessing/index.html
 */
export enum BmiLevel {
    underweight = 18.5,
    healthy = 25,
    overweight = 30,
    obese = Infinity
}

/**
 * @param bmi calculated BMI of the user.
 * @returns the BmiLevel corresponding to the given BMI.
 */
export function calculateBmiLevel(bmi: number): BmiLevel {
    if (bmi < BmiLevel.underweight) { // underweight
        return BmiLevel.underweight;
    } else if (bmi < BmiLevel.healthy) { // healthy
        return BmiLevel.healthy;
    } else if (bmi < BmiLevel.overweight) { // overweight
        return BmiLevel.overweight;
    } else { // obese
        return BmiLevel.obese;
    }
}
