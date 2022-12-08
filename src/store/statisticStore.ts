import {action, makeAutoObservable, observable} from "mobx";
import {DaysOfWeek, Period} from "../utils/consts";

function setStartTime(day: Date, date: number): Date {
    day.setDate(date);
    day.setHours(0);
    day.setMinutes(0);
    day.setSeconds(0);
    day.setMilliseconds(0);
    return day

}

function setEndTime(day: Date, date: number): Date {
    day.setDate(date);
    day.setHours(23);
    day.setMinutes(59);
    day.setSeconds(59);
    day.setMilliseconds(999);
    return day
}

export class StatisticStore {
    currentPeriod: Period = Period.THIS_WEEK;
    currentDayOfWeek: DaysOfWeek = DaysOfWeek.MONDAY;
    completeTime: number = 3100;
    completePomodoro: number = 1;
    startDay: number = 0;
    endDay: number = 0;

    constructor() {
        makeAutoObservable(this, {
            currentPeriod: observable,
            currentDayOfWeek: observable,
            completeTime: observable,
            endDay: observable,
            startDay: observable,
            setCompleteTime: action,
            setCurrentPeriod: action,
            setCurrentDayOfWeek: action,
        })
    }

    setCurrentPeriod(period: Period) {
        this.currentPeriod = period
        const currentDay = new Date()

        switch (this.currentPeriod) {
            case Period.THIS_WEEK:
                const startDay = new Date(currentDay)
                const startDayNumber = currentDay.getUTCDay() ? currentDay.getDate() - currentDay.getUTCDay() + 1 : currentDay.getDate() - 6;
                const endDayNumber = !currentDay.getUTCDay() ? currentDay.getDate() + currentDay.getUTCDay() : currentDay.getDate() + 7 - currentDay.getUTCDay();
                this.startDay = +setStartTime(startDay, startDayNumber);
                this.endDay = +setEndTime(startDay, endDayNumber);
                break
            case Period.LAST_WEEK:
                const startDayLast = new Date(currentDay.setDate(currentDay.getDate() - 7))
                const startDayNumberLast = currentDay.getUTCDay() ? currentDay.getDate() - currentDay.getUTCDay() + 1 : currentDay.getDate() - 6;
                const endDayNumberLast = !currentDay.getUTCDay() ? currentDay.getDate() + currentDay.getUTCDay() : currentDay.getDate() + 7 - currentDay.getUTCDay();
                this.startDay = +setStartTime(startDayLast, startDayNumberLast);
                this.endDay = +setEndTime(startDayLast, endDayNumberLast);
                break
            case Period.TWO_WEEK_AGO:
                const startDayTwoWeek = new Date(currentDay.setDate(currentDay.getDate() - 14))
                const startDayNumberTwoWeek = currentDay.getUTCDay() ? currentDay.getDate() - currentDay.getUTCDay() + 1 : currentDay.getDate() - 6;
                const endDayNumberTwoWeek = !currentDay.getUTCDay() ? currentDay.getDate() + currentDay.getUTCDay() : currentDay.getDate() + 7 - currentDay.getUTCDay();
                this.startDay = +setStartTime(startDayTwoWeek, startDayNumberTwoWeek);
                this.endDay = +setEndTime(startDayTwoWeek, endDayNumberTwoWeek);
                break
        }
    }

    setCurrentDayOfWeek(day: DaysOfWeek) {
        const dayOfWeek = day ? day : 7;
        this.currentDayOfWeek = dayOfWeek;
        const currentDay = new Date(this.startDay)
        const currentDayStart = setStartTime(currentDay, 0)
        const currentDayEnd = setEndTime(currentDay, 0)
        console.log("currentDayStart=", currentDayStart, ", currentDayEnd=", currentDayEnd)

    }

    setCompleteTime() {
        this.completeTime = 10000
    }

}