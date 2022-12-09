import React from 'react';
import styles from './statistic.module.css';
import {StatisticBar} from "./StatisticBar";
import {StatisticWidgets} from "./StatisticWidgets";

export const Statistic = (() => {
    return (
        <div className={styles.statistic}>
            <StatisticBar/>
            <StatisticWidgets/>
        </div>
    );
})