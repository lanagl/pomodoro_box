import React from 'react';
import styles from './buttongroup.module.css';
import {Button} from "../../Button";
import {EColor} from "../../../utils/consts";
import {observer} from "mobx-react-lite";

interface IButtonGroupProps {
    isRest?: boolean;
    isStarted?: boolean;
    isPaused?: boolean;
    onFinish: () => void;
    onStartTimer: () => void;
    onPausedTimer: () => void;
    onStopRest: () => void;
    onStartRestTimer: () => void;

}

export const ButtonGroup = observer(({
                                         isRest,
                                         isStarted,
                                         onFinish,
                                         isPaused,
                                         onStartTimer,
                                         onPausedTimer,
                                         onStartRestTimer,
                                         onStopRest
                                     }: IButtonGroupProps) => {


    return (
        <div className={styles.buttonGroup}>
            {!isRest &&
				<>
                    {isStarted && !isPaused && <Button color={EColor.green}
													   onClick={onPausedTimer}>Пауза</Button>
                    }
                    {isStarted && isPaused && <Button color={EColor.green}
													  onClick={onStartTimer}>Продолжить</Button>
                    }
                    {!isStarted && <Button color={EColor.green}
										   onClick={onStartTimer}>Старт</Button>
                    }
					<Button color={EColor.red} transparent={true}
							disabled={!isStarted} onClick={onFinish}>{isStarted ?
                        isPaused ? "Сделано" : "Стоп" : "Стоп"}</Button>
				</>
            }
            {isRest &&
				<>
					<Button color={EColor.green}
							onClick={onStartRestTimer}>{isStarted ? isPaused ? "Продолжить" : "Пауза" : "Старт"}</Button>
					<Button color={EColor.red} transparent={true}
							disabled={!isStarted} onClick={onStopRest}>Пропустить</Button>
				</>
            }


        </div>
    );
})