export function getMaxOrder(array: Array<ITaskItem>): number {
    let max = 0;
    const fieldArray = array.map(item => item.order);
    if (fieldArray.length > 0) {
        max = fieldArray.reduce((accumulator, currentValue) => {
            return (accumulator > currentValue ? accumulator : currentValue);
        })
    }

    return max
}