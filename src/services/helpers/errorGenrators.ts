/**
 * @param value invalid value to generate an error for.
 * @returns the generated error based on the value.
 */
export function generateNumericInputErr(value: string): string {
    console.log(value, value.length)

    if (value.length === 0) {
        return "This field is required";
    }

    /* value is either NaN or non-positive */
    return "Must be a positive number";
}
