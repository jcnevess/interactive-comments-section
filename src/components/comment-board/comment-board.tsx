"use client"

import CommentBlock from "../comment-block/comment-block";
import CommentForm from "../comment-form/comment-form";
import styles from './comment-board.module.scss';

import { IComment } from "@/lib/types";

interface CommentBoardProps {
  comments: IComment[],
  rootComment?: IComment,
  onShowModal: Function,
  onCreateComment: Function,
  onEditComment: Function,
  onUpdateScore: Function
}

export default function CommentBoard({ comments,
  rootComment = undefined,
  onShowModal,
  onCreateComment,
  onEditComment,
  onUpdateScore }: CommentBoardProps) {
  return (
    <div className={rootComment ? styles.sub_board : styles.board}>
      {comments.map(comment => {
        return (
          <div className={styles.container} key={comment.id}>
            <CommentBlock comment={comment}
              rootComment={rootComment}
              onShowModal={onShowModal}
              onCreateComment={onCreateComment}
              onEditComment={onEditComment}
              onUpdateScore={onUpdateScore} />

            {comment.replies &&
              <CommentBoard comments={comment.replies}
                rootComment={comment}
                onShowModal={onShowModal}
                onCreateComment={onCreateComment}
                onEditComment={onEditComment}
                onUpdateScore={onUpdateScore} />}
          </div>
        )
      })}

      {!rootComment &&
        <CommentForm onCreateComment={onCreateComment} />
      }
    </div>
  );
}