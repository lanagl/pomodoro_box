import React, {ReactElement} from 'react';
import styles from './bottomwidget.module.css';
import classNames from "classnames";

interface IBottomWidgetProps {
    title: string;
    value: number;
    icon: ReactElement
    className?: string;
    unit?: string;
}

export const BottomWidget = ({title, value, icon, unit, className = ""}: IBottomWidgetProps) => {
    return (
        <div className={classNames(styles.container, className, {[styles.inactive]: !value})}>
            <div className={styles.left}>
                <div className={styles.title}>{title}</div>
                <div className={styles.text}>{value}{unit && unit}</div>
            </div>
            <div className={styles.icon}>
                {icon}
            </div>


        </div>
    );
}