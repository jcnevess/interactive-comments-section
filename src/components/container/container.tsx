"use client"

import { useContext, useEffect, useState } from "react";
import CommentBoard from "../comment-board/comment-board";
import DeleteModal from "../delete-modal/delete-modal";
import { IComment } from "@/lib/types";
import { BoardContext } from "@/lib/board.context";

export default function Container() {
  const COMMENTS_OBJECT = "comments";

  const { state, dispatch } = useContext(BoardContext);

  const [isModalShown, setIsModalShown] = useState(false);
  const [comments, setComments] = useState<IComment[]>(state.comments);
  const [deletableId, setDeletableId] = useState<number>();

  // Populate the localStorage and comments with initial data
  /*useEffect(() => {
    setComments(boardContext.state.comments);
  }, [boardContext.state.comments]);*/

  function showModal(deletableId: number) {
    setIsModalShown(true);
    setDeletableId(deletableId);
  }

  function hideModal() {
    setIsModalShown(false);
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
      <CommentBoard
        comments={state.comments}
        onShowModal={showModal}
        onEditComment={updateCommentContent}
        onUpdateScore={updateScore} />

      {isModalShown &&
        <DeleteModal onHideModal={hideModal} onDeleteComment={deleteComment} />
      }
    </>
  );
}