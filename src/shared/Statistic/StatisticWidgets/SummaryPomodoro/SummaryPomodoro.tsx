import React from 'react';
import styles from './summarypomodoro.module.css';
import {ReactComponent as Pomodoro} from "../../../../images/pomodoro.svg";
import {ReactComponent as BigTomato} from "../../../../images/bigTomato.svg";

interface ISummaryPomodoroProps {
    completePomodoro: number
}

export const SummaryPomodoro = (({completePomodoro}: ISummaryPomodoroProps) => {
    return (
        <div className={styles.summary}>
            {completePomodoro ?
                <span className={styles.pomodoro}>
                    <Pomodoro width={76} height={72}/> x{completePomodoro}
                </span>
                : <span className={styles.pomodoro}>
                    <BigTomato width={108} height={102}/>
                </span>
            }
            {!!completePomodoro &&
				<div className={styles.description}>
                    {completePomodoro} помидора
				</div>
            }
        </div>
    );
})