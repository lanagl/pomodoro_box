import React from 'react';
import styles from './statisticwidgets.module.css';
import {Chart} from "./Chart";
import {BottomWidget} from "./Focus";
import {SummaryDay} from "./SummaryDay";
import {SummaryPomodoro} from "./SummaryPomodoro";
import {ReactComponent as Focus} from "../../../images/focus.svg";
import {ReactComponent as Clock} from "../../../images/clock.svg";
import {ReactComponent as AlarmClock} from "../../../images/alarm-clock.svg";


export function StatisticWidgets() {
    return (
        <div className={styles.container}>
            <Chart/>
            <SummaryDay/>
            <SummaryPomodoro/>
            <div className={styles.bottomWidgets}>
                <BottomWidget title="Фокус" icon={<Focus/>} text="35%" className={styles.focus}/>
                <BottomWidget title="Время на паузе" icon={<Clock/>} text="9м" className={styles.paused}/>
                <BottomWidget title="Остановки" icon={<AlarmClock/>} text="3" className={styles.stopped}/>
            </div>

        </div>
    );
}