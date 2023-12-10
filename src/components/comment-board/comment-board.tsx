"use client"

import CommentBlock from "../comment-block/comment-block";
import CommentForm from "../comment-form/comment-form";
import styles from './comment-board.module.scss';

import { IComment } from "@/lib/types";

interface CommentBoardProps {
  comments: IComment[],
  isSubBoard?: boolean,
  onShowModal: Function,
  onCreateComment: Function,
  onEditComment: Function,
  onUpdateScore: Function
}

export default function CommentBoard({ comments,
  isSubBoard = false,
  onShowModal,
  onCreateComment,
  onEditComment,
  onUpdateScore }: CommentBoardProps) {
  return (
    <div className={isSubBoard ? styles.sub_board : styles.board}>
      {comments.map(comment => {
        return (
          <div className={styles.container} key={comment.id}>
            <CommentBlock comment={comment}
              onShowModal={onShowModal}
              onCreateComment={onCreateComment}
              onEditComment={onEditComment}
              onUpdateScore={onUpdateScore} />

            {comment.replies &&
              <CommentBoard comments={comment.replies}
                isSubBoard={true}
                onShowModal={onShowModal}
                onCreateComment={onCreateComment}
                onEditComment={onEditComment}
                onUpdateScore={onUpdateScore} />}
          </div>
        )
      })}

      {!isSubBoard &&
        <CommentForm onCreateComment={onCreateComment} />
      }
    </div>
  );
}