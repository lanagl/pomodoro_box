import React, {useEffect, useState} from 'react';
import styles from './timerbox.module.css';
import {Button} from "../Button";
import {EColor} from "../../utils/consts";
import {useStores} from "../../store/use-stores";
import {observer} from "mobx-react-lite";
import {ButtonGroup} from "./ButtonGroup";

export const TimerBox = observer(() => {
    const {taskListStore, settingsStore} = useStores()
    const [currentItem, setCurrentItem] = useState<ITaskItem | null>(null);
    const [pomodoro, setPomodoro] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);
    const [time, setTime] = useState<number>(settingsStore.pomodoroTime);
    const [rest, setRest] = useState<number>(0);
    const [pausedTime, setPausedTime] = useState(0);
    const [isRest, setIsRest] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isStarted, setIsStarted] = useState(false);


    function handlePausedTimer() {
        setIsPaused(true)
    }

    useEffect(() => {
        setCurrentItem(taskListStore.currentItem)
        setPomodoro(1)
        setTime(settingsStore.pomodoroTime)

        setMinutes(Math.floor((settingsStore.pomodoroTime / 1000 / 60) % 60));
        setSeconds(Math.floor((settingsStore.pomodoroTime / 1000) % 60));
    }, [settingsStore.pomodoroTime, taskListStore.currentItem]);


    function handleStartTimer() {
        if (isPaused) {
            setIsPaused(false)
        }
        if (!isStarted) {
            setIsStarted(true)
            if (currentItem) {
                if (!currentItem.started) {
                    taskListStore.setStarted(currentItem.id)
                } else if (!currentItem.paused) {
                    taskListStore.setPaused(currentItem.id)
                    setPausedTime(Date.now)
                } else {
                    const pauseTime = Date.now() - pausedTime;
                    taskListStore.setResume(currentItem.id, pauseTime)
                }
            }
        }


    }

    function handleFinish() {
        setIsStarted(false)
        if (currentItem) {
            taskListStore.setFinished(currentItem.id, settingsStore.pomodoroTime * currentItem.count - time - ((pomodoro - 1) * settingsStore.pomodoroTime))
        }

    }

    React.useEffect(() => {
        let interval: NodeJS.Timer;
        let timer: NodeJS.Timer;
        if (isStarted && !isRest && currentItem) {
            timer = setTimeout(() => {
                clearInterval(interval);
                setIsStarted(false)
                setIsRest(true)
                taskListStore.setComplete(currentItem.id)
                if (pomodoro < currentItem.count) {
                    setPomodoro(pomodoro + 1);
                }
            }, time + 1000);
            interval = setInterval(() => {
                setTime(time - 1000);
            }, 1000);
        }

        return () => {
            clearInterval(interval)
            clearTimeout(timer)
        };
    }, [taskListStore, currentItem, time, pomodoro, settingsStore.pausedTime, isRest, isStarted]);

    React.useEffect(() => {
        let interval: NodeJS.Timer;
        let timer: NodeJS.Timer;

        if (isStarted && isRest && currentItem) {
            timer = setTimeout(() => {
                clearInterval(interval)
                setIsStarted(false)
            }, rest + 1000);
            interval = setInterval(() => {
                setRest(rest - 1000);
            }, 1000);
        }

        return () => {
            clearInterval(interval)
            clearTimeout(timer)
        };
    }, [currentItem, rest, isRest, isStarted]);

    useEffect(() => {
        if (isRest) {
            setRest(settingsStore.pausedTime);
        }

    }, [isRest, settingsStore.pausedTime]);


    React.useEffect(() => {
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    }, [time]);

    React.useEffect(() => {
        setMinutes(Math.floor((rest / 1000 / 60) % 60));
        setSeconds(Math.floor((rest / 1000) % 60));
    }, [rest]);


    function handleAddTime() {
        setTime(time + 60 * 1000)
    }

    function handleStopRest() {
        setIsRest(false)
    }

    function handleStartRestTimer() {
        setIsStarted(true)
    }

    return (
        <div className={styles.timerBox}>
            <div className={styles.timerTitle}>
                <div>{currentItem?.description}</div>
                <div>Помидор {pomodoro}</div>
            </div>
            <div className={styles.timerContent}>
                <div className={styles.timer}>
                    <div>{minutes}:{seconds < 10 ? "0" + seconds : seconds}</div>
                    <Button color={EColor.grey} As={'button'} onClick={handleAddTime} className={styles.btnAdd}>
                        +
                    </Button>
                </div>
                <div className={styles.taskDesc}>
                    <span className={styles.taskNum}>Задача {pomodoro} - </span>
                    <span>{currentItem?.description} </span>
                </div>
                <ButtonGroup onFinish={handleFinish} onStartTimer={handleStartTimer} isRest={isRest}
                             onStopRest={handleStopRest} onStartRestTimer={handleStartRestTimer}
                             handlePausedTimer={handlePausedTimer}/>
            </div>
        </div>
    );
})