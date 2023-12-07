"use client"

import { SignedUserContext } from "@/lib/signed-user.context"
import { IUser } from "@/lib/types"

interface SignedUserProviderProps {
  children: React.ReactNode
  signedUser: IUser
}

export default function SignedUserProvider(props: SignedUserProviderProps) {
  return (
    <SignedUserContext.Provider value={props.signedUser}>
      {props.children}
    </SignedUserContext.Provider >
  )
}