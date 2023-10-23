import React from 'react';
import './Chat.css';

const Chat = ({exit}) => {
    return (
        <div className="modal">
            <div className="modal__dialog">
                <div
                    onClick={() => exit()}
                    className="exit p-2 flex gap-2 items-center rounded-lg bg-slate-800 bg-opacity-70 text-white hover:bg-slate-950 transition-colors cursor-pointer pointer-events-auto"
                >
                    <p className="text-uppercase font-bold text-sm">
                        EXIT
                    </p>
                    <div
                        className={"w-3 h-3 rounded-full bg-red-500"}
                    ></div>
                </div>
                <div className="modal__content chat">
                    <div className="modal__main">
                        <div className="chatbox">
                            <div className="chatbox__row chatbox__row_fullheight">
                                <div className="chatbox__content">
                                    <div className="message">
                                        <div className="message__base">
                                            <div className="message__textbox">
                                                <span className="message__text">Hello, Bogdan! Yes, funny smiles</span>
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
                                        <textarea name="enterMessage" id="enterMessage" cols="30" rows="2"
                                                  placeholder="Say message..."></textarea>
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