import { useContext } from "react";
import styles from './comment.module.scss';
import moment from "moment";
import { SignedUserContext } from "@/lib/signed-user.context";

interface CommentProps {
  id: number,
  content: string,
  createdAt: string,
  score: number,
  replyingTo?: string,
  user: {
    image: {
      png: string,
      webp: string
    },
    username: string
  }
}

export default function Comment(props: CommentProps) {
  const signedUser = useContext(SignedUserContext);

  function isCurrentUser(username: string): boolean {
    return username === signedUser.username;
  }

  function getEllapsedTimeSince(timestamp: string): string {
    return moment(timestamp).fromNow();
  }

  return (
    <div className={styles.comment}>

      <div className={styles.comment__info}>
        <div className={styles.author__identification}>
          <picture className={styles.author__picture}>
            <source srcSet={props.user.image.webp} type="image/webp" />
            <source srcSet={props.user.image.png} type="image/png" />
            <img src={props.user.image.png} alt={props.user.username} />
          </picture>
          <div className={styles.author__name}>{props.user.username}</div>
          {isCurrentUser(props.user.username) &&
            <div className={styles.author__badge}>you</div>
          }
        </div>
        <div className={styles.comment__timestamp}>{getEllapsedTimeSince(props.createdAt)}</div>
      </div>

      <p className={styles.comment__body}>
        {props.replyingTo && <span className={styles.comment__mention}>@{props.replyingTo}</span>}
        &nbsp;
        {props.content}
      </p>

      <div className={styles.voting_tab}>
        <div className={styles.upvote}>
          <img src="./images/icon-plus.svg" alt="" />
        </div>
        <div className={styles.vote_count}>{props.score}</div>
        <div className={styles.downvote}>
          <img src="./images/icon-minus.svg" alt="" />
        </div>
      </div>

      <div className={styles.actions}>
        {isCurrentUser(props.user.username) ?
          <div className={styles.author_actions}>
            <a href="#" className={styles.action} id={styles.action_delete}><span><img src="./images/icon-delete.svg" alt="" /></span>Delete</a>
            <a href="#" className={styles.action} id={styles.action_edit}><span><img src="./images/icon-edit.svg" alt="" /></span>Edit</a>
          </div>
          :
          <a href="#" className={styles.action} id={styles.action_reply}><span><img src="./images/icon-reply.svg" alt="" /></span>Reply</a>
        }
      </div>
    </div>
  )
}