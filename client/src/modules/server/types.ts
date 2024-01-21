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
    name: string,
    x: number,
    y: number
}
