import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import styles from './listitem.module.css';
import {ReactComponent as MenuIcon} from "../../../images/menu.svg";
import {ReactComponent as SaveIcon} from "../../../images/save.svg";
import {Menu} from "../Menu";
import {useStores} from "../../../store/use-stores";
import {ITaskItem} from "../../../../types/TaskItem";
import classNames from "classnames";

interface IListItem {
    item: ITaskItem;
    openId: string;
    handleToggleOpen: (id: string) => void;
}

type TPosition = {
    top: number;
    left: number;

}

export function ListItem({item, handleToggleOpen, openId}: IListItem) {
    const [position, setPosition] = useState<TPosition>({top: 0, left: 0})
    const [itemDescription, setItemDescription] = useState(item.description);
    const [isEdit, setIsEdit] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const {taskListStore} = useStores()

    useEffect(() => {

        if (item.isAdded) {
            const itemTmp = {...item, isAdded: false}
            taskListStore.editItem(itemTmp)
        }
    }, [item])

    function handleOpen() {
        if (ref.current) {
            setPosition({
                top: ref.current.getBoundingClientRect().bottom + window.scrollY - 21,
                left: ref.current.getBoundingClientRect().right
            })
        }
        if (item.id === openId) {
            handleToggleOpen("")
        } else {
            handleToggleOpen(item.id)
        }

    }

    function handleEdit() {
        setIsEdit(true)
        handleToggleOpen("")
    }

    function handleSave() {
        const itemTmp = {...item, description: itemDescription}
        setIsEdit(false);
        taskListStore.editItem(itemTmp)

    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setItemDescription(event.target?.value)
    }

    function handleDelete() {
        const itemTmp = {...item, isDeleted: true}
        taskListStore.editItem(itemTmp);
        const timer = setTimeout(() => {
            taskListStore.deleteItem(item.id)
            clearTimeout(timer)
        }, 700)

    }

    return (
        <div
            className={classNames(
                styles.listItem,
                {[styles.isAdded]: item.isAdded},
                {[styles.isDeleted]: item.isDeleted},
            )}
            ref={ref}>
            <div className={styles.taskInfo}>
                <span className={styles.count}>{item.count}</span>

                {isEdit && <input type="text" value={itemDescription} onChange={handleChange}
								  className={styles.inputFieldInline}/>}
                {!isEdit && <span className={styles.description}>{itemDescription}</span>}

            </div>

            {isEdit && <SaveIcon width={26} height={26} onClick={handleSave} className={styles.menuIcon}/>}
            {!isEdit &&
				<MenuIcon width={26} onClick={handleOpen} className={styles.menuIcon}/>}
            {openId === item.id &&
				<Menu left={position.left} top={position.top} id={item.id}
					  onClose={() => handleToggleOpen("")} onEdit={handleEdit} onDelete={handleDelete}/>
            }

        </div>
    );
}