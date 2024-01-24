import {IChatHash, IItem, IToken, TBestGamers, TMessage, TUser} from './types';

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

    async login(login: string, hashPass: string, rnd: number): Promise<TUser | null> {
        const answer = await this.request<TUser>('login', { login, hashPass, rnd });
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

    async registration(login: string, hashPass: string, name: string, surname: string): Promise<string | null> {
        return await this.request<string | null>('registration', { login, hashPass, name, surname });
    }

    async sendMessage(token: string, message: string) {
        await this.request<boolean>('sendMessage', { token, message })
    }

    async getMessage(token: string, hash: string) {
        return await this.request<string[] | false>('getMessages', { token, hash });
    }

    async chooseSkin(token: string, skinId: number) {
        return await this.request<boolean>('chooseSkin', { token, skinId });
    }

    async setSkin(token: string) {
        return await this.request<boolean>('setSkin', { token });
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

    async getScore(token: string) {
        return await this.request<number>('getScore', { token });
    }

    async changeGamerStatusDeath(token: string, statusId = 2) {
        return await this.request('setGamerStatus', { token, statusId });
    }

    async changeGamerHash(token: string) {
        return await this.request('changeGamerHash', { token });
    }

    async changedStatusItem(token: string, itemId: number, isUsed: number) {
        await this.request('changeStatusOfItem', { token, itemId, isUsed });
    }

    async changeItemsHash(token: string) {
        await this.request('changeItemsHash', { token });
    }

    async getItemsHash(token: string) {
        return await this.request('getItemsHash', { token });
    }

    async getItemStatus(token: string, itemId: number) {
        return await this.request<number>('getStatusOfItem', { token, itemId });
    }

    async getStatusAllItems(token: string) {
        return await this.request<IItem[]>('getStatusAllItems', { token });
    }

    async setPlayerInBestGamers(token: string, score: number) {
        await this.request('setBestGamers', { token, score });
    }

    async setInitialStateGamer(token: string) {
        await this.request('setInitialStateGamer', { token });
    }

    async getBestGamers(token: string) {
        return this.request<TBestGamers[]>('getBestGamers', { token })
    }
}
