import styles from "./page.module.scss";
import { getLocalData } from "../lib/localdata";

import SignedUserProvider from "@/components/signed-user-provider/signed-user-provider";
import Container from "@/components/container/container";

export default async function Home() {
  const localData = await getLocalData();

  return (
    <SignedUserProvider signedUser={localData.currentUser}>
      <Container initialComments={localData.comments}></Container>
    </SignedUserProvider>
  );
}
