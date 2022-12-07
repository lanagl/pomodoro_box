import React from 'react';
import styles from './summarypomodoro.module.css';
import {ReactComponent as Pomodoro} from "../../../../images/pomodoro.svg";
import {ReactComponent as BigTomato} from "../../../../images/bigTomato.svg";
import {observer} from "mobx-react-lite";
import {useStores} from "../../../../store/use-stores";

export const SummaryPomodoro = observer(() => {
    const {statisticStore} = useStores()
    return (
        <div className={styles.summary}>
            {statisticStore.completePomodoro ?
                <span className={styles.pomodoro}>
                    <Pomodoro width={76} height={72}/> x{statisticStore.completePomodoro}
                </span>
                : <span className={styles.pomodoro}>
                    <BigTomato width={108} height={102}/>
                </span>
            }
            {!!statisticStore.completePomodoro &&
				<div className={styles.description}>
                    {statisticStore.completePomodoro} помидора
				</div>
            }
        </div>
    );
})