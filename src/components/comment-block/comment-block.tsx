import { IComment } from "@/lib/types"

import Comment from "@/components/comment/comment";
import CommentForm from "@/components/comment-form/comment-form";
import { useState } from "react";

interface CommentBlockProps {
  comment: IComment,
  onShowModal: Function,
  onCreateComment: Function,
  onEditComment: Function,
  onUpdateScore: Function
}

export default function CommentBlock({ comment, onShowModal, onCreateComment, onEditComment, onUpdateScore }: CommentBlockProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  function toggleReply(replyTo: string) {
    if (replyingTo === null) {
      setReplyingTo(replyTo);
    } else {
      setReplyingTo(null);
    }
  }

  return (
    <>
      <Comment {...comment}
        onReplyClick={toggleReply}
        onDeleteClick={onShowModal}
        onEditClick={onEditComment}
        onVoteClick={onUpdateScore} />

      {replyingTo &&
        <CommentForm replyingTo={replyingTo} onCreateComment={onCreateComment} />
      }
    </>
  )
}