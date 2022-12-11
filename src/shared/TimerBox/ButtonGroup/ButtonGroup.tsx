import React, {useState} from 'react';
import styles from './buttongroup.module.css';
import {Button} from "../../Button";
import {EColor} from "../../../utils/consts";
import {observer} from "mobx-react-lite";
import {useStores} from "../../../store/use-stores";

interface IButtonGroupProps {
    isRest?: boolean;
    handleFinish: () => void;
    handleStartTimer: () => void;

}

export const ButtonGroup = observer(({
                                         isRest,
                                         handleFinish,
                                         handleStartTimer
                                     }: IButtonGroupProps) => {
    const {taskListStore} = useStores()
    const [isPaused, setIsPaused] = useState(false);
    const [isStarted, setIsStarted] = useState(false);

    return (
        <div className={styles.buttonGroup}>
            {isRest &&
				<>
					<Button color={EColor.green}
							onClick={handleStartTimer}>{isStarted ? isPaused ? "Продолжить" : "Пауза" : "Старт"}</Button>
					<Button color={EColor.red} transparent={true}
							disabled={!isStarted} onClick={handleFinish}>Пропустить</Button>
				</>
            }
            {!isRest &&
				<>
					<Button color={EColor.green}
							onClick={handleStartTimer}>{isStarted ? isPaused ? "Продолжить" : "Пауза" : "Старт"}</Button>
					<Button color={EColor.red} transparent={true}
							disabled={!isStarted} onClick={handleFinish}>{isStarted ?
                        isPaused ? "Сделано" : "Стоп" : "Стоп"}</Button>
				</>
            }


        </div>
    );
})