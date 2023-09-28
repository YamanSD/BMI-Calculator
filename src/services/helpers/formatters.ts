/**
 * @param value number to be formatted
 * @returns a string of the value rounded to the nearest tenth.
 *          If the given value is NaN, the value is returns as is.
 */
export function formatValue(value: number): string {
    if (isNaN(value)) {
        return value.toString();
    }

    /* value is valid */
    return value.toFixed(1);
}
