import { useRef, useState} from "react";
import Authorization from "./components/authorization/Authorization";
import Menu from "./components/game/Menu";

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
              <Authorization setMenu={setMenu}/> :
              state === 'menu' ? <Menu/>
               : <></>
          }
      </>
    );
}

export default App;
