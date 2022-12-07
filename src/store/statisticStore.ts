import {action, makeAutoObservable, observable} from "mobx";
import {DaysOfWeek, Period} from "../utils/consts";

export class StatisticStore {
    currentPeriod: Period = Period.THIS_WEEK;
    currentDayOfWeek: DaysOfWeek = DaysOfWeek.MONDAY;
    completeTime: number = 3100;
    completePomodoro: number = 1;

    constructor() {
        makeAutoObservable(this, {
            currentPeriod: observable,
            currentDayOfWeek: observable,
            completeTime: observable,
            setCompleteTime: action,
            setCurrentPeriod: action,
            setCurrentDayOfWeek: action,
        })
    }

    setCurrentPeriod(period: Period) {
        this.currentPeriod = period
    }

    setCurrentDayOfWeek(day: DaysOfWeek) {
        this.currentDayOfWeek = day
    }

    setCompleteTime() {
        this.completeTime = 10000
    }

}