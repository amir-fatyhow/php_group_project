import { atom, useAtom } from "jotai";
import {useContext, useEffect} from "react";
import { Item } from "./Item";
import { mapAtom } from "./Lobby";
import { Html } from "@react-three/drei";
import {ServerContext} from "../../../App";

export const roomItemsAtom = atom([]);

export const Gym = ({ changePlace, setCamera, userToken } ) => {
    const [map] = useAtom(mapAtom);
    const [items, setItems] = useAtom(roomItemsAtom);
    const server = useContext(ServerContext);

    async function getItems() {
        return await server.getItems();
    }

    useEffect(() => {
        const answer = getItems();
        console.log(answer);
    })

    useEffect(() => {
        setItems(map.items);
    }, [map]);

    useEffect(() => {
        setCamera();
    }, [])

    async function increaseScore() {
        const answer = await server.increaseScore(userToken, 10);
    }

    return (
        <>
            {(map.items).map((item, idx) => (
                <>
                    <Item
                        onClick={() => increaseScore()}
                        key={`${item.name}-${idx}`}
                        item={item}
                    />
                    <Html
                        position={[idx+2, 1.9, 3]}
                        transform
                        center
                        scale={0.2}
                    >
                        <div
                            className="p-4 items-center bg-slate-800 bg-opacity-70 text-white hover:bg-slate-950 transition-colors cursor-pointer pointer-events-auto"
                        >
                            <p className="text-uppercase font-bold text-lg">
                                {item.name}
                            </p>
                        </div>
                    </Html>
                </>
                )

            )
            }
            <mesh
                rotation-x={-Math.PI / 2}
                position-y={-0.002}
                position-x={map.size[0] / 2}
                position-z={map.size[1] / 2}
            >
                <planeGeometry args={map.size} />
                <meshStandardMaterial color="#66d0ff" />
            </mesh>
            <Html
                position={[3.5, 0, 6.11]}
                transform
                center
                scale={0.2}
            >
                <div
                    onClick={() => changePlace("Lobby")}
                    className="p-4 flex gap-3 items-center bg-slate-800 bg-opacity-70 text-white hover:bg-slate-950 transition-colors cursor-pointer pointer-events-auto"
                >
                    <p className="text-uppercase font-bold text-lg">
                        EXIT
                    </p>
                    <div
                        className={"w-4 h-4 rounded-full bg-red-500"}
                    ></div>
                </div>
            </Html>
        </>
    );
};
