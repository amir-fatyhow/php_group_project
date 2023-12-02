import { useFont } from "@react-three/drei";
import './styles/Lobby.css'

export const Lobby = ({ changePlace, logOut } : { changePlace : (param : string) => void , logOut : () => void }) => {
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

