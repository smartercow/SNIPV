import { atom } from "recoil";

export const createCodeFolderModalState = atom({
  key: "createCodeFolderModalState",
  default: false,
  view: 0,
  folder: {},
  main: false,
});
