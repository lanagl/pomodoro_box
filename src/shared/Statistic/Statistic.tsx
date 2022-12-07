import React, {useEffect, useState} from 'react';
import styles from './statistic.module.css';
import {observer} from "mobx-react-lite";
import {useStores} from "../../store/use-stores";
import {StatisticBar} from "./StatisticBar";
import {StatisticWidgets} from "./StatisticWidgets";

export const Statistic = observer(() => {
    const {taskListStore} = useStores()
    const [finishedList, setFinishedList] = useState<Array<ITaskItem>>([]);
    useEffect(() => {
        setFinishedList(taskListStore.finishedList)
    }, [taskListStore, taskListStore.finishedList])

    return (
        <div className={styles.statistic}>
            <StatisticBar/>
            <StatisticWidgets/>
            {finishedList.map((item: ITaskItem) => (
                <div>
                    {item.description} - {Math.floor((item.completedTime / 1000 / 60) % 60)} : {Math.floor((item.completedTime / 1000) % 60)}
                </div>
            ))}
        </div>
    );
})