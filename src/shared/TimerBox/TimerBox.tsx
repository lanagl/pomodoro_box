import React, {useEffect, useState} from 'react';
import styles from './timerbox.module.css';
import {Button} from "../Button";
import {EColor} from "../../utils/consts";
import {useStores} from "../../store/use-stores";
import {observer} from "mobx-react-lite";
import {ButtonGroup} from "./ButtonGroup";
import {ITaskItem} from "../../../types/TaskItem";

function minuteFromMSeconds(time: number): number {
    return Math.floor((time / 1000 / 60) % 60);
}

function secondsFromMSeconds(time: number): string {
    const seconds = Math.floor((time / 1000) % 60)
    return seconds < 10 ? "0" + seconds : seconds.toString();
}

export const TimerBox = observer(() => {
    const {taskListStore, settingsStore} = useStores()
    const [currentItem, setCurrentItem] = useState<ITaskItem | null>(null);
    const [pomodoro, setPomodoro] = useState<number>(0);
    const [task, setTask] = useState<number>(0);
    const [time, setTime] = useState<number>(settingsStore.pomodoroTime);
    const [rest, setRest] = useState<number>(0);
    const [pausedTime, setPausedTime] = useState(0);
    const [finishedTime, setFinishedTime] = useState(0);
    const [isRest, setIsRest] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [pomodoroCountFinish, setPomodoroCountFinish] = useState(0);


    /**
     * Нажатие на кнопку Пауза
     */
    function handlePausedTimer() {

        setIsPaused(true)
        if (currentItem) {
            if (!currentItem.paused) {
                taskListStore.setPaused(currentItem.id)
                setPausedTime(Date.now)
            }
        }

    }


    /**
     * Установка времени для таймера помидора
     */
    useEffect(() => {
        setCurrentItem(taskListStore.currentItem)
        setPomodoro(1)
        setTime(settingsStore.pomodoroTime)
    }, [settingsStore.pomodoroTime, taskListStore.currentItem]);


    /**
     * Нажатие на кнопку Старт/Продолжить
     */
    function handleStartTimer() {
        if (isPaused) {
            setIsPaused(false)
        }
        if (!isStarted) {
            setIsStarted(true)

        }

        if (currentItem && !currentItem.started) {
            taskListStore.setStarted(currentItem.id)
        } else if (currentItem && currentItem.paused) {
            const pauseTime = Date.now() - pausedTime;
            taskListStore.setResume(currentItem.id, pauseTime)
        }
    }

    /**
     * Завершение задачи
     */

    function handleFinish() {
        setIsStarted(false)
        setIsRest(true)
        setTask(task + 1)
        setPomodoroCountFinish(pomodoroCountFinish + 1)
        if (currentItem) {
            taskListStore.setFinished(currentItem.id, finishedTime, pomodoro)
        }
    }

    /**
     * Установка таймера для помидора.
     */

    React.useEffect(() => {
        let interval: NodeJS.Timer;
        let timer: NodeJS.Timer;
        if (isStarted && !isRest && currentItem && !isPaused) {
            timer = setTimeout(() => {
                clearInterval(interval);

                if (pomodoro < currentItem.count) {
                    taskListStore.setComplete(currentItem.id)
                    setIsStarted(false)
                    setIsRest(true)
                    setPomodoro(pomodoro + 1);
                    setPomodoroCountFinish(pomodoroCountFinish + 1);
                }
            }, time + 1000);
            interval = setInterval(() => {
                setTime(time - 1000);
                setFinishedTime(finishedTime + 1000)
            }, 1000);
        }

        return () => {
            clearInterval(interval)
            clearTimeout(timer)
        };
    }, [taskListStore, currentItem, time, isPaused, pomodoro, pomodoroCountFinish, settingsStore.pausedTime, isRest, isStarted]);

    /**
     * Установка таймера отдыха
     */
    React.useEffect(() => {
        let interval: NodeJS.Timer;
        let timer: NodeJS.Timer;

        if (isStarted && isRest && currentItem && !isPaused) {
            timer = setTimeout(() => {
                clearInterval(interval)
                setIsStarted(false)
                setIsRest(false)
                setTime(settingsStore.pomodoroTime)
            }, rest + 1000);
            interval = setInterval(() => {
                setRest(rest - 1000);
            }, 1000);
        }

        return () => {
            clearInterval(interval)
            clearTimeout(timer)
        };
    }, [currentItem, rest, isRest, isStarted, isPaused]);


    /**
     * Установка времени для таймера отдыха
     */
    useEffect(() => {
        if (isRest) {
            const restTimeTmp = ((pomodoroCountFinish + 1) % 4 === 0) ? settingsStore.largePauseTime : settingsStore.pausedTime;
            setRest(restTimeTmp);
        }

    }, [isRest, pomodoroCountFinish, settingsStore.largePauseTime, settingsStore.pausedTime]);


    /**
     * Добавление времени
     */
    function handleAddTime() {
        setTime(time + 60 * 1000)
    }

    /**
     * Остановка перерыва
     */
    function handleStopRest() {
        setIsRest(false)
        setIsStarted(false)
        setTime(settingsStore.pomodoroTime)
    }

    /**
     * Старт таймера перерыва
     */
    function handleStartRestTimer() {
        if (!isStarted) {
            setIsStarted(true)
        } else if (!isPaused) {
            setIsPaused(true)
        } else {
            setIsPaused(false)
        }
    }

    return (
        <div className={styles.timerBox}>
            <div className={styles.timerTitle}>
                <div>{currentItem?.description}</div>
                <div>Помидор {pomodoro}</div>
            </div>
            <div className={styles.timerContent}>
                <div className={styles.timer}>
                    <div>{isRest ? minuteFromMSeconds(rest) : minuteFromMSeconds(time)}:{isRest ? secondsFromMSeconds(rest) : secondsFromMSeconds(time)}</div>
                    <Button color={EColor.grey} As={'button'} onClick={handleAddTime} className={styles.btnAdd}>
                        +
                    </Button>
                </div>
                <div className={styles.taskDesc}>
                    <span className={styles.taskNum}>Задача {task + 1} - </span>
                    <span>{currentItem?.description} </span>
                </div>
                <ButtonGroup onFinish={handleFinish} onStartTimer={handleStartTimer} isRest={isRest}
                             onStopRest={handleStopRest} onStartRestTimer={handleStartRestTimer}
                             onPausedTimer={handlePausedTimer} isPaused={isPaused} isStarted={isStarted}/>
            </div>
        </div>
    );
})