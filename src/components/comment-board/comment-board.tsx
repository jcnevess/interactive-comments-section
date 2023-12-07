"use client"

import styles from './comment-board.module.scss';

import { IComment } from "@/lib/types";

import Comment from "@/components/comment/comment";
import CommentForm from "@/components/comment-form/comment-form";

interface CommentBoardProps {
  comments: IComment[],
  isSubBoard: boolean
}

export default function CommentBoard(props: CommentBoardProps) {
  return (
    <div className={props.isSubBoard ? styles.sub_board : styles.board}>
      {props.comments.map(comment => {
        return (
          <div className={styles.container} key={comment.id}>
            <Comment {...comment} />

            <CommentForm />

            {comment.replies &&
              <CommentBoard comments={comment.replies}
                isSubBoard={true} />}
          </div>
        )
      })}

      {!props.isSubBoard &&
        <CommentForm />
      }
    </div>
  );
}