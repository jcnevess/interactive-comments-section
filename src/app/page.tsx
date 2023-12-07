import styles from "./page.module.scss";
import { getLocalData } from "../lib/localdata";

import CommentBoard from "@/components/comment-board/comment-board";
import SignedUserProvider from "@/components/signed-user-provider/signed-user-provider";

export default async function Home() {
  const localData = await getLocalData();

  return (
    <SignedUserProvider signedUser={localData.currentUser}>
      <CommentBoard comments={localData.comments} isSubBoard={false} />
    </SignedUserProvider>
  );
}
