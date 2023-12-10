import { useContext, useState } from "react";
import styles from './comment-form.module.scss';

import { SignedUserContext } from "@/lib/signed-user.context";
import { IComment } from "@/lib/types";

interface CommentFormProps {
  replyingTo?: string | null
  onCreateComment: Function
}

export default function CommentForm({ replyingTo = null, onCreateComment }: CommentFormProps) {
  const signedUser = useContext(SignedUserContext);

  const [content, setContent] = useState(replyingTo ? `@${replyingTo} ` : "");

  const comment: IComment = {
    id: -1,
    content: content,
    createdAt: "",
    score: 0,
    replyingTo: replyingTo ?? undefined,
    user: signedUser,
    replies: [] as IComment[]
  };

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.currentTarget.value);
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
      <button type="button" onClick={() => onCreateComment(comment)}>Send</button>
    </form>
  );
}