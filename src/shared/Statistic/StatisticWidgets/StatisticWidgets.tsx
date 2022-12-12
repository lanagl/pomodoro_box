import React, {useEffect, useState} from 'react';
import styles from './statisticwidgets.module.css';
import {Chart} from "./Chart";
import {SummaryDay} from "./SummaryDay";
import {SummaryPomodoro} from "./SummaryPomodoro";
import {ReactComponent as Focus} from "../../../images/focus.svg";
import {ReactComponent as Clock} from "../../../images/clock.svg";
import {ReactComponent as AlarmClock} from "../../../images/alarm-clock.svg";
import {observer} from "mobx-react-lite";
import {useStores} from "../../../store/use-stores";
import {BottomWidget} from "./BottomWidget";
import {ITaskItem} from "../../../../types/TaskItem";


export const StatisticWidgets = observer(() => {
    const {statisticStore} = useStores()
    const [paused, setPaused] = useState(0);
    const [focus, setFocus] = useState(0);
    const [stopped, setStopped] = useState(0);
    const [completePomodoro, setCompletePomodoro] = useState(0);
    const [completeTime, setCompleteTime] = useState(0);
    const [pausedUnit, setPausedUnit] = useState("");


    useEffect(() => {
        const paused = statisticStore.statisticDayList.reduce((acc: number, item: ITaskItem) => acc + item.pauseTime, 0)
        const pausedSec = Math.round(paused / 1000)
        if (pausedSec > 60) {
            setPausedUnit("м");
            setPaused(Math.round(pausedSec / 60));
        } else {
            setPausedUnit("с");
            setPaused(Math.round(pausedSec));
        }


        const stopped = statisticStore.statisticDayList.reduce((acc: number, item: ITaskItem) => acc + item.pauseCount, 0)
        setStopped(stopped)

        const completePomodoroCount = statisticStore.statisticDayList.reduce((acc: number, item: ITaskItem) => acc + item.finishedPomodoro, 0)
        setCompletePomodoro(completePomodoroCount)
        const completeTimeTask = statisticStore.statisticDayList.reduce((acc: number, item: ITaskItem) => acc + item.completedTime, 0)
        setCompleteTime(completeTimeTask / 1000)
        setFocus(Math.round(completeTimeTask * 100 / (completeTimeTask + paused)) || 0)
    }, [statisticStore.statisticDayList]);
    return (
        <div className={styles.container}>
            <Chart/>
            <SummaryDay completeTime={completeTime} currentDay={statisticStore.currentDayOfWeek}/>
            <SummaryPomodoro completePomodoro={completePomodoro}/>
            <div className={styles.bottomWidgets}>
                <BottomWidget title="Фокус" icon={<Focus/>} value={focus} unit={"%"} className={styles.focus}/>
                <BottomWidget title="Время на паузе" icon={<Clock/>} value={paused} unit={pausedUnit}
                              className={styles.paused}/>
                <BottomWidget title="Остановки" icon={<AlarmClock/>} value={stopped} className={styles.stopped}/>
            </div>

        </div>
    );
})