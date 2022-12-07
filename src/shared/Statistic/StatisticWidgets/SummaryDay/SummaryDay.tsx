import React from 'react';
import styles from './summaryday.module.css';
import {useStores} from "../../../../store/use-stores";
import {calcTime} from "../../../../utils/calcWordToTime";
import {observer} from "mobx-react-lite";

export const SummaryDay = observer(() => {
    const {statisticStore} = useStores()
    return (
        <div className={styles.summary}>
            <div className={styles.labelOfDay}>
                Суббота
            </div>
            <div className={styles.description}>
                {statisticStore.completeTime ?
                    <span>Вы работали над задачами в течение <span
                        className={styles.time}> {calcTime(statisticStore.completeTime)}</span></span>
                    : "Нет данных"}
            </div>
        </div>
    );
})