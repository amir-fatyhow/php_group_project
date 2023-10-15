import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { Item } from "./Item";
import { mapAtom } from "./Lobby";

export const roomItemsAtom = atom([]);

export const Gym = () => {
    const [map] = useAtom(mapAtom);
    const [items, setItems] = useAtom(roomItemsAtom);
    useEffect(() => {
        setItems(map.items);
    }, [map]);

    return (
        <>
            {(map.items).map((item, idx) => (
                <Item
                    key={`${item.name}-${idx}`}
                    item={item}
                />))}
            <mesh
                rotation-x={-Math.PI / 2}
                position-y={-0.002}
                position-x={map.size[0] / 2}
                position-z={map.size[1] / 2}
            >
                <planeGeometry args={map.size} />
                <meshStandardMaterial color="#adacfc" />
            </mesh>
        </>
    );
};
