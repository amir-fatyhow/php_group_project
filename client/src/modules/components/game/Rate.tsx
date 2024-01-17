import React, {useContext, useEffect, useState} from 'react';
import {ServerContext} from "../../../App";

const Rate = ({ userToken, changePlace } : { userToken: string, changePlace : (param : string) => void }) => {
    const css = 'mt-2 inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2 mb-2';
    const [[score, tiredness], setXP] = useState([1,1]);
    const server = useContext(ServerContext);

    async function changeXP() {
        let score = await server.getScore(userToken);
        score = score ? score : 1;

        let tiredness = await server.getTiredness(userToken);
        tiredness = tiredness ? tiredness : 1;

        if (tiredness > 3000) {
            await server.setPlayerInBestGamers(userToken, score);
            await server.changeGamerHash(userToken);
            await server.changeGamerStatusDeath(userToken);
            await server.setInitialStateGamer(userToken);
            changePlace('Menu');
        }

        setXP([score, tiredness]);
    }

    useEffect(() => {
        const timer = setInterval(() => {
            changeXP();
        }, 200);
        return () => clearInterval(timer);
    });

    return (
        <div>
            {
            tiredness < 2000
            ?
                score > 20 ? <span className={css}>Ты легенда, как Арни!</span> :
                score > 14 ? <span className={css}>Остался один шаг до звания Мистер Олимпия </span> :
                score > 12 ? <span className={css}>Ещё немного, буквально пару десятков лет и ты будешь как Арни</span> :
                <span className={css}>Тренируйся!</span>
            :
                tiredness > 2999 ? <span className={css}>Ты проиграл!</span> :
                tiredness > 2000 ? <span className={css}>Ты изрядно устал - тебе бы отдохнуть!</span> : <></>
            }
            <span className={css}>
                SCORE = {score} TIREDNESS = {tiredness}
            </span>
        </div>
    );
};

export default Rate;