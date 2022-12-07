import React, {useEffect, useRef, useState} from 'react';
import styles from './menu.module.css';
import {ReactComponent as Add} from "../../../images/add.svg";
import {ReactComponent as Sub} from "../../../images/sub.svg";
import {ReactComponent as Delete} from "../../../images/delete.svg";
import {ReactComponent as Edit} from "../../../images/edit.svg";
import {createPortal} from "react-dom";
import {useStores} from "../../../store/use-stores";
import {DeleteModal} from "./DeleteModal";

const noop = () => {
}

interface IMenuProps {
    left: number;
    top: number;
    id: string;
    onClose?: () => void
    onEdit?: () => void
}

export function Menu({left, top, onClose = noop, id, onEdit = noop}: IMenuProps) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const {taskListStore} = useStores()

    const node = document.querySelector("#modal");


    useEffect(() => {

        if (ref.current) {
            ref.current.style.top = `${top}px`;
            ref.current.style.left = `${left - ref.current.clientWidth / 2}px`;
        }

    }, [top, left])


    if (!node) return null;

    function handleAddPomodoro() {
        taskListStore.incrementPomodoro(id);
        onClose();
    }

    function handleSubPomodoro() {
        taskListStore.decrementPomodoro(id);
        onClose();
    }

    function handleEdit() {
        onEdit();
    }

    function handleDeletePomodoro() {
        setIsDeleteModalOpen(true)
    }

    if (isDeleteModalOpen) {
        return createPortal((
            <DeleteModal onDelete={() => taskListStore.deleteItem(id)} onClose={onClose}/>), node)
    } else {
        return createPortal((
            <div className={styles.menuContainer} ref={ref}>
                <div className={styles.triangle}/>
                <div className={styles.menu}>
                    <div className={styles.menuItem} onClick={handleAddPomodoro}>
                        <Add/>
                        <span>Увеличить</span>
                    </div>
                    <div className={styles.menuItem} onClick={handleSubPomodoro}>
                        <Sub/>
                        <span>Уменьшить</span>
                    </div>
                    <div className={styles.menuItem} onClick={handleEdit}>
                        <Edit/>
                        <span>Редактировать</span>
                    </div>
                    <div className={styles.menuItem} onClick={handleDeletePomodoro}>
                        <Delete/>
                        <span>Удалить</span>
                    </div>
                </div>
            </div>
        ), node);
    }


}