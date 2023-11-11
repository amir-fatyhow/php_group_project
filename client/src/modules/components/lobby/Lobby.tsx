import { Html, useFont } from "@react-three/drei";
import { atom } from "jotai";
import './styles/Lobby.css'

export const Lobby = ({ changePlace, logOut, addChat } :
                          { changePlace : (param : string) => void , logOut : () => void, addChat : () => void } ) => {

    return (
        <div className="lobby-container">
            <div className="lobby-selection">
                <form className="lobby-item">
                    <button
                        onClick={() => changePlace("Gym")}
                    >
                        GAME
                    </button>
                    <button
                        onClick={() => addChat()}
                    >
                        CHAT
                    </button>
                    <button
                        onClick={() => changePlace("Persons")}
                    >
                        PERS
                    </button>
                    <button
                        onClick={() => logOut()}
                    >
                        EXIT
                    </button>
                </form>
            </div>
        </div>
    );
};

useFont.preload("/fonts/Inter_Bold.json");

export const mapAtom = atom(getItemsInGym(1));

interface RootObject {
    id: number;
    items: Item[];
    size: number[];
    gridDivision: number;
}

interface Item {
    name: string;
    size: number[];
    gridPosition: number[];
}

function getItemsInGym(roomId: number) {
    const gym: RootObject[] = [
        {
            "id": 1,
            "items": [
                {
                    "name": "treadmill",
                    "size": [3, 2],
                    "gridPosition": [10, 9]
                },
                {
                    "name": "paper",
                    "size": [2, 2],
                    "gridPosition": [9, 9]
                },
                {
                    "name": "soda",
                    "size": [2, 2],
                    "gridPosition": [7, 7]
                },
                {
                    "name": "bathtub",
                    "size": [2, 2],
                    "gridPosition": [1, 9]
                }
                ,
                {
                    "name": "unicorn",
                    "size": [2, 2],
                    "gridPosition": [5, 10]
                }
            ],
            "size": [7, 7],
            "gridDivision": 2
        }
    ]
    let room  = gym.find((room) => room.id === roomId);
    if (room) {
        return {
            gridDivision: room.gridDivision,
            size: room.size,
            items: room.items
        }
    }
    return {
        gridDivision: 2,
        size: [7, 7],
        items: [
        {
            "name": "treadmill",
            "size": [3, 2],
            "rotation": 0,
            "gridPosition": [10, 9]
        }
    ]
    };
}

