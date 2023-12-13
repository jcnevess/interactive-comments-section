import styles from "./page.module.scss";
import { getLocalData } from "../lib/localdata";

import BoardProvider from "@/components/board-provider/board-provider";
import Container from "@/components/container/container";

export default async function Home() {
  const localData = await getLocalData();

  return (
    <BoardProvider signedUser={localData.currentUser} initialComments={localData.comments} >
      <Container></Container>
    </BoardProvider>
  );
}
