import styles from './comment-form.module.scss';

import { IUser } from "@/lib/types";

interface CommentFormProps {
  currentUser: IUser
}

export default function CommentForm(props: CommentFormProps) {
  return (
    <form className={styles.commentForm} action="">
      <textarea placeholder="Add a comment..."></textarea>
      <picture>
        <source srcSet={props.currentUser.image.webp} type="image/webp" />
        <source srcSet={props.currentUser.image.png} type="image/png" />
        <img src={props.currentUser.image.png} alt={props.currentUser.username} />
      </picture>
      <button type="submit">Send</button>
    </form>
  );
}