import {createContext, useRef, useState} from "react";
import Authorization from "./components/authorization/Authorization";
import Menu from "./modules/game/Menu";
import {Server} from "./modules/server";
import {HOST} from "./config";
import useServer from "./modules/server";


export const ServerContext = createContext<Server>(null!);
function App() {
    const server = useServer(HOST);
    let user = useRef("");
    const [state, setState] = useState('authorization');

    function setMenu(login: string) {
        user.current = login;
        setState('menu')
    }

    function logOut() {
        server.logout(user.current);
        user.current = "";
        setState('authorization');
    }

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
