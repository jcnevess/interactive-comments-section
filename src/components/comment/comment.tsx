import styles from './comment.module.scss';

export default function Comment() {
  return (
    <div className={styles.comment}>
      <div className={styles.comment__info}>
        <div className={styles.author__identification}>
          <picture className={styles.author__picture}>
            <img src="./images/avatars/image-amyrobson.png" alt="Babebebe" />
          </picture>
          <div className={styles.author__name}>Babebebe</div>
          <div className={styles.author__badge}>you</div>
        </div>
        <div className={styles.comment__timestamp}>2 weeks ago</div>
      </div>
      <p className={styles.comment__body}>
        Impressive <span className={styles.comment__mention}>@juliusomo</span>! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.
      </p>
      <div className={styles.controls}>
        <div className={styles.voting_tab}>
          <div className={styles.upvote}>
            <img src="./images/icon-plus.svg" alt="" />
          </div>
          <div className={styles.vote_count}>12</div>
          <div className={styles.downvote}>
            <img src="./images/icon-minus.svg" alt="" />
          </div>
        </div>
        <div className={styles.actions}>
          <div className={styles.author_actions}>
            <a href="#" className={styles.action} id={styles.action_delete}><span><img src="./images/icon-delete.svg" alt="" /></span>Delete</a>
            <a href="#" className={styles.action} id={styles.action_edit}><span><img src="./images/icon-edit.svg" alt="" /></span>Edit</a>
          </div>
          <a href="#" className={styles.action} id={styles.action_reply}><span><img src="./images/icon-reply.svg" alt="" /></span>Reply</a>
        </div>
      </div>
    </div>
  )
}