/**
 * @param value a number in string form, can be invalid.
 * @returns true if the value is a valid positive number, otherwise false.
 */
export function isPositive(value: string): boolean {
    /* if invalid this variable is NaN */
    const actualValue: number = Number(value);

    /* NaN in any comparison operation returns false */
    return 0 < actualValue;
}
