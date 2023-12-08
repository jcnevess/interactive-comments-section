import { useContext } from "react";
import styles from './comment-form.module.scss';

import { SignedUserContext } from "@/lib/signed-user.context";

interface CommentFormProps {
  replyingTo?: string | null
}

export default function CommentForm({ replyingTo = null }: CommentFormProps) {
  const signedUser = useContext(SignedUserContext);

  return (
    <form className={styles.commentForm} action="">
      <textarea placeholder={replyingTo ? `Replying to @${replyingTo}` : "Add a comment..."}
        defaultValue={replyingTo ? `@${replyingTo} ` : ""}>
      </textarea>
      <picture>
        <source srcSet={signedUser.image.webp} type="image/webp" />
        <source srcSet={signedUser.image.png} type="image/png" />
        <img src={signedUser.image.png} alt={signedUser.username} />
      </picture>
      <button type="submit">Send</button>
    </form>
  );
}