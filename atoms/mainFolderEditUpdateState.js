import { atom } from "recoil";

export const mainFolderEditUpdateState = atom({
    key: 'mainFolderEditUpdateState',
    default: false,
    folder: [{}]
})