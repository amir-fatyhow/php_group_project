import React, { useContext } from "react";
import { ServerContext } from "../../../App";

export function Persons({ changePlace, userToken } :
                            { changePlace : (param : string) => void, userToken: string}) {
    const server = useContext(ServerContext);

    async function setPerson(event: React.MouseEvent<HTMLButtonElement>, typeId: number) {
        event.preventDefault();
        let answer = await server.choosePerson(userToken, typeId);
        changePlace("Gym");
    }

    return (
        <>
            <button
                onClick={(event) => setPerson(event, 1)}
            >
                NERD
            </button>
            <button
                onClick={(event) => setPerson(event, 2)}
            >
                SPORTYMAN
            </button>
            <button
                onClick={(event) => setPerson(event, 3)}
            >
                WOMAN
            </button>
        </>
    );
}
