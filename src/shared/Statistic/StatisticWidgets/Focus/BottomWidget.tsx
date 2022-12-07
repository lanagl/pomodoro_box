import React, {ReactElement} from 'react';
import styles from './bottomwidget.module.css';
import {observer} from "mobx-react-lite";
import {useStores} from "../../../../store/use-stores";
import classNames from "classnames";

interface IBottomWidgetProps {
    title: string;
    text: string;
    icon: ReactElement
    className?: string;
}

export const BottomWidget = observer(({title, text, icon, className = ""}: IBottomWidgetProps) => {
    const {statisticStore} = useStores()
    return (
        <div className={classNames(styles.container, className)}>
            <div className={styles.left}>
                <div className={styles.title}>{title}</div>
                <div className={styles.text}>{text}</div>
            </div>
            <div className={styles.icon}>
                {icon}
            </div>


        </div>
    );
})