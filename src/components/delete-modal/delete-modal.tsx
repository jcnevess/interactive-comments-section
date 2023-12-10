"use client"

import styles from "./delete-modal.module.scss";

interface DeleteModalProps {
  onHideModal: Function,
  onDeleteComment: Function
}

export default function DeleteModal({ onHideModal, onDeleteComment }: DeleteModalProps) {

  // Executes the `handler` only if the event ocurred in the same element where it is registered 
  function executeOnCurrentTarget(e: React.MouseEvent<HTMLElement>, handler: Function) {
    e.stopPropagation();

    if (e.target === e.currentTarget) {
      handler();
    }
  }

  return (
    <div id="background"
      className={styles.background}
      onClick={(evt) => executeOnCurrentTarget(evt, onHideModal)}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Delete comment</h1>
        </div>
        <div className={styles.body}>Are you sure you want to delete this comment? This will remove the comment and can&apos;t be undone.</div>
        <div className={styles.controls}>
          <button id="buttonNo"
            className={`${styles.button} ${styles.buttonNo}`}
            type="button"
            onClick={(evt) => executeOnCurrentTarget(evt, onHideModal)}>No, cancel</button>
          <button id="buttonYes"
            className={`${styles.button} ${styles.buttonYes}`}
            type="button"
            onClick={(evt) => { onDeleteComment(); executeOnCurrentTarget(evt, onHideModal) }}>Yes, delete</button>
        </div>
      </div>
    </div>
  )
}