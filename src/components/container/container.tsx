"use client"

import { useContext, useEffect, useState } from "react";
import CommentBoard from "../comment-board/comment-board";
import DeleteModal from "../delete-modal/delete-modal";
import { IComment } from "@/lib/types";
import { BoardContext } from "@/lib/board.context";

export default function Container() {
  const COMMENTS_OBJECT = "comments";

  const { state } = useContext(BoardContext);

  const [comments, setComments] = useState<IComment[]>(state.comments);

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
        onEditComment={updateCommentContent}
        onUpdateScore={updateScore} />

      {state.commentPendingDeletionId &&
        <DeleteModal />
      }
    </>
  );
}