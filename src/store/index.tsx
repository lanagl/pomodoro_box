import React from 'react'
import {TaskListStore} from "./taskListStore";
import {SettingsStore} from "./settingsStore";
import {StatisticStore} from "./statisticStore";

const taskListStore = new TaskListStore()
export const storesContext = React.createContext({
    taskListStore: taskListStore,
    settingsStore: new SettingsStore(),
    statisticStore: new StatisticStore(taskListStore),
})