import React, {useState} from "react";
import styles from "./HomeScreen.module.css";
import {AnimatedButton, NumericInput} from "../../components";
import {
    BmiLevel,
    calculateBmi,
    calculateBmiLevel,
    formatValue,
    generateNumericInputErr,
    isPositive
} from "../../services";
import "./ProgressBar.css";

/**
 * Home screen for the BMI calculator site.
 * @constructor
 */
const HomeScreen = () => {
    /* state for the weight of the user, in kilograms */
    const [weight, setWeight] = useState<string>("");

    /* state for the height of the user, in meters */
    const [height, setHeight] = useState<string>("");

    /*
     * state for the current value of BMI.
     * Undefined indicates not calculated before.
     * NaN indicates the give parameters are invalid.
     * A non-positive value is automatically transformed to NaN.
     */
    const [bmi, setBmi] = useState<number | undefined>(undefined);

    /**
     * Clears the height and weight fields.
     */
    const onClickClear = () => {
        setWeight('');
        setHeight('');
    }

    /**
     * Calculates the new BMI based on the height and width.
     */
    const onClickCalculate = () => {
        setBmi(calculateBmi(Number(weight), Number(height)));
    }

    /**
     * @param bmi state variable representing user BMI
     * @returns the suitable color for the BMI based on its range.
     */
    const getLevelColor = (bmi: number) => {
        switch (calculateBmiLevel(bmi)) {
            case BmiLevel.underweight:
                return "#ff9900";
            case BmiLevel.healthy:
                return "#007570";
            case BmiLevel.overweight:
                return "#ff0000";
            case BmiLevel.obese:
                return "#800000";
        }
    }

    /**
     * @param bmi state variable representing user BMI.
     * @returns the category of the calculated BMI, as a string.
     */
    const getLevelMessage = (bmi: number) => {
        switch (calculateBmiLevel(bmi)) {
            case BmiLevel.underweight:
                return "Underweight";
            case BmiLevel.healthy:
                return "Healthy";
            case BmiLevel.overweight:
                return "Overweight";
            case BmiLevel.obese:
                return "Obese";
        }
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
                                    onClick={onClickCalculate}
                    />
                </div>

                {/* BMI information */}
                {
                    bmi !== undefined ? (
                        <div className={styles.bmi__container}>
                            {
                                !isNaN(bmi) ? (
                                    <>
                                        <div
                                        role="progressbar"
                                        aria-valuenow={bmi}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        style={{
                                            '--value': 2 * bmi,
                                            '--color': getLevelColor(bmi)
                                        } as any}
                                    ></div>
                                    <text className={styles.bmi__value}
                                          style={{
                                              '--bmi-label-color': getLevelColor(bmi)
                                          } as any}>
                                        BMI = {
                                            formatValue(bmi)
                                        }
                                    </text>
                                    <br/>
                                    <text className={styles.bmi__value}
                                          style={{
                                              '--bmi-label-color': getLevelColor(bmi)
                                          } as any}>
                                        ({getLevelMessage(bmi)})
                                    </text>
                                </>
                            ) : (
                                <text className={styles.bmi__value}
                                      style={{
                                          '--bmi-label-color': "#800000"
                                      } as any}
                                >
                                    Invalid input
                                </text>
                            )
                            }
                        </div>
                    ) : null
                }
           </div>
        </div>
    );
};

export default HomeScreen;
