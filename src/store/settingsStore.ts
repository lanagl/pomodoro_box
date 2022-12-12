import {action, makeAutoObservable, observable} from "mobx";
import {Theme} from "../utils/consts";

export class SettingsStore {
    pausedTime: number = 3 * 60 * 1000;

    largePauseTime: number = 15 * 60 * 1000;
    pomodoroTime: number = 25 * 60 * 1000;
    theme: Theme = Theme.LIGHT


    constructor() {
        makeAutoObservable(this, {
            pausedTime: observable,
            theme: observable,
            pomodoroTime: observable,
            largePauseTime: observable,
            setSettings: action,
            setTheme: action
        })
    }

    setSettings(pomodoroTime: number, pauseTime: number, largePauseTime: number) {
        this.pomodoroTime = pomodoroTime;
        this.pausedTime = pauseTime;
        this.largePauseTime = largePauseTime;
    }

    setTheme(theme: Theme) {
        this.theme = theme
    }
}