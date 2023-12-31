export interface IUser {
  image: {
    png: string,
    webp: string
  },
  username: string
}

export interface IComment {
  id: number,
  content: string,
  createdAt: string,
  score: number,
  replyingTo?: string,
  user: IUser,
  replies: IComment[]
}