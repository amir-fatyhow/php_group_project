import React, {useContext, useEffect, useState} from 'react';
import {ServerContext} from "../../../App";

const Rate = ({ userToken } : { userToken: string }) => {
    const css = 'mt-2 inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2 mb-2';
    const [[score, tiredness], setXP] = useState([1,1]);
    const server = useContext(ServerContext);

    async function changeXP() {
        let tiredness = await server.getTiredness(userToken);
        tiredness = tiredness ? tiredness : 1;

        if (tiredness > 3000) {
            await server.changeGamerHash(userToken);
            await server.changeGamerStatusDeath(userToken);
        }

        let score = await server.getScore(userToken);
        score = score ? score : 1;
        setXP([score, tiredness]);
    }

    useEffect(() => {
        const timer = setInterval(() => {
            changeXP();
        }, 1500);
        return () => clearInterval(timer);
    });

    return (
        <div>
            {
            tiredness < 2000
            ?
                score > 7000 ? <span className={css}>Ты легенда, как Арни!</span> :
                score > 5000 ? <span className={css}>Остался один шаг до звания Мистер Олимпия </span> :
                score > 4000 ? <span className={css}>Ещё немного, буквально пару лет и ты будешь как Арни</span> :
                <span className={css}>Тренируйся!</span>
            :
                tiredness > 2999 ? <span className={css}>Ты проиграл!</span> :
                tiredness > 2800 ? <span className={css}>Ты изрядно устал - тебе бы отдохнуть!</span> :
                tiredness >= 2000 ? <span className={css}>Остановись и отдохни!</span> : <></>
            }
            <span className={css}>
                SCORE = {score} TIREDNESS = {tiredness}
            </span>
        </div>
    );
};

export default Rate;