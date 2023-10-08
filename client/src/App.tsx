import React, {useRef, useState} from 'react';
import Authorization from "./components/authorization/Authorization";
import Request from "./request";
import './App.css'

const server: Request = new Request();
function App() {
  let user = useRef("");
  const [state, setState] = useState('authorization');

  function setPoints(login: string) {
    user.current = login;
    setState('points')
  }

  function setSign() {
    setState('authorization')
  }

  return (
      <>
        {
          state === 'authorization' ?
              <Authorization request={server} setPoints={setPoints}/> :
              <div></div>
        }
      </>
  );
}

export default App;

