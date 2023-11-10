import {useEffect, useRef, useState} from "react";
import { Canvas } from "@react-three/fiber";
import {Lobby, mapAtom} from "./Lobby";
import Chat from "../chat/Chat";
import {CameraControls} from "@react-three/drei";
import {useAtom} from "jotai";
import {Gym} from "./Gym";
import {Persons} from "./Persons";

const Menu = ({ logOut, token }: {logOut: () => void, token: string}) => {
    const [chat, setChat] = useState(false)
    const controls = useRef<CameraControls>(null);
    const [map] = useAtom(mapAtom);
    const[currentPlace, setPlace] = useState("Lobby")

    function changePlace(place: string) {
        console.log(place)
        setPlace(place);
    }

    function setCamera() {
        if (controls.current) {
            if (currentPlace === "Persons" || currentPlace === "Lobby") {
                console.log('persons')
                controls.current.setPosition(0, 8, 2);
                controls.current.setTarget(0, 8, 0);
                controls.current.setPosition(0, 0, 2, true);
                controls.current.setTarget(0, 0, 0, true);
                return;
            }
            // GYM
            if (currentPlace === "Gym") {
                controls.current.setPosition(0, 8, 2);
                controls.current.setTarget(0, 8, 0);
                controls.current.setTarget(4.75,0,4.75,true);
                controls.current.setPosition(4.5,5,4.75 + 10,true);
            }
        }
    }

    function addChat() {
        setChat(true);
    }

    function removeChat() {
        setChat(false);
    }

    return (
        <>
            {chat ?
                <Chat exit={removeChat} userToken={token}/> :
                <Canvas
                shadows
                camera={{
                    position: [0, 8, 2],
                    fov: 30,
                }}
                >
                    <>
                        <ambientLight intensity={0.7} />
                        <directionalLight
                            position={[40, 4, 80]}
                            intensity={0.95}
                            shadow-mapSize={[1024, 24]}
                        >
                            <orthographicCamera
                                attach={"shadow-camera"}
                                args={[-10, 10, 10, -10]}
                                far={22}
                            />
                        </directionalLight>
                        <CameraControls
                            ref={controls}
                            mouseButtons={{
                                left: 0,
                                middle: 0,
                                right: 0,
                                wheel: 0,
                            }}
                            touches={{
                                one: 0,
                                two: 0,
                                three: 0,
                            }}
                        />
                        {currentPlace === "Lobby" && <Lobby
                                changePlace={changePlace}
                                logOut={logOut}
                                addChat={addChat}
                                setCamera={setCamera}
                            />
                        }
                        {currentPlace === "Gym" && map && <Gym changePlace={changePlace} setCamera={setCamera}/>}
                        {currentPlace === "Persons" && <Persons changePlace={changePlace} setCamera={setCamera}/>}
                    </>
                </Canvas>}
        </>
    );
}

export default Menu;