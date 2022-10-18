import { atom } from "recoil";

export const createSetupFolderModalState = atom({
  key: "createSetupFolderModalState",
  default: false,
  view: 0,
  folder: {},
  main: false,
});
