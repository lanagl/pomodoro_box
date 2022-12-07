import React, {useRef} from 'react';
import styles from './deletemodal.module.css';
import {createPortal} from "react-dom";
import {Button} from "../../../Button";
import {EColor} from "../../../../utils/consts";
import {ReactComponent as Close} from "../../../../images/close.svg";

interface IDeleteModalProps {
    onClose: () => void;
    onDelete: () => void;

}

export function DeleteModal({onClose, onDelete}: IDeleteModalProps) {
    const node = document.querySelector("#modal");
    const ref = useRef<HTMLDivElement>(null);


    if (!node) return null;

    function handleDelete() {
        onDelete()
        onClose()
    }


    return createPortal((
        <div className={styles.deleteModalContainer} ref={ref}>
            <div className={styles.modalDialog}>
                <div className={styles.btnClose} onClick={onClose}>
                    <Close/>
                </div>
                <div className={styles.modalDialogTitle}>
                    Удалить задачу?
                </div>
                <Button As={"button"} color={EColor.red} onClick={handleDelete}>
                    Удалить
                </Button>
                <button className={styles.btnCancel} onClick={onClose}>Отмена</button>
            </div>
        </div>

    ), node);
}