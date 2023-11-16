import { useFont } from "@react-three/drei";
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
                        onClick={() => changePlace("Persons")}
                    >
                        PERSONS
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
                    "name": "elliptical",
                    "size": [2, 2],
                    "gridPosition": [4, 7]
                },
                {
                    "name": "treadmill",
                    "size": [2, 2],
                    "gridPosition": [7, 3]
                },
                {
                    "name": "treadmill",
                    "size": [2, 2],
                    "gridPosition": [9, 3]
                },
                {
                    "name": "dumbell",
                    "size": [2, 2],
                    "gridPosition": [1, 3]
                },
                {
                    "name": "dumbell",
                    "size": [2, 2],
                    "gridPosition": [1, 4]
                }
            ],
            "size": [6, 5],
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

