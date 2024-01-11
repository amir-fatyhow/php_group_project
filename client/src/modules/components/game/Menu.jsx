import {useContext, useState} from "react";
import { Persons } from "./Persons";
import {ServerContext} from "../../../App";
import './styles/Lobby.css'
import Gym from "./Gym";


const Menu = ({ logOut, token }) => {
    const[place, setPlace] = useState("");
    const server = useContext(ServerContext);

    function changePlace(place) {
        setPlace(place);
    }

    return (
        <>
            {place === 'Gym' ? <Gym changePlace={changePlace} userToken={token}/> :
            <div className="lobby-container">
                <div className="lobby-selection">
                    <form className="lobby-item">
                        <Persons changePlace={changePlace} userToken={token}/>
                        <button
                            onClick={() => logOut()}
                        >
                            EXIT
                        </button>
                    </form>
                </div>
            </div>}
        </>
    );
}

export default Menu;