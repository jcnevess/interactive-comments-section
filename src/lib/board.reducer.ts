"use client"

import { IComment } from "./types";

const COMMENTS_OBJECT = "comments";

export type AppState = {
  comments: IComment[],
  commentPendingDeletionId?: number
}

type AddCommentAction = { type: 'ADD_COMMENT', payload: IComment };
type AddReplyAction = { type: 'ADD_REPLY', payload: { reply: IComment, parent: IComment } };
type AddDeletionMarkAction = { type: "ADD_DELETION_MARK", payload: number};
type CleanDeletionMarkAction = { type: "CLEAN_DELETION_MARK"};
type DeleteCommentAction = { type: 'DELETE_COMMENT', payload: number };
/* type EditCommentAction = { type: 'EDIT_COMMENT', payload: number}
type VoteCommentAction = { type: 'VOTE_COMMENT', payload: { comment: IComment, votes: number } };*/

export type AppAction = AddCommentAction | AddReplyAction | 
                          AddDeletionMarkAction | CleanDeletionMarkAction |
                          DeleteCommentAction

export function boardReducer(state: AppState, action: AppAction): AppState {
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

    case "ADD_DELETION_MARK":
      return {
        ...state,
        commentPendingDeletionId: action.payload
      }

    case "CLEAN_DELETION_MARK":
      return {
        ...state,
        commentPendingDeletionId: undefined
      }

    case 'DELETE_COMMENT':
      const numOfOriginalComments = state.comments.length;
      const updatedComments = state.comments.filter(comm => comm.id !== action.payload);
      
      // If the comment is not at top level, check replies
      if(updatedComments.length === numOfOriginalComments) {
        for (let comment of updatedComments) { //modifying a copy
          comment.replies = comment.replies.filter(reply => reply.id !== action.payload);
        }
      }

      return {
        ...state,
        comments: state.comments.filter(comm => comm.id !== action.payload),
        commentPendingDeletionId: undefined
      }

    default:
      return state;
  }
}

export function initializer(initialValue = {} as AppState): AppState {
  let comms = typeof window !== 'undefined' ? localStorage.getItem(COMMENTS_OBJECT) : null 
  if (comms) {
    return {comments: JSON.parse(comms)}
  } else {
    return initialValue
  }
}

export function addComment(comment: IComment): AppAction {
  return {
    type: "ADD_COMMENT", payload: comment
  }
}

export function addReply(reply: IComment, parent: IComment): AppAction {
  return {
    type: "ADD_REPLY", payload: { reply, parent }
  }
}

export function addDeletionMark(id: number): AppAction {
  return {
    type: "ADD_DELETION_MARK", payload: id
  }
}

export function cleanDeletionMark(): AppAction {
  return {
    type: "CLEAN_DELETION_MARK"
  }
}

export function deleteComment(id: number): AppAction {
  return {
    type: "DELETE_COMMENT", payload: id
  }
}