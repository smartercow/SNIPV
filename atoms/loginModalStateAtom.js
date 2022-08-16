import { atom } from "recoil";

const defaultModalState = {
    open: false,
}

export const Login = atom({
    key: 'defaultModalState',
    default: false,
})