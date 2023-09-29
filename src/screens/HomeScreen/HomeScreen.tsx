import React, {useState} from "react";
import styles from "./HomeScreen.module.css";
import {AnimatedButton, NumericInput, ProgressBar} from "../../components";
import {
    BmiLevel,
    calculateBmi,
    calculateBmiLevel,
    formatValue,
    generateNumericInputErr,
    isPositive
} from "../../services";

/**
 * Home screen for the BMI calculator site.
 * @constructor
 */
const HomeScreen = () => {
    /* list of colors each corresponding to a BMI level */
    const colorsList = [
        "#ff9900", // Underweight
        "#007570", // Healthy
        "#ff0000", // Overweight
        "#800000" // Obese
    ];

    /* maximum BMI for a user that can be visualized */
    const maxBmi = 50;

    /* list of upperbounds for each BMI level */
    const upperBounds = [
        BmiLevel.underweight,
        BmiLevel.healthy - BmiLevel.underweight,
        BmiLevel.overweight - BmiLevel.healthy,
        maxBmi - BmiLevel.overweight, // BmiLevel.obese
    ];

    /* list of categories for each BMI level */
    const bmiCategories = [
        "Underweight",
        "Healthy",
        "Overweight",
        "Obese"
    ];

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
        setBmi(calculateBmi(Number(weight), Number(height) / 100));
    }

    /**
     * @param bmi state variable representing user BMI
     * @returns the suitable color for the BMI based on its range.
     */
    const getLevelColor = (bmi: number) => {
        switch (calculateBmiLevel(bmi)) {
            case BmiLevel.underweight:
                return colorsList[0];
            case BmiLevel.healthy:
                return colorsList[1];
            case BmiLevel.overweight:
                return colorsList[2];
            case BmiLevel.obese:
                return colorsList[3];
        }
    }

    /**
     * @param bmi state variable representing user BMI.
     * @returns the category of the calculated BMI, as a string.
     */
    const getLevelCategory = (bmi: number) => {
        switch (calculateBmiLevel(bmi)) {
            case BmiLevel.underweight:
                return bmiCategories[0];
            case BmiLevel.healthy:
                return bmiCategories[1];
            case BmiLevel.overweight:
                return bmiCategories[2];
            case BmiLevel.obese:
                return bmiCategories[3];
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
                                  unit={"cm"}
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
                                <div className={styles.surface__2}>
                                    {/* input good to go */}
                                    <ProgressBar progress={bmi}
                                                 maxProgress={maxBmi}
                                                 upperBounds={upperBounds}
                                                 colors={colorsList}
                                                 labels={bmiCategories}
                                    />
                                    <label className={styles.bmi__value}
                                          style={{
                                              '--bmi-label-color': "black"
                                          } as any}>
                                        BMI = {
                                            formatValue(bmi)
                                        }
                                    </label>
                                    <label className={styles.bmi__value}
                                          style={{
                                              '--bmi-label-color': getLevelColor(bmi)
                                          } as any}>
                                        ({getLevelCategory(bmi)})
                                    </label>
                                </div>
                            ) : (
                                <label className={styles.bmi__value}
                                      style={{
                                          '--bmi-label-color': "#800000"
                                      } as any}
                                >
                                    {/* user provided invalid input */}
                                    Invalid input
                                </label>
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
