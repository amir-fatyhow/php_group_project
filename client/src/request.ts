interface IObjectKeys {
    [key: string]: string | number;
}

export default class Request {
    constructor() {
    }

    async send(params:IObjectKeys = {}) {
        const query = Object.keys(params)
            .map((key: string) => `${key}=${params[key]}`)
            .join('&');
        const result = await fetch(`http://server?${query}`);
        const answer = await result.json();
        return answer.data;
    }

    getUsers() {
        return this.send({ method: 'getUsers'});
    }

    postUser(login: string, password: string) {
        return this.send({ method: 'postUser', login: login, password: password});
    }
}
