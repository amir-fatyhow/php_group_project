import React, { useContext } from "react";
import { ServerContext } from "../../../App";

export function Persons({ changePlace, userToken } :
                            { changePlace : (param : string) => void, userToken: string}) {
    const css = 'inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-800 mb-4';
    const server = useContext(ServerContext);

    async function setPerson(event: React.MouseEvent<HTMLButtonElement>, typeId: number) {
        event.preventDefault();
        let answer = await server.choosePerson(userToken, typeId);
        changePlace("Gym");
    }

    return (
        <>
            <span className={css}>Кто ты, воин?</span>
            <button
                onClick={(event) => setPerson(event, 1)}
            >
                ботан с бутова
            </button>
            <button
                onClick={(event) => setPerson(event, 2)}
            >
                типа спортсмэн
            </button>
            <button
                onClick={(event) => setPerson(event, 3)}
            >
                не скажу
            </button>
        </>
    );
}
