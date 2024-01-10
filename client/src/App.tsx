import { createContext, useRef, useState } from "react";
import Authorization from "./modules/components/authorization/Authorization";
import Menu from "./modules/components/lobby/Menu";
import { Server } from "./modules/server";
import { HOST } from "./config";
import useServer from "./modules/server";


export const ServerContext = createContext<Server>(null!);
function App() {
    const server = useServer(HOST);
    let user = useRef("");
    let userToken = useRef("");
    const [state, setState] = useState('authorization'); //!!! change to authorisation after dones

    function setMenu(login: string, token: string | null) {
        user.current = login;
        if (token != null) {
            userToken.current = token;
        }
        setState('menu')
    }

    function logOut() {
        server.logout(userToken.current);
        user.current = "";
        setState('authorization');
    }

    return (
     <ServerContext.Provider value={server}>
          {
          state === 'authorization' ?
              <Authorization setMenu={setMenu}/> :
              state === 'menu' ? <Menu logOut={logOut} token={userToken.current}/>
               : <></>
          }
      </ServerContext.Provider>
    );
}

export default App;
