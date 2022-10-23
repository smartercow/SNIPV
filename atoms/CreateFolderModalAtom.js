import { atom } from "recoil";

export const CreateFolderModalState = atom({
  key: "CreateFolderModalState",
  default: false,
  view: 0,
  folder: {},
  main: false,
});
