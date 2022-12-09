import {makeAutoObservable, observable} from "mobx";

export class SettingsStore {
    pausedTime: number = 1 * 10 * 1000;
    pomodoroTime: number = 2 * 10 * 1000;

    constructor() {
        makeAutoObservable(this, {
            pausedTime: observable,
            pomodoroTime: observable,

        })
    }
}