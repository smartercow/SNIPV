import { atom } from "recoil";

export const subFolderEditUpdateState = atom({
    key: 'subFolderEditUpdateState',
    default: false,
    folder: [{}]
})