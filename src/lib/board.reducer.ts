"use client"

import { IComment } from "./types";

const COMMENTS_OBJECT = "comments";

export type AppState = {
  comments: IComment[],
  commentPendingDeletionId?: number
}

type AddCommentAction = { type: 'ADD_COMMENT', payload: {comment: IComment} };
type AddReplyAction = { type: 'ADD_REPLY', payload: { reply: IComment, parent: IComment } };
type AddDeletionMarkAction = { type: "ADD_DELETION_MARK", payload: {id: number}};
type CleanDeletionMarkAction = { type: "CLEAN_DELETION_MARK"};
type DeleteCommentAction = { type: 'DELETE_COMMENT', payload: {id: number} };
type UpvoteCommentAction = { type: 'UPVOTE_COMMENT', payload: {id: number} };
type DownvoteCommentAction = { type: 'DOWNVOTE_COMMENT', payload: {id: number} };
type EditCommentAction = { type: 'EDIT_COMMENT', payload: {id: number, content: string}};

export type AppAction = AddCommentAction | AddReplyAction | 
                          AddDeletionMarkAction | CleanDeletionMarkAction |
                          DeleteCommentAction | EditCommentAction |
                          UpvoteCommentAction | DownvoteCommentAction

function addToScore(state: AppState, action: UpvoteCommentAction | DownvoteCommentAction, points: number) {
  let updatedComment = state.comments.find(comm => comm.id === action.payload.id);

  if(updatedComment) {
    updatedComment = {...updatedComment};
    updatedComment.score = updatedComment.score + points;

    return {
      ...state,
      comments: state.comments.filter(comm => comm.id !== action.payload.id).concat(updatedComment ?? []),
      commentPendingDeletionId: undefined
    }
  } else {
    let parentComment: IComment;
    for (let comment of state.comments) {
      parentComment = {...comment};
      let updatedReply = parentComment.replies.find(reply => reply.id === action.payload.id);
      if(updatedReply) {
        updatedReply = {...updatedReply}
        updatedReply.score = updatedReply.score + points;
        parentComment.replies = parentComment.replies.filter(reply => reply.id !== updatedReply!.id).concat(updatedReply);
        updatedComment = parentComment;
        break;
      }
    }

    return {
      ...state,
      comments: state.comments.filter(comm => comm.id !== parentComment?.id).concat(updatedComment ?? []),
      commentPendingDeletionId: undefined
    }
  }      
}

export function boardReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_COMMENT':
      let newComment = action.payload.comment;
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
        commentPendingDeletionId: action.payload.id
      }

    case "CLEAN_DELETION_MARK":
      return {
        ...state,
        commentPendingDeletionId: undefined
      }

    case 'DELETE_COMMENT': {
      const numOfOriginalComments = state.comments.length;
      const updatedComments = state.comments.filter(comm => comm.id !== action.payload.id);
      
      // If the comment is not at top level, check replies
      if(updatedComments.length === numOfOriginalComments) {
        for (let comment of updatedComments) { //modifying a copy
          comment.replies = comment.replies.filter(reply => reply.id !== action.payload.id);
        }
      }

      return {
        ...state,
        comments: state.comments.filter(comm => comm.id !== action.payload.id),
        commentPendingDeletionId: undefined
      }
    }

    case 'UPVOTE_COMMENT': 
      return addToScore(state, action, 1);

    case 'DOWNVOTE_COMMENT':
      return addToScore(state, action, -1);

    case "EDIT_COMMENT": {
      let editedComment = state.comments.find(comm => comm.id === action.payload.id);
      
      if(editedComment) {
        editedComment = {...editedComment}
        editedComment.content = action.payload.content;

        return {
          ...state,
          comments: state.comments.filter(comm => comm.id !== action.payload.id).concat(editedComment)
        }
      } else {
        let parentComment: IComment;
        for (let comment of state.comments) {
          parentComment = {...comment};
          let editedReply = parentComment.replies.find(reply => reply.id === action.payload.id);
          if (editedReply) {
            editedReply = {...editedReply};
            editedReply.content = action.payload.content;
            parentComment.replies = parentComment.replies.filter(reply => reply.id !== editedReply?.id).concat(editedReply);
            break;
          }
        }

        return {
          ...state,
          comments: state.comments.filter(comm => comm.id !== parentComment!.id).concat(parentComment!)
        }
      }
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
    type: "ADD_COMMENT", payload: {comment}
  }
}

export function addReply(reply: IComment, parent: IComment): AppAction {
  return {
    type: "ADD_REPLY", payload: { reply, parent }
  }
}

export function addDeletionMark(id: number): AppAction {
  return {
    type: "ADD_DELETION_MARK", payload: {id}
  }
}

export function cleanDeletionMark(): AppAction {
  return {
    type: "CLEAN_DELETION_MARK"
  }
}

export function deleteComment(id: number): AppAction {
  return {
    type: "DELETE_COMMENT", payload: {id}
  }
}

export function upvoteComment(id: number): AppAction {
  return {
    type: "UPVOTE_COMMENT", payload: {id}
  }
}

export function downvoteComment(id: number): AppAction {
  return {
    type: "DOWNVOTE_COMMENT", payload: {id}
  }
}

export function editComment(id: number, content: string): AppAction {
  return {
    type: "EDIT_COMMENT", payload: {id, content}
  }
}