import React, { useContext, useEffect, useState } from "react";
import { Persons } from "./Persons";
import { ServerContext } from "../../../App";
import './styles/Lobby.css'
import '../chat/Chat.css';
import Gym from "./Gym";
import { TBestGamers } from "../../server/types";


const Menu = ({ logOut, token }: { logOut: () => void, token: string }) => {
    const [place, setPlace] = useState("");
    const [personId, setpersonId] = useState("");
    const [bestPlayers, setBestGamers] = useState<TBestGamers[]>([]);
    const server = useContext(ServerContext);

    function changePlace(place: string, x?: string) {
        getBestPlayers();
        setPlace(place);
        if (place == 'Gym' && x) {
            setpersonId(x);
        }
    }

    async function getBestPlayers() {
        let answer = await server.getBestGamers(token);
        let arr = [];
        if (answer) {
            for (let bestGamer of answer) {
                arr.push(bestGamer);
            }
            setBestGamers(arr);
        }
    }

    useEffect(() => {
        getBestPlayers();
    }, []);

    return (
        <>
            {place === 'Gym' ? <Gym changePlace={changePlace} userToken={token} personId={personId}/> :
                <>
                    <div className="lobby-container">
                        <div className="lobby-selection">
                            <form className="lobby-item">
                                <Persons changePlace={changePlace} userToken={token} />
                                <button
                                    onClick={() => logOut()}
                                >
                                    EXIT
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="modal">
                        <div className="modal__dialog">
                            <div className="modal__content chat">
                                <div className="modal__main">
                                    <div className="chatbox">
                                        <div className="chatbox__row chatbox__row_fullheight">
                                            <div className="chatbox__content">
                                                {bestPlayers.length !== 0 && bestPlayers.map((m) => (
                                                    <div className="message" key={m.score + Math.random()}>
                                                        <div className="message__base">
                                                            <div className="message__textbox">
                                                                <span className="message__text">BEST SCORE = {m.score}</span>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default Menu;