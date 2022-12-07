import React, {useEffect, useState} from 'react';
import styles from './tasklist.module.css';
import {ListItem} from "./ListItem";
import {observer} from "mobx-react-lite";
import {useStores} from "../../store/use-stores";
import {getSumTime} from "../../utils/sumTime";


export const TaskList = observer(() => {
    const [openId, setOpenId] = useState<string>("");
    const {taskListStore} = useStores()
    const [filteredList, setFilteredList] = useState<Array<ITaskItem>>([]);

    useEffect(() => {
        setFilteredList(taskListStore.filteredList)
    }, [taskListStore, taskListStore.filteredList])


    return (
        <div className={styles.taskList}>
            {filteredList.map((item: ITaskItem) => {
                return (<ListItem item={item} key={item.id} handleToggleOpen={setOpenId} openId={openId}/>)
            })}

            <div className={styles.total}>
                {getSumTime(filteredList)}
            </div>
        </div>
    );
})