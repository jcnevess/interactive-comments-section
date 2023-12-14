"use client"

import { BoardContext } from "@/lib/board.context"
import { boardReducer, initializer } from "@/lib/board.reducer"
import { SignedUserContext } from "@/lib/signed-user.context"
import { IComment, IUser } from "@/lib/types"
import { useEffect, useReducer } from "react"

interface BoardProviderProps {
  children: React.ReactNode,
  signedUser: IUser,
  initialComments: IComment[]
}

export default function BoardProvider({ children, signedUser, initialComments }: BoardProviderProps) {
  const COMMENTS_OBJECT = "comments";

  const [state, dispatch] = useReducer(boardReducer, { comments: initialComments }, initializer);

  useEffect(() => {
    localStorage.setItem(COMMENTS_OBJECT, JSON.stringify(state.comments));
  }, [state])

  return (
    <SignedUserContext.Provider value={signedUser}>
      <BoardContext.Provider value={{ state, dispatch }}>
        {children}
      </BoardContext.Provider>
    </SignedUserContext.Provider >
  )
}