"use client"

import CommentBlock from "../comment-block/comment-block";
import CommentForm from "../comment-form/comment-form";
import styles from './comment-board.module.scss';

import { IComment } from "@/lib/types";

interface CommentBoardProps {
  comments: IComment[],
  isSubBoard?: boolean
}

export default function CommentBoard({ comments, isSubBoard = false }: CommentBoardProps) {
  return (
    <div className={isSubBoard ? styles.sub_board : styles.board}>
      {comments.map(comment => {
        return (
          <div className={styles.container} key={comment.id}>
            <CommentBlock comment={comment} />

            {comment.replies &&
              <CommentBoard comments={comment.replies}
                isSubBoard={true} />}
          </div>
        )
      })}

      {!isSubBoard &&
        <CommentForm />
      }
    </div>
  );
}