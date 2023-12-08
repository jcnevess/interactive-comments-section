import { IComment } from "@/lib/types"

import Comment from "@/components/comment/comment";
import CommentForm from "@/components/comment-form/comment-form";
import { useState } from "react";

interface CommentBlockProps {
  comment: IComment,
  onShowModal: Function
}

export default function CommentBlock({ comment, onShowModal }: CommentBlockProps) {
  const [isFormOpened, setIsFormOpened] = useState(false);

  function toggleIsFormOpened() {
    setIsFormOpened(!isFormOpened);
  }

  return (
    <>
      <Comment {...comment} onReplyClick={toggleIsFormOpened} onDeleteClick={onShowModal} />

      {isFormOpened &&
        <CommentForm />
      }
    </>
  )
}