import {makeAutoObservable, observable} from "mobx";

export class SettingsStore {
    pausedTime: number = 1 * 60 * 1000;
    pomodoroTime: number = 2 * 60 * 1000;

    constructor() {
        makeAutoObservable(this, {
            pausedTime: observable,
            pomodoroTime: observable,

        })
    }
}