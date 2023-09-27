/**
 * @param value number in string form, parsed and formatted
 * @returns a string of the value rounded to the nearest hundredth.
 *          If the given value is not a valid number, the string is returned as is.
 */
export function formatValue(value: string): string {
    /* if invalid this variable is NaN */
    const actualValue: number = Number(value);

    if (isNaN(actualValue)) {
        return value;
    }

    /* value is valid */
    return actualValue.toFixed(2);
}
