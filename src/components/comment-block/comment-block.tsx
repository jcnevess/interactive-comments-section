import { IComment } from "@/lib/types"

import Comment from "@/components/comment/comment";
import CommentForm from "@/components/comment-form/comment-form";
import { useState } from "react";

interface CommentBlockProps {
  comment: IComment,
  onShowModal: Function
}

export default function CommentBlock({ comment, onShowModal }: CommentBlockProps) {
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
      <Comment {...comment} onReplyClick={toggleReply} onDeleteClick={onShowModal} />

      {replyingTo &&
        <CommentForm replyingTo={replyingTo} />
      }
    </>
  )
}