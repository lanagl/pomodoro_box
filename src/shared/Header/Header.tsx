import React from 'react';
import styles from './header.module.css';
import {ReactComponent as Pomodoro} from '../../images/pomodoro.svg';
import {ReactComponent as Statistic} from '../../images/statistic.svg';
import {ReactComponent as Settings} from '../../images/settings.svg';
import {ReactComponent as ThemeIcon} from '../../images/theme.svg';
import {ReactComponent as Home} from '../../images/home.svg';
import {Link, NavLink} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {useStores} from "../../store/use-stores";
import {Theme} from "../../utils/consts";

export const Header = observer(() => {
    const {settingsStore} = useStores()

    function handleChangeTheme() {
        if (settingsStore.theme === Theme.LIGHT) {
            settingsStore.setTheme(Theme.DARK)
        } else {
            settingsStore.setTheme(Theme.LIGHT)
        }
    }

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Link to="/">
                    <Pomodoro width={40}/>
                    <span>pomodoro_box</span>
                </Link>

            </div>
            <div className={styles.nav}>
                <button title="Поменять тему" onClick={handleChangeTheme} className={styles.btn}><ThemeIcon width={24}
                                                                                                            height={24}/>
                </button>

                <NavLink className={styles.navLink} to={"/home"} activeClassName={styles.active}>
                    <Home width={24}/>
                    <span>Главная</span>
                </NavLink>
                <NavLink className={styles.navLink} to={"/statistic"} activeClassName={styles.active}>
                    <Statistic width={24}/>
                    <span>Статистика</span>
                </NavLink>
                <NavLink className={styles.navLink} to={"/settings"} activeClassName={styles.active}>
                    <Settings width={24}/>
                    <span>Настройки</span>
                </NavLink>
            </div>
        </div>
    );
})