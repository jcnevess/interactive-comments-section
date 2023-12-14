"use client"

import { cleanDeletionMark, deleteComment } from "@/lib/board.reducer";
import styles from "./delete-modal.module.scss";
import { useContext } from "react";
import { BoardContext } from "@/lib/board.context";

export default function DeleteModal() {

  const { state, dispatch } = useContext(BoardContext);

  // Executes the `handler` only if the event ocurred in the same element where it is registered 
  function executeIfOnCurrentTarget(e: React.MouseEvent<HTMLElement>, handler: Function) {
    e.stopPropagation();

    if (e.target === e.currentTarget) {
      handler();
    }
  }

  return (
    <div id="background"
      className={styles.background}
      onClick={(evt) => executeIfOnCurrentTarget(evt, () => dispatch(cleanDeletionMark()))}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Delete comment</h1>
        </div>
        <div className={styles.body}>Are you sure you want to delete this comment? This will remove the comment and can&apos;t be undone.</div>
        <div className={styles.controls}>
          <button id="buttonNo"
            className={`${styles.button} ${styles.buttonNo}`}
            type="button"
            onClick={(evt) => executeIfOnCurrentTarget(evt, () => dispatch(cleanDeletionMark()))}>No, cancel</button>
          <button id="buttonYes"
            className={`${styles.button} ${styles.buttonYes}`}
            type="button"
            onClick={(evt) => executeIfOnCurrentTarget(evt, () => dispatch(deleteComment(state.commentPendingDeletionId!)))}>Yes, delete</button>
        </div>
      </div>
    </div>
  )
}