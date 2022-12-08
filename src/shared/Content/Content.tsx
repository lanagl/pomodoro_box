import React from 'react';
import styles from './content.module.css';
import {TimerBox} from "../TimerBox";
import {Resolver, useForm} from "react-hook-form";
import {Button} from "../Button";
import {EColor} from "../../utils/consts";
import {TaskList} from "../TaskList";
import {observer} from "mobx-react-lite";
import {generateId} from "../../utils/generateRandomIndex";
import {useStores} from "../../store/use-stores";
import {getMaxOrder} from "../../utils/getMax";

type FormValues = {
    taskName: string;
};
const resolver: Resolver<FormValues> = async (values) => {
    return {
        values: values.taskName ? values : {},
        errors: !values.taskName
            ? {
                taskName: {
                    type: 'required',
                    message: 'This is required.',
                },
            }
            : {},
    };
};

export const Content = observer(() => {
    const {register, resetField, handleSubmit, formState: {errors}} = useForm<FormValues>({resolver});
    const onSubmit = handleSubmit((data) => {
        const item: Omit<ITaskItem, 'id'> = {
            description: data.taskName,
            finish: false,
            count: 1,
            started: false,
            paused: false,
            pauseCount: 0,
            pauseTime: 0,
            completedTime: 0,
            finishedPomodoro: 0,
            startDate: Date.now(),
            order: getMaxOrder(taskListStore.taskList) + 1
        }
        taskListStore.addItem(generateId(item));
        resetField("taskName")
    });
    const {taskListStore} = useStores()

    return (
        <div className={styles.content}>
            <div className={styles.pomodoroBox}>

                <div className={styles.leftSide}>
                    <div className={styles.description}>
                        <div className={styles.descriptionTitle}>
                            Ура! Теперь можно начать работать:
                        </div>
                        <ul className={styles.list}>
                            <li>Выберите категорию и напишите название текущей задачи</li>
                            <li>Запустите таймер («помидор»)</li>
                            <li>Работайте пока «помидор» не прозвонит</li>
                            <li>Сделайте короткий перерыв (3-5 минут)</li>
                            <li>Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4
                                «помидора» делайте длинный перерыв (15-30 минут).
                            </li>
                        </ul>

                    </div>
                    <form onSubmit={onSubmit} className={styles.pomodoroForm}>
                        <input {...register("taskName")} placeholder="Название задачи" className={styles.inputField}/>
                        {errors?.taskName && <p>{errors.taskName.message}</p>}
                        <Button As={"button"} color={EColor.green} className={styles.submit}>Добавить</Button>
                    </form>
                    <TaskList/>
                </div>

                <div className={styles.rightSide}>
                    <TimerBox/>
                </div>

            </div>
        </div>
    );
})