import React, {ReactNode} from 'react';
import styles from './wrapper.module.css';
import {useStores} from "../../store/use-stores";
import classNames from "classnames";
import {Theme} from "../../utils/consts";
import {observer} from "mobx-react-lite";

interface IWrapperProps {
    children?: ReactNode;
}

export const Wrapper = observer(({children}: IWrapperProps) => {
    const {settingsStore} = useStores()
    return (
        <div className={classNames(styles.wrapper, {[styles.inverse]: settingsStore.theme === Theme.DARK})}>
            {children}
        </div>
    );
})