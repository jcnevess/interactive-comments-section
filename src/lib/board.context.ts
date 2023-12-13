import { createContext } from "react";
import { AppState } from "./board.reducer";

export const BoardContext = createContext({} as {state: AppState, dispatch: Function});