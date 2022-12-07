import React, {ReactNode} from 'react';
import styles from './button.module.css';
import {EColor} from "../../utils/consts";
import classNames from "classnames";

interface IButtonProps {
    As?: 'span' | 'button' | 'div';
    transparent?: boolean;
    color?: EColor;
    children?: ReactNode;
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
}

const noop = () => {
}

export function Button({
                           As = 'div',
                           transparent = false,
                           color = EColor.green,
                           disabled = false,
                           className,
                           onClick = noop,
                           children
                       }: IButtonProps) {
    const classes = classNames(
        {[styles[`t${color}`]]: transparent},
        {[styles[`${color}`]]: !transparent},
        {[styles.disabled]: disabled},
        styles.button,
        className
    )
    return (
        <As className={classes} onClick={onClick}>
            {children}
        </As>
    );
}