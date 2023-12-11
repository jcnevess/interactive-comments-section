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

  function createComment(comment: IComment, parent?: IComment) {
    let localComment = comment;
    localComment.id = Math.round(Math.random() * 1e6); //FIXME This is a toy example, real code should not do this
    localComment.createdAt = new Date().toISOString();

    if (parent) { // If it is a reply, update parent
      let updatedParent = { ...parent };
      console.log(parent);
      updatedParent.replies = updatedParent.replies.concat(localComment);
      const newCommentArray = comments.filter(comm => comm.id !== parent.id).concat(updatedParent);
      localStorage.setItem(COMMENTS_OBJECT, JSON.stringify(newCommentArray));
      setComments(newCommentArray);
    } else {
      const newCommentArray = comments.concat(localComment);
      localStorage.setItem(COMMENTS_OBJECT, JSON.stringify(newCommentArray));
      setComments(newCommentArray);
    }
  }

  // Uses deletableId
  function deleteComment() {
    let tempComments: IComment[] = JSON.parse(localStorage.getItem(COMMENTS_OBJECT) ?? "[]");
    let originalSize = tempComments.length;

    tempComments = tempComments.filter(comm => comm.id !== deletableId);
    if (tempComments.length === originalSize) { // Nothing was deleted, filter the replies
      tempComments = tempComments.map<IComment>(
        comm => {
          return {
            id: comm.id,
            content: comm.content,
            createdAt: comm.createdAt,
            score: comm.score,
            replyingTo: comm.replyingTo,
            user: comm.user,
            replies: comm.replies.filter(rpl => rpl.id !== deletableId)
          }
        })
    }

    localStorage.setItem(COMMENTS_OBJECT, JSON.stringify(tempComments));
    setComments(tempComments);
  }

  function updateCommentContent(id: number, newContent: string) {
    let tempComments: IComment[] = JSON.parse(localStorage.getItem(COMMENTS_OBJECT) ?? "[]");

    // This is so ugly :(
    for (var comment of tempComments) {
      if (comment.id === id) {
        comment.content = newContent
        break;
      }

      for (var reply of comment.replies) {
        if (reply.id === id) {
          reply.content = newContent
          break;
        }
      }
    }

    localStorage.setItem(COMMENTS_OBJECT, JSON.stringify(tempComments));
    setComments(tempComments);
  }

  function updateScore(id: number, newScore: number) {
    let tempComments: IComment[] = JSON.parse(localStorage.getItem(COMMENTS_OBJECT) ?? "[]");

    // This is so ugly :(
    for (var comment of tempComments) {
      if (comment.id === id) {
        comment.score = newScore
        break;
      }

      for (var reply of comment.replies) {
        if (reply.id === id) {
          reply.score = newScore
          break;
        }
      }
    }

    localStorage.setItem(COMMENTS_OBJECT, JSON.stringify(tempComments));
    setComments(tempComments);
  }

  return (
    <>
      <CommentBoard comments={comments}
        onShowModal={showModal}
        onCreateComment={createComment}
        onEditComment={updateCommentContent}
        onUpdateScore={updateScore} />

      {isModalShown &&
        <DeleteModal onHideModal={hideModal} onDeleteComment={deleteComment} />
      }
    </>
  );
}