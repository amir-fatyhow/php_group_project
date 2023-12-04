import {useContext, useEffect, useRef, useState} from "react";
import { Canvas } from "@react-three/fiber";
import { Lobby } from "./Lobby";
import Chat from "../chat/Chat";
import { CameraControls } from "@react-three/drei";
import { Gym } from "./Gym";
import { Persons } from "./Persons";
import {ServerContext} from "../../../App";


const Menu = ({ logOut, token }: {logOut: () => void, token: string}) => {
    const controls = useRef<CameraControls>(null);
    const[currentPlace, setPlace] = useState("Lobby");
    let chatHash = null;
    const server = useContext(ServerContext);

    async function getChatHash(token: string) {
        return await server.getChatHash(token);
    }

    useEffect(() => {
        const answer = getChatHash(token);
        answer.then((value) => {
            if (value) {
                chatHash = value.chat_hash;
            }
        });
    }, []);

    function changePlace(place: string) {
        setPlace(place);
    }

    function setCamera() {
        if (controls.current) {
            if (currentPlace === "Persons" || currentPlace === "Lobby") {
                controls.current.setPosition(0, 8, 2);
                controls.current.setTarget(0, 8, 0);
                controls.current.setPosition(0, 0, 2, true);
                controls.current.setTarget(0, 0, 0, true);
                return;
            }

            if (currentPlace === "Gym") {
                controls.current.setPosition(0, 8, 2);
                controls.current.setTarget(0, 8, 0);
                controls.current.setTarget(4.75,0,3,true);
                controls.current.setPosition(4.5,5,4.75 + 9,true);
            }
        }
    }

    return (
        <>
            {currentPlace ===  "Lobby" ? <Lobby
                    changePlace={changePlace}
                    logOut={logOut}
                /> :
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
                        {currentPlace === "Gym" && <Gym changePlace={changePlace} setCamera={setCamera} userToken={token}/>}
                        {currentPlace === "Persons" && <Persons changePlace={changePlace} setCamera={setCamera} userToken={token}/>}
                    </>
                </Canvas>}{currentPlace === "Gym" && <Chat userToken={token} chatHash={chatHash}/>}
        </>
    );
}

export default Menu;