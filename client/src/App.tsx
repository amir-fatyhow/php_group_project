import {createContext, useRef, useState} from "react";
import Authorization from "./components/authorization/Authorization";
import Menu from "./modules/game/Menu";
import {Server} from "./modules/server";
import {HOST} from "./config";
import useServer from "./modules/server";


export const ServerContext = createContext<Server>(null!);
function App() {
    let user = useRef("");
    const [state, setState] = useState('authorization');

    function setMenu(login: string) {
        user.current = login;
        setState('menu')
    }

    function logOut() {
        user.current = "";
        setState('authorization');
    }

    const server = useServer(HOST);
    return (
     <ServerContext.Provider value={server}>
          {
          state === 'authorization' ?
              <Authorization setMenu={setMenu}/> :
              state === 'menu' ? <Menu logOut={logOut}/>
               : <></>
          }
      </ServerContext.Provider>
    );
}

export default App;
