import React, {useContext, useEffect, useState} from 'react';
import {ServerContext} from "../../../App";

const Rate = ({ userToken } : { userToken: string }) => {
    const css = 'mt-2 inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2 mb-2';
    const [score, setScore] = useState(10);
    const [tiredness, setTiredness] = useState(1);
    const server = useContext(ServerContext);

    async function changeTiredness() {
        let answer = await server.getTiredness(userToken);
        answer = answer ? answer : 1;
        setTiredness(answer);
        console.log(tiredness);
    }

    useEffect(() => {
        const timer = setInterval(() => {
            changeTiredness();
        }, 1500);

        return () => clearInterval(timer);
    });


    return (
        <div>
            {
            tiredness < 2000
            ?
                score > 100 ? <span className={css}>#Поднажми и через {Math.round(score / 10)} лет станешь как Арнольд</span> :
                score > 400 ? <span className={css}>Ещё немного, буквально {Math.round(score / 100)} месяцев и ты будешь как Арни</span> :
                score > 450 ? <span className={css}>Остался один шаг до звания Мистер Олимпия </span> :
                score > 499 ? <span className={css}>Ты легенда, как Арни!</span> : <span className={css}>Тренируйся!</span>
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