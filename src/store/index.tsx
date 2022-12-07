import React from 'react'
import {TaskListStore} from "./taskListStore";
import {SettingsStore} from "./settingsStore";
import {StatisticStore} from "./statisticStore";

export const storesContext = React.createContext({
    taskListStore: new TaskListStore(),
    settingsStore: new SettingsStore(),
    statisticStore: new StatisticStore(),
})