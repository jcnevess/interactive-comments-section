"use client"

import { useContext } from "react";
import CommentBoard from "../comment-board/comment-board";
import DeleteModal from "../delete-modal/delete-modal";
import { BoardContext } from "@/lib/board.context";

export default function Container() {
  const { state } = useContext(BoardContext);

  return (
    <>
      <CommentBoard
        comments={state.comments} />

      {state.commentPendingDeletionId &&
        <DeleteModal />
      }
    </>
  );
}