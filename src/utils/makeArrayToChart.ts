import {setEndTime, setStartTime} from "../store/statisticStore";

export function makeArrayToChart(array: Array<ITaskItem>, startDateTime: number): Array<number> {
    const newArray: Array<number> = [];
    for (let i = 0; i < 7; i++) {
        const startDate = new Date(startDateTime)
        const startTime = setStartTime(new Date(startDateTime), startDate.getDate() + i)
        const endTime = setEndTime(new Date(startDateTime), startDate.getDate() + i)
        newArray.push(array.filter((item) => item.startDate > +startTime && item.startDate < +endTime).reduce((acc: number, itemReduce) => {
            return acc + itemReduce.completedTime / (60 * 1000)
        }, 0))
    }
    return newArray;
}