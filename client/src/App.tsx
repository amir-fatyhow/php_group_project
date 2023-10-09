import { useRef, useState} from "react";
import Server from "./server";
import Authorization from "./components/authorization/Authorization";
import Menu from "./components/Menu";

const server: Server = new Server();
function App() {
    let user = useRef("");
    const [state, setState] = useState('authorization');

    function setMenu(login: string) {
        user.current = login;
        setState('menu')
    }

    return (
      <>
          {
          state === 'authorization' ?
              <Authorization request={server} setMenu={setMenu}/> :
              state === 'menu' ? <Menu/>
               : <></>
          }
      </>
    );
}

export default App;
