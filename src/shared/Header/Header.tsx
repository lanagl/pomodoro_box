import React from 'react';
import styles from './header.module.css';
import {ReactComponent as Pomodoro} from '../../images/pomodoro.svg';
import {ReactComponent as Statistic} from '../../images/statistic.svg';
import {ReactComponent as Home} from '../../images/home.svg';
import {Link, NavLink} from "react-router-dom";

export function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Link to="/">
                    <Pomodoro width={40}/>
                    <span>pomodoro_box</span>
                </Link>

            </div>
            <div className={styles.nav}>
                <NavLink className={styles.navLink} to={"/home"} activeClassName={styles.active}>
                    <Home width={24}/>
                    <span>Главная</span>
                </NavLink>
                <NavLink className={styles.navLink} to={"/statistic"} activeClassName={styles.active}>
                    <Statistic width={24}/>
                    <span>Статистика</span>
                </NavLink>
            </div>
        </div>
    );
}