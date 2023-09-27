import React, {useState} from "react";
import styles from "./NumericInput.module.css";

/**
 * Prop-type for the NumericInput component.
 *
 * Documentation in component JS-Doc.
 */
type Properties = {
    value: string,
    setValue: (value: string) => void,
    label: string,
    unit: string,
    generateErrorMsg?: (value: string) => string,
    isValid?: (value: string) => boolean,
    className?: string
}

/**
 * Custom input component that accepts numbers only.
 *
 * @param className passed to the component main container.
 * @param isValid takes the value, returns true if it is valid.
 *        Default does not check input.
 * @param label placeholder; displayed above the input field on selection.
 *        Returns to its place on blur, iff the user provided no input.
 * @param unit displayed at the end of the input field.
 *        Indicates the unit of the input value.
 *        Default is an empty string.
 * @param generateErrorMsg takes an invalid value, returns an error message to the
 *        user based on it.
 *        This function is called iff the isValid test fails.
 *        Default generates an Invalid value message.
 * @param value to pass the state to the parent component.
 * @param setValue state setter, modifies value.
 * @constructor
 */
const NumericInput = ({ label, unit, className,
                          value, setValue, isValid,
                            generateErrorMsg }: Properties) => {
    /* state of the current error.
     * Empty indicates no error.
     */
    const [error, setError] = useState<string>("");

    /* set the default value for the generateErrorMsg */
    if (generateErrorMsg === undefined) {
        generateErrorMsg = (ignored: string) => "Invalid value";
    }

    return (
        <div className={styles.main__container}>
            <div className={`${styles.form__container} ${className}`}>
                {/* input field */}
                <input type={"number"}
                       value={value}
                       onChange={(event) => {
                           /* taken from user */
                           const newValue = event.target.value;

                           setValue(newValue);

                           if (!isValid || isValid(newValue)) {
                               if (error.length !== 0) {
                                   setError("");
                               }
                           } else {
                               if (generateErrorMsg) { // unnecessary check, used to suppress IDE
                                   setError(generateErrorMsg(value));
                               }
                           }
                       }}
                       id={"inputField"}
                       className={styles.form__field}
                       placeholder={label} />

                {/* animated label */}
                <label className={styles.form__label}>
                    {label}
                </label>

                {/* unit label */}
                <label className={styles.unit__label}>
                    {unit}
                </label>
            </div>

            {/* error label */}
            {error.length !== 0 ?
                <div className={styles.error__container}>
                    <label className={styles.form__error}>
                        {error}
                    </label>
                </div>
                : null
            }
        </div>
    );
};

export default NumericInput;
