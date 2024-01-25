import React, {useContext, useEffect, useRef, useState} from 'react';
import './Chat.css';
import { ServerContext } from "../../../App";
import { TMessage } from '../../server/types';

const Chat = ({ userToken } : {userToken: string}) => {
    let token = useRef(userToken);
    const message = useRef<any>(null);
    const formMsg = useRef<HTMLFormElement>(null);
    const [messages, setMessages] = useState<TMessage[]>([]);
    const server = useContext(ServerContext);
    let currentChatHash = useRef("hash");

    async function sendMessage(token: any, msg: string) {
        if (msg) {
            currentChatHash.current = Math.random().toString();
            await server.changeChatHash(token.current);
            if (formMsg.current) {
                formMsg.current?.reset();  //
                await server.sendMessage(token.current, msg);
                await getMessage(token.current)
            }
            
        }
    }

    async function getMessage(token: string) {
        let chatHash = await server.getChatHash(token);
        if (chatHash && currentChatHash.current !== chatHash.chat_hash) {
            let data = await server.getMessage(token, currentChatHash.current);
            currentChatHash.current = chatHash.chat_hash;
            let arr: TMessage[] = [];
            if (data) {
                for (let el of data) {
                    arr.push(el);
                }
                setMessages(arr);
            }
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            getMessage(token.current);
        }, 1000);

        return () => clearInterval(timer);
    });

    return (
        <div className="modal">
            <div className="modal__dialog">
                <div className="modal__content chat">
                    <div className="modal__main">
                        <div className="chatbox">
                            <div className="chatbox__row chatbox__row_fullheight">
                                <div className="chatbox__content">
                                    {messages.length !== 0 && messages.map((m) => (
                                        <div className="message" key={m.message + Math.random()}>
                                            <div className="message__base">
                                                <div className="message__textbox">
                                                    <span className="message__text">{m.message}</span>
                                                </div>
                                                <div className="message__head">
                                                    <span className="message__note">{m.name}</span>
                                                    <span className="message__note">{m.surname}</span>
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
                                                  placeholder="Type a message"></input>
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