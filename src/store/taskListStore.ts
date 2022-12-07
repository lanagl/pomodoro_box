import {action, computed, makeAutoObservable, observable} from "mobx";

export class TaskListStore {
    taskList: Array<ITaskItem> = []
    filteredList: Array<ITaskItem> = []

    finishedList: Array<ITaskItem> = []


    constructor() {
        makeAutoObservable(this, {
            taskList: observable,
            filteredList: observable,
            addItem: action,
            deleteItem: action,
            editItem: action,
            incrementPomodoro: action,
            decrementPomodoro: action,
            sortedList: computed,
            finishedList: observable,
            currentItem: computed,
            getFilteredList: action,
            getFinishedList: action,
            setStarted: action,
            setPaused: action,
            setResume: action,
            setFinished: action

        })
    }

    get sortedList() {
        return this.taskList.sort((a, b) => a.order - b.order)
    }

    get currentItem() {
        return this.filteredList[0]
    }

    getFinishedList() {
        this.finishedList = this.taskList.sort((a, b) => a.order - b.order).filter(item => item.finish)
    }

    getFilteredList() {
        this.filteredList = this.taskList.sort((a, b) => a.order - b.order)
            .filter(item => !item.finish)
    }

    addItem(item: ITaskItem) {
        const task = this.taskList.find(task => task.id === item.id)
        if (!task) {
            this.taskList.push(item)
        }
        this.getFilteredList()
    }

    deleteItem(itemId: string) {
        this.taskList = this.taskList.filter(task => task.id !== itemId)
        this.getFilteredList()
    }

    editItem(item: ITaskItem) {
        this.taskList = this.taskList.filter(task => task.id !== item.id)
        this.taskList.push(item)
        this.getFilteredList()
    }

    incrementPomodoro(itemId: string) {
        const task = this.taskList.find(task => task.id === itemId)
        if (task) {
            task.count++
        }
        this.getFilteredList()
    }

    decrementPomodoro(itemId: string) {
        const task = this.taskList.find(task => task.id === itemId)
        if (task) {
            task.count = task.count > 1 ? task.count - 1 : 1
        }
        this.getFilteredList()
    }

    setStarted(itemId: string) {
        const task = this.taskList.find(task => task.id === itemId)
        if (task) {
            task.started = true
        }
    }

    setPaused(itemId: string) {
        const task = this.taskList.find(task => task.id === itemId)
        if (task) {
            task.paused = true
        }
    }

    setResume(itemId: string) {
        const task = this.taskList.find(task => task.id === itemId)
        if (task) {
            task.paused = false
        }
    }

    setFinished(itemId: string, time: number) {
        const task = this.taskList.find(task => task.id === itemId)
        if (task) {
            task.finish = true
            task.completedTime = time
        }
        this.getFilteredList()
        this.getFinishedList()
    }


}