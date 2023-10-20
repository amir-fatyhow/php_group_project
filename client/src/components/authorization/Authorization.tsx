import {SyntheticEvent, useContext, useRef, useState} from 'react';
import $ from 'jquery'
import './Authorization.css'
import {ServerContext} from "../../App";

const Authorization = ({ setMenu } : { setMenu: (login: string) => void}) => {
    const server = useContext(ServerContext);
    const md5 = require('md5');
    const loginSign = useRef<HTMLInputElement>(null);
    const passwordSign = useRef<HTMLInputElement>(null);
    const loginCreate = useRef<HTMLInputElement>(null);
    const passwordCreate = useRef<HTMLInputElement>(null);

    const [error, setError] = useState("");

    async function sign(event: SyntheticEvent,
                        login: string,
                        password: string,
                        setMenu: (login: string) => void) {
        event.preventDefault();
        if (login.trim() !== '' && password.trim() !== '') {
            let users = await server.getUsers();
            if (users) {
                let flag = false;
                for (let user of users) {
                    if (login == user['login']) {
                        if (password == user['password']) {
                            flag = true;
                        } else {
                            setError("incorrect password!");
                            return;
                        }
                    }
                }
                if (!flag) {
                    setError("login does not exist!");
                    return;
                }
                setMenu(login);
            }
            setError("login does not exist!");
            return;
        }
        setError("login or password is empty!");
    }

    async function createUser(event: SyntheticEvent,
                              login: string,
                              password: string,
                              setMenu: (login: string) => void) {
        event.preventDefault();
        if (login.trim() !== '' && password.trim() !== '') {
            let users = await server.getUsers();
            if (users) {
                for (let user of users) {
                    if (login == user['login']) {
                        setError("login already exists");
                        return;
                    }
                }
            }
            await server.postUser(login, password);
            setMenu(login);
        }
        setError("login or password is empty!");
    }

    return (
        <div className="login-page">
            <div className="form">
                <span className="error-span">{error ? error : ""}</span>
                <form className="register-form">
                    <input
                        ref={loginSign}
                        type="text"
                        placeholder="login"
                    />
                    <input
                        ref={passwordCreate}
                        type="text"
                        placeholder="name"
                    />
                    <input
                        ref={passwordCreate}
                        type="text"
                        placeholder="surname"
                    />
                    <input
                        ref={passwordSign}
                        type="password"
                        placeholder="password"
                    />
                    <button
                        onClick={(event) => (
                            createUser(
                                event,
                                loginSign.current === null ? '' : loginSign.current.value,
                                passwordSign.current === null ? '' : md5(passwordSign.current.value),
                                setMenu)
                        )
                        }>
                        create
                    </button>
                    <p className="message">Already registered? <a onClick={() => handler()}>Sign In</a></p>
                </form>
                <form className="login-form">
                    <input
                        ref={loginCreate}
                        type="text"
                        placeholder="login"
                    />
                    <input
                        ref={passwordCreate}
                        type="password"
                        placeholder="password"
                    />
                    <button
                        onClick={(event) => sign(
                            event,
                            loginCreate.current === null ? '' : loginCreate.current.value,
                            passwordCreate.current === null ? '' :md5(passwordCreate.current.value),
                            setMenu
                        )}>login</button>
                    <p className="message">Not registered? <a onClick={() => handler()}>Create an account</a></p>
                </form>
            </div>
        </div>
    );
};

export default Authorization;

const handler = () => {
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
}

