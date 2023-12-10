"use client"

import { FormEvent, useContext, useState } from "react";
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
  },
  onReplyClick: Function,
  onDeleteClick: Function,
  onEditClick: Function,
  onVoteClick: Function
}

export default function Comment(props: CommentProps) {
  const signedUser = useContext(SignedUserContext);

  const [isEditing, setIsEditing] = useState(false);
  const [commentContent, setCommentContent] = useState(props.content);

  function isCurrentUser(username: string): boolean {
    return username === signedUser.username;
  }

  function getEllapsedTimeSince(timestamp: string): string {
    return moment(timestamp).fromNow();
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function handleSubmitEdit() {
    setIsEditing(false);
    props.onEditClick(props.id, commentContent);
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setCommentContent(e.currentTarget.value);
  }

  function handleUpvote() {
    props.onVoteClick(props.id, props.score + 1);
  }

  function handleDownvote() {
    props.onVoteClick(props.id, props.score - 1);
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

      <div className={styles.comment__body}>
        {isEditing ?
          <form className={styles.edit_form}>
            <textarea placeholder="Editing comment" value={commentContent} onChange={handleChange}></textarea>
            <button type="button" onClick={handleSubmitEdit}>Update</button>
          </form>
          :
          <p className={styles.shown}>
            {props.replyingTo && <span className={styles.comment__mention}>@{props.replyingTo}&nbsp;</span>}
            {props.content}
          </p>
        }

      </div>

      <div className={styles.voting_tab}>
        <div className={styles.upvote} onClick={handleUpvote}>
          <img src="./images/icon-plus.svg" alt="" />
        </div>
        <div className={styles.vote_count}>{props.score}</div>
        <div className={styles.downvote} onClick={handleDownvote}>
          <img src="./images/icon-minus.svg" alt="" />
        </div>
      </div>

      <div className={styles.actions}>
        {isCurrentUser(props.user.username) ?
          <div className={`${styles.author_actions} ${isEditing ? styles.disabled : ""}`}>
            <a href="#!" id={styles.action_delete}
              className={styles.action}
              onClick={() => props.onDeleteClick(props.id)}>
              <span><img src="./images/icon-delete.svg" alt="" /></span>
              Delete
            </a>
            <a href="#!" id={styles.action_edit}
              className={styles.action}
              onClick={() => handleEdit()}>
              <span><img src="./images/icon-edit.svg" alt="" /></span>
              Edit
            </a>
          </div>
          :
          <a href="#!" id={styles.action_reply}
            className={styles.action}
            onClick={() => props.onReplyClick(props.user.username)}>
            <span><img src="./images/icon-reply.svg" alt="" /></span>
            Reply
          </a>
        }
      </div>
    </div>
  )
}