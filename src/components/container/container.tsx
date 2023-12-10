"use client"

import { useEffect, useState } from "react";
import CommentBoard from "../comment-board/comment-board";
import DeleteModal from "../delete-modal/delete-modal";
import { IComment } from "@/lib/types";

interface ContainerProps {
  initialComments: IComment[]
}

export default function Container({ initialComments }: ContainerProps) {
  const COMMENTS_OBJECT = "comments";

  const [isModalShown, setIsModalShown] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const [deletableId, setDeletableId] = useState<number>();

  // Populate the localStorage and comments with initial data
  useEffect(() => {
    if (!localStorage.getItem(COMMENTS_OBJECT)) {
      console.log("Persisting comments...")
      localStorage.setItem(COMMENTS_OBJECT, JSON.stringify(initialComments));
      setComments(initialComments);
    } else {
      setComments(JSON.parse(localStorage.getItem(COMMENTS_OBJECT)!));
    }
  }, [initialComments]);

  function showModal(deletableId: number) {
    setIsModalShown(true);
    setDeletableId(deletableId);
  }

  function hideModal() {
    setIsModalShown(false);
  }

  function createComment(comment: IComment) {
    let localComment = comment;
    localComment.id = Math.round(Math.random() * 1e6); //FIXME This is a toy example, real code should not do this
    localComment.createdAt = new Date().toISOString();

    const newCommentArray = comments.concat(localComment)
    localStorage.setItem(COMMENTS_OBJECT, JSON.stringify(newCommentArray));
    setComments(newCommentArray);
  }

  // Uses deletableId
  function deleteComment() {
    let tempComments: IComment[] = JSON.parse(localStorage.getItem(COMMENTS_OBJECT) ?? "[]");
    tempComments = tempComments.filter(comment => comment.id !== deletableId);

    localStorage.setItem(COMMENTS_OBJECT, JSON.stringify(tempComments));
    setComments(tempComments);
  }

  return (
    <>
      <CommentBoard comments={comments} onShowModal={showModal} onCreateComment={createComment} />

      {isModalShown &&
        <DeleteModal onHideModal={hideModal} onDeleteComment={deleteComment} />
      }
    </>
  );
}