import fsPromises from "fs/promises";
import { IComment, IUser } from "./types";

export interface ILocalData {
  currentUser: IUser,
  comments: IComment[]
}

export async function getLocalData(): Promise<ILocalData> {
  // Get the path of the json file
  const filePath = "public/data/data.json";
  // Read the json file
  const jsonData = await fsPromises.readFile(filePath, {
    encoding: "utf-8"
  });
  // Parse data as json
  const objectData = JSON.parse(jsonData);

  return objectData;
}
