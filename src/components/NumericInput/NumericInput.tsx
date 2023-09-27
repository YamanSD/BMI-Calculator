import React from "react";
import styles from "./NumericInput.module.css";

/**
 * Prop-type for the NumericInput component.
 *
 * Documentation in component JS-Doc.
 */
type Properties = {
    value: string,
    setValue:  React.Dispatch<React.SetStateAction<string>>,
    label: string,
    unit: string,
    isValid?: (value: string) => boolean,
    className?: string
}

/**
 * @param className passed to the component main container.
 * @param isValid takes the value, returns true if it is valid.
 *        Default does not check input.
 * @param label placeholder; displayed above the input field on selection.
 *        Returns to its place on blur, iff the user provided no input.
 * @param unit displayed at the end of the input field.
 *        Indicates the unit of the input value.
 *        Default is an empty string.
 * @param value to pass the state to the parent component.
 * @param setValue state setter, modifies value.
 * @constructor
 */
const NumericInput = ({ label, unit, className,
                          value, setValue, isValid}: Properties) => {
    return (
        <div className={`${styles.form__container} ${className}`}>
            {/* input field */}
            <input type={"number"}
                   value={value}
                   onChange={(event) => {
                       if (!isValid || isValid(value)) {
                           setValue(event.target.value);
                       }
                   }}
                   id={"inputField"}
                   className={styles.form__field}
                   placeholder={label} />

            {/* animated label */}
            <label id={"mainLabel"}
                   className={styles.form__label}>
                {label}
            </label>

            {/* unit label */}
            <label className={styles.unit__label}>
                {unit}
            </label>
        </div>
    );
};

export default NumericInput;
