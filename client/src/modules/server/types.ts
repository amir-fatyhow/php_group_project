export type TError = {
    code: number,
    text: string,
};

export type TUser = {
    id: number,
    name: string,
    surname: string,
    token: string,
};

export type TLogin = {
    login: string,
    password: string
}