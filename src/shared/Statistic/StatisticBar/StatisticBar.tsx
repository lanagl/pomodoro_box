import React, {ChangeEvent} from 'react';
import styles from './statisticbar.module.css';
import {useStores} from "../../../store/use-stores";
import {Period} from "../../../utils/consts";
import {observer} from "mobx-react-lite";


export const StatisticBar = observer(() => {
    const {statisticStore} = useStores()


    function handlePeriodChange(event: ChangeEvent<HTMLSelectElement>) {
        statisticStore.setCurrentPeriod(event.target.value as Period)
    }

    return (
        <div className={styles.statisticBar}>
            <div className={styles.title}>
                Ваша активность
            </div>
            <select className={styles.select} name="currentPeriod" onChange={handlePeriodChange}>
                <option value={Period.THIS_WEEK}>Эта неделя</option>
                <option value={Period.LAST_WEEK}>Прошедшая неделя</option>
                <option value={Period.TWO_WEEK_AGO}>2 недели назад</option>
            </select>
        </div>
    );
})