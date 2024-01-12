import React, {useState} from 'react';

const Rate = () => {
    const css = 'mt-2 inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mr-2 mb-2';
    const [years, setYears] = useState(10);
    const [tiredness, setTiredness] = useState(10);
    return (
        <div>
            {
            tiredness > 20
            ?
                years > 4 ? <span className={css}>#Поднажми и через {years} лет станешь как Арнольд</span> :
                years > 1 ? <span className={css}>Ещё немного, буквально {years} года и ты будешь как Арни</span> :
                years > 0 ? <span className={css}>Остался {years} год до звания Мистер Олимпия </span> :
                <span className={css}>Ты легенда, как Арни!</span>
            :
                tiredness < 1 ? <span className={css}>Ты проиграл!</span> :
                tiredness < 10 ? <span className={css}>Остановись и отдохни!</span> :
                tiredness < 20 ? <span className={css}>Ты изрядно устал - тебе бы отдохнуть!</span> : <></>
            }

        </div>
    );
};

export default Rate;