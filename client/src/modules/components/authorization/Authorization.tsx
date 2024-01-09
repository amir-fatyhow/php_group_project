import { SyntheticEvent, useContext, useRef, useState } from 'react';
import $ from 'jquery'
import './Authorization.css'
import { ServerContext } from "../../../App";

const Authorization = ({ setMenu } : { setMenu: (login: string, token: string | null) => void}) => {
    const server = useContext(ServerContext);
    const md5 = require('md5');
    const loginSign = useRef<HTMLInputElement>(null);
    const passwordSign = useRef<HTMLInputElement>(null);
    const loginCreate = useRef<HTMLInputElement>(null);
    const nameCreate = useRef<HTMLInputElement>(null);
    const surnameCreate = useRef<HTMLInputElement>(null);
    const passwordCreate = useRef<HTMLInputElement>(null);

    const [error, setError] = useState("");

    async function login(event: SyntheticEvent,
                         login: string,
                         pass: string,
                         setMenu: (login: string, token: string) => void) {
        event.preventDefault();
        if (login.trim() !== '' && pass.trim() !== '') {
            let user = await server.login(login, pass);
            console.log(user);
            if (user) {
                setMenu(login, user.token);
            }
            setError("login or password incorrect   !");
            return;
        }
        setError("login or password is empty!");
    }

    async function registration(event: SyntheticEvent,
                                login: string,
                                pass: string,
                                name: string,
                                surname: string,
                                setMenu: (login: string, token: string | null) => void) {
        event.preventDefault();
        if (login.trim() !== '' && pass.trim() !== '' && name.trim() !== '' && surname.trim() !== '') {
            let token = await server.registration(login, pass, name, surname);
            setMenu(login, token);
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
                        ref={nameCreate}
                        type="text"
                        placeholder="name"
                    />
                    <input
                        ref={surnameCreate}
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
                            registration(
                                event,
                                loginSign.current === null ? '' : loginSign.current.value,
                                passwordSign.current === null ? '' : md5(passwordSign.current.value),
                                surnameCreate.current === null ? '' : surnameCreate.current.value,
                                nameCreate.current === null ? '' : nameCreate.current.value,
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
                        onClick={(event) => login(
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

