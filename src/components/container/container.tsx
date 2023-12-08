"use client"

import { useState } from "react";
import CommentBoard from "../comment-board/comment-board";
import DeleteModal from "../delete-modal/delete-modal";
import { IComment } from "@/lib/types";

interface ContainerProps {
  comments: IComment[]
}

export default function Container({ comments }: ContainerProps) {
  const [isModalShown, setIsModalShown] = useState(false);

  function showModal() {
    setIsModalShown(true);
  }

  function hideModal() {
    setIsModalShown(false);
  }

  return (
    <>
      <CommentBoard comments={comments} onShowModal={showModal} />

      {isModalShown &&
        <DeleteModal onHideModal={hideModal} />
      }
    </>
  );
}