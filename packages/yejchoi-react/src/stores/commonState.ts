import {atom} from "jotai";
import {Message} from "../types/commonType.ts";


export const totalAmountState = atom<number>(0)

export const messageState =atom<Message[]>([])