import { IComment } from "@/lib/types"

import Comment from "@/components/comment/comment";
import CommentForm from "@/components/comment-form/comment-form";
import { useState } from "react";

interface CommentBlockProps {
  comment: IComment
}

export default function CommentBlock({ comment }: CommentBlockProps) {
  const [isFormOpened, setIsFormOpened] = useState(false);

  function toggleIsFormOpened() {
    setIsFormOpened(!isFormOpened);
  }

  return (
    <>
      <Comment {...comment} onReplyClick={toggleIsFormOpened} />

      {isFormOpened &&
        <CommentForm />
      }
    </>
  )
}