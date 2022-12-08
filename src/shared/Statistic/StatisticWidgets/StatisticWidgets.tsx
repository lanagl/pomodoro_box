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
                <BottomWidget title="Фокус" icon={<Focus/>} value={35} unit={"%"} className={styles.focus}/>
                <BottomWidget title="Время на паузе" icon={<Clock/>} value={9} unit={"м"} className={styles.paused}/>
                <BottomWidget title="Остановки" icon={<AlarmClock/>} value={3} className={styles.stopped}/>
            </div>

        </div>
    );
}