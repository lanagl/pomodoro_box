import {action, makeAutoObservable, observable} from "mobx";
import {DaysOfWeek, Period} from "../utils/consts";
import {makeArrayToChart} from "../utils/makeArrayToChart";
import {ITaskItem} from "../../types/TaskItem";


export function setStartTime(day: Date, date: number): Date {
    day.setDate(date);
    day.setHours(0);
    day.setMinutes(0);
    day.setSeconds(0);
    day.setMilliseconds(0);
    return day

}

export function setEndTime(day: Date, date: number): Date {
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
    startDay: number = 0;
    endDay: number = 0;
    statisticWeekList: Array<number> = []
    statisticDayList: Array<ITaskItem> = []
    taskListStore: any

    constructor(taskList: any) {
        this.taskListStore = taskList
        makeAutoObservable(this, {
            currentPeriod: observable,
            currentDayOfWeek: observable,
            statisticDayList: observable,
            statisticWeekList: observable,
            endDay: observable,
            startDay: observable,
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
                this.statisticWeekList = makeArrayToChart(this.taskListStore.finishedList, this.startDay)
                this.statisticDayList = []
                this.currentDayOfWeek = DaysOfWeek.MONDAY;
                break
            case Period.LAST_WEEK:
                const startDayLast = new Date(currentDay.setDate(currentDay.getDate() - 7))
                const startDayNumberLast = currentDay.getUTCDay() ? currentDay.getDate() - currentDay.getUTCDay() + 1 : currentDay.getDate() - 6;
                const endDayNumberLast = !currentDay.getUTCDay() ? currentDay.getDate() + currentDay.getUTCDay() : currentDay.getDate() + 7 - currentDay.getUTCDay();
                this.startDay = +setStartTime(startDayLast, startDayNumberLast);
                this.endDay = +setEndTime(startDayLast, endDayNumberLast);
                this.statisticWeekList = makeArrayToChart(this.taskListStore.finishedList, this.startDay)
                this.statisticDayList = [];
                this.currentDayOfWeek = DaysOfWeek.MONDAY;
                break
            case Period.TWO_WEEK_AGO:
                const startDayTwoWeek = new Date(currentDay.setDate(currentDay.getDate() - 14))
                const startDayNumberTwoWeek = currentDay.getUTCDay() ? currentDay.getDate() - currentDay.getUTCDay() + 1 : currentDay.getDate() - 6;
                const endDayNumberTwoWeek = !currentDay.getUTCDay() ? currentDay.getDate() + currentDay.getUTCDay() : currentDay.getDate() + 7 - currentDay.getUTCDay();
                this.startDay = +setStartTime(startDayTwoWeek, startDayNumberTwoWeek);
                this.endDay = +setEndTime(startDayTwoWeek, endDayNumberTwoWeek);
                this.statisticWeekList = makeArrayToChart(this.taskListStore.finishedList, this.startDay)
                this.statisticDayList = [];
                this.currentDayOfWeek = DaysOfWeek.MONDAY;
                break
        }
    }

    setCurrentDayOfWeek(day: DaysOfWeek) {
        const dayOfWeek = day;
        this.currentDayOfWeek = dayOfWeek;
        const currentDay = new Date(this.startDay)
        const currentDayStart = +setStartTime(new Date(currentDay), currentDay.getDate() + dayOfWeek)
        const currentDayEnd = +setEndTime(new Date(currentDay), currentDay.getDate() + dayOfWeek)
        const statisticDayList = this.taskListStore.finishedList.filter((item: ITaskItem) => item.startDate >= currentDayStart && item.startDate <= currentDayEnd)
        this.statisticDayList = statisticDayList
    }


}