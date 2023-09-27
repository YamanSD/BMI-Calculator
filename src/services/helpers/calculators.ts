/**
 * @param weight of the person in kilograms.
 * @param height of the person in meters.
 * @returns the calculated BMI.
 */
export function calculateBmi(weight: number, height: number): number {
    return weight / (height * height);
}
