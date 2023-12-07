import {createContext} from "react";
import { IUser } from "./types";

export const SignedUserContext = createContext({} as IUser);