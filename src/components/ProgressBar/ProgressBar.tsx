import React, {useEffect, useState} from "react";
import styles from "./ProgressBar.module.css";

/**
 * Prop-type for the ProgressBar component.
 */
type Properties = {
    progress: number,
    maxProgress: number,
    upperBounds: number[],
    colors: string[],
    labels: string[]
};

/**
 * @param progress percentage value in [0, 100] for the position
 *        of the indicator.
 * @param upperBounds describing where each color ends.
 * @param maxProgress maximum value of the progress value.
 * @param colors list of four colors of the segments.
 *        If more than four colors are given, they are ignored.
 * @param labels list of four labels for each color.
 *        If more than four labels are given, they are ignored.
 * @constructor
 */
const ProgressBar = ({ progress, colors, labels,
                         maxProgress, upperBounds }: Properties) => {
    /* used to cover the entire bar */
    const fillPercent = 5;

    /* min position for the indicator */
    const minPosition = 1.2;

    /* max position for the indicator */
    const maxPosition = 50;

    /* state variable for the indicator position */
    const [position, setPosition] = useState(Math.max(progress, minPosition));

    /* when the progress is modified, modify the position of the indicator */
    useEffect(() => {
        setPosition(
            Math.max(
                Math.min(
                    progress,
                    maxPosition
                ),
                minPosition
            )
        );
    }, [progress, maxProgress]);

    return (
        <>
            <div className={styles.indicator}
                 style={{
                     "--indicator-position": `${(2 * position) * 0.95}%`
                 } as any}
            >
            </div>
            <div className={styles.progress__bar}>
                {
                    colors.map((color, index) => {
                        return (
                            <div className={
                                    styles.progress__segment
                                        + " "
                                        + (
                                            index === 0 ?
                                            styles.left__bar : (
                                                index === colors.length - 1
                                                    ? styles.right__bar
                                                    : ""
                                            )
                                        )
                                }
                                 key={index}
                                 style={{
                                     width: `${upperBounds[index] * 2 + fillPercent}%`,
                                     backgroundColor: color
                                 }}
                            >
                                <label className={styles.category}>
                                    {
                                        labels[index]
                                    }
                                </label>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
};

export default ProgressBar;
