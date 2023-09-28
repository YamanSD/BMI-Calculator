import React from "react";
import styles from "./AnimatedButton.module.css";

type Properties = {
    title?: string,
    onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any,
    className?: string
};

/**
 * Custom animated button component.
 *
 * @param title text displayed in the button.
 *        Default is an empty string.
 * @param onClick callback function when the button is pressed.
 *        Default does nothing.
 * @param className used for additional styling.
 * @constructor
 */
const AnimatedButton = ({ title, onClick, className }: Properties) => {
    return (
        <button className={`${styles.btn} ${className}`}
                onClick={onClick}>
            {title}
        </button>
    );
};

export default AnimatedButton;
