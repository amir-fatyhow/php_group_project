export type TError = {
    code: number,
    text: string,
};

export type TUser = {
    id: number,
    login: string,
    name: string,
    surname: string,
    password: string
    token: string,
};

export interface TMessage {
    message: string,
    name: string,
    surname: string
}

export type TLogin = {
    login: string,
    password: string
}

export interface IChatHash {
    id: number,
    version: number,
    chat_hash: string
}

export interface IItem {
    isUsed: number
}

export type IToken = {
    token: string
}

export type TBestGamers = {
    name: string,
    surname: string,
    score: number
}

export type TGamer = {
    login: string,
    x: number,
    y: number,
    person_id: number
}

export type TItem = {
    id: number,
    name: string,
    length: number,
    width: number,
    x: number,
    y: number,
    isUsed: number,
    tiredness: number
}

export type TIsFreeze = {
    freeze: number
}

export type TIsTeleported = {
    isTeleported: number
}

export type TPlayerCoordinates = {
    x: number,
    y: number
}