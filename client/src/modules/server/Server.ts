import { IChatHash, TMessage, TUser } from './types';

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
        pass: string,
        hashS: number = 1
    ): Promise<TUser | null> {
        const answer = await this.request<TUser>(
            'login',
            { login, pass, hashS }
        );

        if (answer && answer.token) {
            this.token = answer.token;
            return answer;
        }
        return null;
    }

    async logout(token: string) {
        const answer = await this.request<boolean>('logout', { token: token });
        this.token = null;
    }

    async registration(login: string, hash: string, name: string, surname: string, hashS: number = 1): Promise<string | null> {
        const answer = await this.request<string[]>('registration', { login, hash, name, surname, hashS });

        if (answer && answer[0]) {
            this.token = answer[0];
            return answer[0];
        }
        return null;
    }

    async sendMessage(token: string, message: string) {
        await this.request<boolean>('sendMessage', { token, message })
    }

    async getMessage(token: string, hash: string) {
        return await this.request<string[] | false>('getMessages', { token, hash });
    }

    async choosePerson(token: string, personId: number) {
        return await this.request<boolean>('choosePerson', { token, personId });
    }

    async increaseScore(token: string, points: number) {
        const answer = await this.request('increaseScore', { token, points })
    }

    async getItems() {
        return await this.request('getItems');
    }

    async getChatHash(token: string) {
        const answer = await this.request<IChatHash>('getChatHash', { token });
        if (answer && answer.chat_hash) {
            return answer;
        }
        return null;
    }

    async changeChatHash(token: string) {
        await this.request('changeChatHash', { token });
    }

    async setPersonPosition(token: string, x: number, y: number) {
        await this.request('setPersonPosition', { token, x, y });
    }

    async training(token: string, points: number) {
        await this.request('increaseScore', { token, points });
    }

    async increaseTiredness(token: string, points: number) {
        await this.request('increaseTiredness', { token, points });
    }

    async decreaseTiredness(token: string) {
        await this.request('decreaseTiredness', { token });
    }

    async getTiredness(token: string) {
        return await this.request<number>('getTiredness', { token });
    }
}
