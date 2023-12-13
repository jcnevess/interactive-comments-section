"use client"

import { IComment } from "./types";

const COMMENTS_OBJECT = "comments";

export type AppState = {
  comments: IComment[]
}

type AddCommentAction = { type: 'ADD_COMMENT', payload: IComment };
type AddReplyAction = { type: 'ADD_REPLY', payload: { reply: IComment, parent: IComment } }
type DeleteCommentAction = { type: 'DELETE_COMMENT', payload: number };
/* type EditCommentAction = { type: 'EDIT_COMMENT', payload: number}
type VoteCommentAction = { type: 'VOTE_COMMENT', payload: { comment: IComment, votes: number } };*/

export type AppAction = AddCommentAction | AddReplyAction | DeleteCommentAction

export function boardReducer(state: AppState, action: AppAction) {
  switch (action.type) {
    case 'ADD_COMMENT':
      let newComment = action.payload;
      newComment.id = Math.round(Math.random() * 1e6); //FIXME This is a toy example, real code should not do this
      newComment.createdAt = new Date().toISOString();
      return {
        ...state,
        comments: [...state.comments, newComment]
      }

    case 'ADD_REPLY':
      let newReply = action.payload.reply;
      newReply.id = Math.round(Math.random() * 1e6); //FIXME This is a toy example, real code should not do this
      newReply.createdAt = new Date().toISOString();
      let updatedParent = state.comments.find(comm => comm.id === action.payload.parent.id)!
      updatedParent = {...updatedParent }
      updatedParent.replies = updatedParent.replies.concat(newReply)
      return {
        ...state,
        comments: state.comments.filter(comm => comm.id !== action.payload.parent.id).concat(updatedParent)
      }

    case 'DELETE_COMMENT':
      return {
        ...state,
        comments: state.comments.filter(comm => comm.id !== action.payload)
      }

    default:
      return state;
  }
}

export function initializer(initialValue = {} as { comments: IComment[] }): {comments: IComment[]} {
  let comms = typeof window !== 'undefined' ? localStorage.getItem(COMMENTS_OBJECT) : null 
  if (comms) {
    return {comments: JSON.parse(comms)}
  } else {
    return initialValue
  }
}

export function addComment(comment: IComment) {
  return {
    type: "ADD_COMMENT", payload: comment
  }
}

export function addReply(reply: IComment, parent: IComment) {
  return {
    type: "ADD_REPLY", payload: { reply, parent }
  }
}