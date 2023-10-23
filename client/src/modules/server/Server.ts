import {TError, TLogin, TUser} from './types';

interface IObjectKeys {
    [key: string]: string | number;
}

export default class Server {
    private readonly HOST: string;
    private token: string | null;

    constructor(HOST: string) {
        this.HOST = HOST;
        this.token = null;
    }

    async request<T>(
        method: string,
        params: IObjectKeys = {}
    ): Promise<T | null> {
        try {
            if (this.token) {
                params.token = this.token;
            }
            const query = Object.keys(params)
                .map((key: string) => `${key}=${params[key]}`)
                .join('&');
            const result = await fetch(`${this.HOST}?method=${method}&${query}`);
            const answer = await result.json();
            return answer.data;
            // обработать ошибку
            //...

        } catch (e) {
            // обработать ошибку
            //...
            return null;
        }
    }

    async login(
        login: string,
        password: string
    ): Promise<TUser | null> {
        const answer = await this.request<TUser[]>(
            'login',
            { login, password }
        );
        if (answer) {
            this.token = answer[0].token;
            return answer[0];
        }
        return null;
    }

    async logout() {
        const answer = await this.request<boolean>('logout');
        if (answer) {
            this.token = null;
        }
        return answer;
    }

    async registration(login: string, password: string, name: string, surname: string) : Promise<string | null> {
        return this.request('postUser', { login: login, password: password, name: name, surname: surname });
    }
}
