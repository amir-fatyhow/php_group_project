import { TUser } from './types';

interface IObjectKeys {
    [key: string]: string | number | null;
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
        this.token = null;
    }

    async registration(login: string, hash: string, name: string, surname: string) : Promise<string | null> {
        const answer = await this.request<string[]>('registration', { login, hash, name, surname });
        if (answer) {
            this.token = answer[0];
        }
        return this.token;
    }

    async sendMessage(token: string, message: string) {
        const answer = await this.request<boolean>('sendMessage', { token, message })
    }

    async getMessage() {
        return await this.request<boolean>('getMessage');
    }

    async choosePerson(token: string, personId: number) {
        const answer = await this.request('choosePerson', { token : token, personId })
        return answer;
    }

    async increaseScore(token: string, points: number) {
        const answer = await this.request('increaseScore', { token: token, points: points })
    }
}
