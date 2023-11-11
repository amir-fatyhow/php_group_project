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

export type TLogin = {
    login: string,
    password: string
}
