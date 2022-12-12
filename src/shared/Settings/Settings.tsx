import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import styles from './settings.module.css';
import {observer} from "mobx-react-lite";
import {useStores} from "../../store/use-stores";
import {Button} from "../Button";
import {EColor} from "../../utils/consts";

export const Settings = observer(() => {
    const {settingsStore} = useStores()
    const [pomodoroTime, setPomodoroTime] = useState<number>(settingsStore.pomodoroTime / 1000);
    const [pausedTime, setPausedTime] = useState<number>(settingsStore.pausedTime / 1000);
    const [largePauseTime, setLargePausedTime] = useState<number>(settingsStore.largePauseTime / 1000);

    useEffect(() => {
        setPausedTime(settingsStore.pausedTime / 1000)
    }, [settingsStore.pausedTime])

    useEffect(() => {
        setPomodoroTime(settingsStore.pomodoroTime / 1000)
    }, [settingsStore.pomodoroTime])

    useEffect(() => {
        setLargePausedTime(settingsStore.largePauseTime / 1000)
    }, [settingsStore.largePauseTime])

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        console.log("handleSubmit")
        settingsStore.setSettings(pomodoroTime * 1000, pausedTime * 1000, largePauseTime * 1000)
    }

    const handleSetPomodoroTime = (e: ChangeEvent<HTMLInputElement>) => {
        setPomodoroTime(parseInt(e.target.value))
    }

    const handleSetPausedTime = (e: ChangeEvent<HTMLInputElement>) => {
        setPausedTime(parseInt(e.target.value))
    }
    const handleSetLargePausedTime = (e: ChangeEvent<HTMLInputElement>) => {
        setLargePausedTime(parseInt(e.target.value))
    }

    return (
        <div className={styles.settings}>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>

                    <label htmlFor="pomodoroTime">Интервал помидора, сек</label>
                    <input name="pomodoroTime" value={pomodoroTime} className="inputField"
                           onChange={handleSetPomodoroTime}/>

                    <label htmlFor="pausedTime">Интервал паузы между помидорами, сек</label>
                    <input name="pausedTime" value={pausedTime} className="inputField"
                           onChange={handleSetPausedTime}/>

                    <label htmlFor="largePauseTime">Интервал паузы после 4 помидора, сек</label>
                    <input name="largePauseTime" value={largePauseTime} className="inputField"
                           onChange={handleSetLargePausedTime}/>

                    <Button color={EColor.green} As={"button"}>
                        Сохранить
                    </Button>

                </div>
            </form>
        </div>
    );
})