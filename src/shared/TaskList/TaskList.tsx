import React, {useEffect, useState} from 'react';
import styles from './tasklist.module.css';
import {ListItem} from "./ListItem";
import {observer} from "mobx-react-lite";
import {useStores} from "../../store/use-stores";
import {getSumTime} from "../../utils/sumTime";
import {ITaskItem} from "../../../types/TaskItem";


export const TaskList = observer(() => {
    const [openId, setOpenId] = useState<string>("");
    const {taskListStore, settingsStore} = useStores()
    const [filteredList, setFilteredList] = useState<Array<ITaskItem>>([]);


    useEffect(() => {
        setFilteredList(taskListStore.filteredList)
    }, [taskListStore, taskListStore.filteredList])


    return (

        <div className={styles.taskList}>
            {filteredList.map((item: ITaskItem) => (
                    <ListItem item={item} handleToggleOpen={setOpenId} openId={openId} key={item.id}/>
                )
            )}
            <div className={styles.total}>
                {getSumTime(filteredList, settingsStore.pomodoroTime)}
            </div>
        </div>

    );
})