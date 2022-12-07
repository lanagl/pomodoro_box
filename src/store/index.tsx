import React from 'react'
import {TaskListStore} from "./taskListStore";
import {SettingsStore} from "./settingsStore";

export const storesContext = React.createContext({
    taskListStore: new TaskListStore(),
    settingsStore: new SettingsStore(),
})