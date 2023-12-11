import { useContext, useState } from "react";
import styles from './comment-form.module.scss';

import { SignedUserContext } from "@/lib/signed-user.context";
import { IComment } from "@/lib/types";

interface CommentFormProps {
  onCreateComment: Function,
  onToggleReply?: Function,
  rootComment?: IComment,
  replyingTo?: string
}

export default function CommentForm({ onCreateComment, onToggleReply, rootComment = undefined, replyingTo = undefined }: CommentFormProps) {
  const signedUser = useContext(SignedUserContext);

  const [content, setContent] = useState(replyingTo ? `@${replyingTo} ` : "");

  let comment: IComment;
  if (replyingTo) {
    comment = {
      id: -1,
      content: content.substring(replyingTo.length + 2), //Removes "@replyingTo " from saved comment
      createdAt: "",
      score: 0,
      replyingTo: replyingTo ?? undefined,
      user: signedUser,
      replies: [] as IComment[]
    };
  } else {
    comment = {
      id: -1,
      content: content,
      createdAt: "",
      score: 0,
      replyingTo: replyingTo ?? undefined,
      user: signedUser,
      replies: [] as IComment[]
    };
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.currentTarget.value);
  }

  function handleClick() {
    if (replyingTo) {
      onToggleReply!(replyingTo);
    }
    onCreateComment(comment, rootComment);
  }

  return (
    <form className={styles.commentForm} action="POST">
      <textarea name="content"
        placeholder={replyingTo ? `Replying to @${replyingTo}` : "Add a comment..."}
        value={content}
        onChange={(e) => handleChange(e)}>
      </textarea>
      <picture>
        <source srcSet={signedUser.image.webp} type="image/webp" />
        <source srcSet={signedUser.image.png} type="image/png" />
        <img src={signedUser.image.png} alt={signedUser.username} />
      </picture>
      <button type="button" onClick={handleClick}>Send</button>
    </form>
  );
}