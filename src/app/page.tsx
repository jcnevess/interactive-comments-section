import styles from "./page.module.scss";
import { getLocalData } from "../lib/localdata";

import CommentBoard from "@/components/comment-board/comment-board";

export default async function Home() {
  const localData = await getLocalData();

  return (
    <CommentBoard {...localData} isSubBoard={false} />
  );
}
