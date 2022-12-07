export function calcTime(time: number): string {
    const days: number = Math.floor(time / (60 * 60 * 24))
    if (days <= 0) {
        const afterDays: number = (time % (60 * 60 * 24))
        const hours = Math.floor(afterDays / (60 * 60))
        if (hours <= 0) {
            const afterHours = afterDays % (60 * 60)
            const minute: number = Math.floor(afterHours / (60))
            if (minute <= 0) {
                const afterMinute: number = afterHours % (60)
                const seconds: number = Math.floor(afterMinute / (60))
                return `${seconds} ${caseText(seconds, 's')}`
            } else {
                return `${minute} ${caseText(minute, 'm')}`
            }
        } else {
            return `${hours} ${caseText(hours, 'h')}`
        }
    } else {
        return `${days} ${caseText(days, 'd')}`
    }

}

export function caseText(num: number, prefix: 'd' | 'h' | 'm' | 's') {
    switch (prefix) {
        case "d":
            if (num > 10 && num < 20) {
                return "дней"
            } else {
                const rem = divideTen(num);
                if (rem < 10) {
                    if (rem === 1) {
                        return "день"
                    } else if (rem > 1 && rem < 5) {
                        return "дня"
                    } else if (rem >= 5 || rem === 0) {
                        return "дней"
                    }
                }
            }
            break;
        case "h":
            if (num > 10 && num < 20) {
                return "часов"
            } else {
                const rem = divideTen(num);
                if (rem < 10) {
                    if (rem === 1) {
                        return "час"
                    } else if (rem > 1 && rem < 5) {
                        return "часа"
                    } else if (rem >= 5 || rem === 0) {
                        return "часов"
                    }
                }
            }
            break;
        case "m":
            if (num > 10 && num < 20) {
                return "минут"
            } else {
                const rem = divideTen(num);
                if (rem < 10) {
                    if (rem === 1) {
                        return "минуту"
                    } else if (rem > 1 && rem < 5) {
                        return "минуты"
                    } else if (rem >= 5 || rem === 0) {
                        return "минут"
                    }
                }
            }
            break;
        case "s":
            if (num > 10 && num < 20) {
                return "секунд"
            } else {
                const rem = divideTen(num);
                if (rem < 10) {
                    if (rem === 1) {
                        return "секунду"
                    } else if (rem > 1 && rem < 5) {
                        return "секунды"
                    } else if (rem >= 5 || rem === 0) {
                        return "секунд"
                    }
                }
            }
            break;
    }

}

export function divideTen(num: number): number {
    if (num > 100)
        return divideTen(num % 10)
    else return num % 10
}