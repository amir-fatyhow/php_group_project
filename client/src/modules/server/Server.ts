import { TUser } from './types';

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
            console.log(`${this.HOST}?method=${method}&${query}`)
            const result = await fetch(`${this.HOST}?method=${method}&${query}`);
            const answer = await result.json();
            console.log(answer);
            return answer.data;
        } catch (e) {
            return null;
        }
    }

    async login(
        login: string,
        pass: string
    ): Promise<TUser | null> {
        const answer = await this.request<TUser>(
            'login',
            { login, pass }
        );
        if (answer) {
            this.token = answer.token;
            return answer;
        }
        return null;
    }

    async logout(token: string) {
        const answer = await this.request<boolean>('logout', { token: token });
    }

    async registration(login: string, hash: string, name: string, surname: string) : Promise<string | null> {
        const answer = await this.request('registration', { login, hash, name, surname });
        console.log(answer);
        return "answer";
    }

    async sendMessage(token: string, message: string) {
        const answer = await this.request<boolean>('sendMessage', { token, message })
    }

    async getMessage() {
        return await this.request<boolean>('getMessage');
    }
}
