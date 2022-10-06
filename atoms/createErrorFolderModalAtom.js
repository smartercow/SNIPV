import { atom } from "recoil";

export const createErrorFolderModalState = atom({
    key: 'createErrorFolderModalState',
    default: false,
    view: 0,
})