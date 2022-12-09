import React from 'react';
import styles from './summaryday.module.css';
import {calcTime} from "../../../../utils/calcWordToTime";
import {DaysOfWeek} from "../../../../utils/consts";

interface ISummaryDayProps {
    completeTime: number;
    currentDay: DaysOfWeek;
}

export const SummaryDay = (({completeTime, currentDay}: ISummaryDayProps) => {
    let dayOfWeek = ""
    switch (currentDay) {
        case DaysOfWeek.MONDAY:
            dayOfWeek = "Понедельник"
            break
        case DaysOfWeek.TUESDAY:
            dayOfWeek = "Вторник"
            break
        case DaysOfWeek.WEDNESDAY:
            dayOfWeek = "Среда"
            break
        case DaysOfWeek.THURSDAY:
            dayOfWeek = "Четверг"
            break
        case DaysOfWeek.FRIDAY:
            dayOfWeek = "Пятница"
            break
        case DaysOfWeek.SATURDAY:
            dayOfWeek = "Суббота"
            break
        case DaysOfWeek.SUNDAY:
            dayOfWeek = "Воскресенье"
            break
    }

    return (
        <div className={styles.summary}>
            <div className={styles.labelOfDay}>
                {dayOfWeek}
            </div>
            <div className={styles.description}>
                {completeTime ?
                    <span>Вы работали над задачами в течение <span
                        className={styles.time}> {calcTime(completeTime)}</span></span>
                    : "Нет данных"}
            </div>
        </div>
    );
})