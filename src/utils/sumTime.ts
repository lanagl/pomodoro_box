export function getSumTime(array: Array<ITaskItem>): string {
    let sum = 0;
    const fieldArray = array.map(item => item.count);
    if (fieldArray.length > 0) {
        sum = fieldArray.reduce((accumulator, currentValue) => {
            return (accumulator + currentValue);
        })
    }

    return translateMinToHour(sum * 25)
}

function translateMinToHour(num: number): string {
    const hour = Math.floor(num / 60);
    const min = num % 60;

    return `${hour} час ${min} мин`
}