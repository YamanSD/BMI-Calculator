import React from "react";
import styles from "./AnimatedButton.module.css";

type Properties = {
    label: string,
    onClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any,

};

const AnimatedButton = ({}: Properties) => {
    return (
        <button className={styles.btn} onClick={(e) => {
        }
        }>
            HOVER ME, THEN CLICK ME!
        </button>
    );
};

export default AnimatedButton;
