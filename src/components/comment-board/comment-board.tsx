"use client"

import CommentBlock from "../comment-block/comment-block";
import CommentForm from "../comment-form/comment-form";
import styles from './comment-board.module.scss';

import { IComment } from "@/lib/types";

interface CommentBoardProps {
  comments: IComment[],
  rootComment?: IComment,
  onEditComment: Function
}

export default function CommentBoard({ comments,
  rootComment = undefined,
  onEditComment }: CommentBoardProps) {

  return (
    <div className={rootComment ? styles.sub_board : styles.board}>
      {
        comments.sort((c1, c2) => c2.score - c1.score).map(comment => {
          return (
            <div className={styles.container} key={comment.id}>
              <CommentBlock comment={comment}
                rootComment={rootComment ? rootComment : comment}
                onEditComment={onEditComment} />

              {comment.replies &&
                <CommentBoard comments={comment.replies}
                  rootComment={comment}
                  onEditComment={onEditComment} />}
            </div>
          )
        })}

      {!rootComment &&
        <CommentForm />
      }
    </div>
  );
}