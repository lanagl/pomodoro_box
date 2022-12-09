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
                const seconds: number = Math.floor(afterMinute)
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
            if (num > 10) {
                return "дней"
            } else {
                const rem = divideTen(num);
                if (rem === 1) {
                    return "дня"
                } else {
                    return "дней"
                }
            }
        case "h":
            if (num > 10) {
                return "часов"
            } else {
                const rem = divideTen(num);

                if (rem === 1) {
                    return "часа"
                } else {
                    return "часов"
                }
            }
        case "m":
            if (num > 10) {
                return "минут"
            } else {
                const rem = divideTen(num);
                if (rem === 1) {
                    return "минуты"
                } else {
                    return "минут"
                }
            }
        case "s":
            if (num > 10) {
                return "секунд"
            } else {
                const rem = divideTen(num);
                if (rem === 1) {
                    return "секунды"
                } else {
                    return "секунд"
                }
            }
    }

}

export function divideTen(num: number): number {
    if (num > 100)
        return divideTen(num % 10)
    else return num % 10
}