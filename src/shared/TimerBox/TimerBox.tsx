import React, {useEffect, useState} from 'react';
import styles from './timerbox.module.css';
import {Button} from "../Button";
import {EColor} from "../../utils/consts";
import {useStores} from "../../store/use-stores";
import {observer} from "mobx-react-lite";

export const TimerBox = observer(() => {
    const {taskListStore, settingsStore} = useStores()
    const [currentItem, setCurrentItem] = useState<ITaskItem | null>(null);
    const [pomodoro, setPomodoro] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);
    const [time, setTime] = useState<number>(settingsStore.pomodoroTime);
    const [pause, setPause] = useState<number>(0);
    const [started, setStarted] = useState(false);
    const [pausedTime, setPausedTime] = useState(0);


    useEffect(() => {
        setCurrentItem(taskListStore.currentItem)
        setPomodoro(1)
        setTime(settingsStore.pomodoroTime)

        setMinutes(Math.floor((settingsStore.pomodoroTime / 1000 / 60) % 60));
        setSeconds(Math.floor((settingsStore.pomodoroTime / 1000) % 60));
        setStarted(false)
    }, [settingsStore.pomodoroTime, taskListStore.currentItem]);


    function handleStartTimer() {
        if (currentItem) {
            if (!currentItem.started) {
                taskListStore.setStarted(currentItem.id)
                setStarted(true)
            } else if (!currentItem.paused) {
                taskListStore.setPaused(currentItem.id)
                setPausedTime(Date.now)
                setStarted(false)
            } else {
                const pauseTime = Date.now() - pausedTime;
                taskListStore.setResume(currentItem.id, pauseTime)
                setStarted(true)
            }
        }
    }

    function handleFinish() {
        if (currentItem) {
            taskListStore.setFinished(currentItem.id, settingsStore.pomodoroTime * currentItem.count - time - ((pomodoro - 1) * settingsStore.pomodoroTime))
        }

    }

    React.useEffect(() => {
        let interval: NodeJS.Timer;
        let timer: NodeJS.Timer;
        if (started && currentItem) {
            timer = setTimeout(() => {
                clearInterval(interval);
                setPause(settingsStore.pausedTime);
                setStarted(false);
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
    }, [currentItem, started, time]);

    React.useEffect(() => {
        let interval: NodeJS.Timer;
        let timer: NodeJS.Timer;

        if (started && currentItem) {
            timer = setTimeout(() => {
                clearInterval(interval)
            }, pause + 1000);
            interval = setInterval(() => {
                setPause(pause - 1000);
            }, 1000);
        }

        return () => {
            clearInterval(interval)
            clearTimeout(timer)
        };
    }, [currentItem, started, pause]);

    React.useEffect(() => {
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    }, [time]);

    React.useEffect(() => {
        setMinutes(Math.floor((pause / 1000 / 60) % 60));
        setSeconds(Math.floor((pause / 1000) % 60));
    }, [pause]);


    return (
        <div className={styles.timerBox}>
            <div className={styles.timerTitle}>
                <div>{currentItem?.description}</div>
                <div>Помидор {pomodoro}</div>
            </div>
            <div className={styles.timerContent}>
                <div className={styles.timer}>
                    {minutes}:{seconds < 10 ? "0" + seconds : seconds}
                </div>
                <div className={styles.taskDesc}>
                    <span className={styles.taskNum}>Задача {pomodoro} - </span>
                    <span>{currentItem?.description} </span>
                </div>
                <div className={styles.buttonGroup}>
                    <Button color={EColor.green}
                            onClick={handleStartTimer}>{currentItem?.started ? currentItem.paused ? "Продолжить" : "Пауза" : "Старт"}</Button>
                    <Button color={EColor.red} transparent={true}
                            disabled={!currentItem?.started} onClick={handleFinish}>{currentItem?.started ?
                        currentItem.paused ? "Сделано" : "Стоп" : "Стоп"}</Button>
                </div>
            </div>
        </div>
    );
})