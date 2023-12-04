import React, {useContext, useRef, useState} from 'react';
import './Chat.css';
import { ServerContext } from "../../../App";

const Chat = ({ userToken }) => {
    let token = useRef(userToken);
    const message = useRef(null);
    const formMsg = useRef(null);
    const [messages, setMessages] = useState([]);
    const server = useContext(ServerContext);
    let currentChatHash = "hash";

    async function sendMessage(token, msg) {
        if (msg) {
            await server.changeChatHash(token.current);
            const answer = await server.getChatHash(token.current);
            currentChatHash = answer.chat_hash;
            formMsg.current.reset();
            await server.sendMessage(token.current, msg);
            await getMessage(token.current)
        }
    }

    async function getMessage(token) {
        let data = await server.getMessage(token, currentChatHash);
        let arr = [];
        if (data) {
            for (let el of data) {
                arr.push(el);
            }
            setMessages(arr);
        }
    }


    return (
        <div className="modal">
            <div className="modal__dialog">
                <div className="modal__content chat">
                    <div className="modal__main">
                        <div className="chatbox">
                            <div className="chatbox__row chatbox__row_fullheight">
                                <div className="chatbox__content">
                                    {messages.length !== 0 && messages.map((m) => (
                                        <div className="message">
                                            <div className="message__base">
                                                <div className="message__textbox">
                                                    <span className="message__text">{m.message}</span>
                                                </div>
                                                <div className="message__head">
                                                    <span className="message__note">{m.user_name}</span>
                                                    <span className="message__note">{m.user_surname}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="chatbox__row">
                                <div className="enter">
                                    <form ref={formMsg} className="enter__textarea">
                                        <input ref={message} className="input-send" name="enterMessage" id="enterMessage"
                                                  placeholder="Say message..."></input>
                                    </form>
                                    <div className="btn-box">
                                        <button className="send-btn" onClick={() => sendMessage(token, message.current.value)}>

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