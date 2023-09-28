import React, {useState} from "react";
import styles from "./HomeScreen.module.css";
import {AnimatedButton, NumericInput} from "../../components";
import {generateNumericInputErr, isPositive} from "../../services";

/**
 * Home screen for the BMI calculator site.
 * @constructor
 */
const HomeScreen = () => {
    /* state for the weight of the user, in kilograms */
    const [weight, setWeight] = useState<string>("");

    /* state for the height of the user, in meters */
    const [height, setHeight] = useState<string>("");

    /**
     * Clears the height and weight fields.
     */
    const onClickClear = () => {
        setWeight('');
        setHeight('');
    }

    return (
        <div className={styles.screen}>
            <div className={styles.app__bar}>
                <h2 className={styles.bar__title}>
                    BMI.net
                </h2>
            </div>
            <div className={styles.surface}>
                <div className={styles.input__container}>
                     <NumericInput value={weight}
                                  setValue={setWeight}
                                  isValid={isPositive}
                                  label={"Weight"}
                                  unit={"kg"}
                                  generateErrorMsg={generateNumericInputErr}
                                  className={styles.input__field}
                    />

                    <NumericInput value={height}
                                  setValue={setHeight}
                                  isValid={isPositive}
                                  label={"Height"}
                                  unit={"m"}
                                  generateErrorMsg={generateNumericInputErr}
                                  className={styles.input__field}
                    />
                </div>

                <div className={styles.button__container}>
                    <AnimatedButton title={"Clear"}
                                    onClick={onClickClear}
                    />
                    <AnimatedButton title={"Calculate"}

                    />
                </div>
           </div>
        </div>
    );
};

export default HomeScreen;
