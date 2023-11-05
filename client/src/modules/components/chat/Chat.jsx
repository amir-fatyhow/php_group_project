import React, {useContext, useRef, useState} from 'react';
import './Chat.css';
import {ServerContext} from "../../../App";

const Chat = ({exit, userToken}) => {
    let token = useRef(userToken);
    const message = useRef(null);
    const [messages, setMessages] = useState([]);
    const server = useContext(ServerContext);

    function sendMessage(token, message) {
        if (message) {
            server.sendMessage(token.current, message);
        }
    }

    return (
        <div className="modal">
            <div className="modal__dialog">
                <div
                    onClick={() => exit()}
                    className="exit p-2 flex gap-2 items-center bg-slate-700 bg-opacity-70 text-white hover:bg-slate-950 transition-colors cursor-pointer pointer-events-auto"
                >
                    <p className="text-uppercase font-bold text-sm">EXIT</p>
                    <div className={"w-3 h-3 rounded-full bg-red-500"}></div>
                </div>
                <div className="modal__content chat">
                    <div className="modal__main">
                        <div className="chatbox">
                            <div className="chatbox__row chatbox__row_fullheight">
                                <div className="chatbox__content">
                                    <div className="message">
                                        <div className="message__base">
                                            <div className="message__textbox">
                                                {messages.map((message) => {
                                                    <span className="message__text">{message}</span>
                                                })}
                                            </div>
                                            <div className="message__head">
                                                <span className="message__note">Antonio</span>
                                                <span className="message__note">Вчера, 17:00</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="chatbox__row">
                                <div className="enter">
                                    <div className="enter__textarea">
                                        <input ref={message} className="input-send" name="enterMessage" id="enterMessage"
                                                  placeholder="Say message..."></input>
                                    </div>
                                    <div className="btn-box">
                                        <button className="send-btn" onClick={() => sendMessage(token, message.current.value)}>

                                        </button>
                                        <button className="send-btn get" onClick={() => console.log("get message")}>

                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;