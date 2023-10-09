import { Html, useFont } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useAtom } from "jotai";
import { Suspense, useRef } from "react";
import { LobbyAvatar } from "./LobbyAvatar";
import { roomsAtom } from "./RoomLoader";

interface IRoom {
    id : number,
    name: string,
    nbCharacters: number
}

export const Lobby = () => {
  const [rooms] = useAtom(roomsAtom);
  const tablet = useRef(null);

  return (
    <group position-y={-1.5}>
      <motion.group
        ref={tablet}
        scale={0.22}
        position-x={ -0.25 *  Math.min(1, window.innerWidth / 1600)}
        position-z={0.5}
        initial={{
          y: 1.5,
          rotateY: Math.PI / 8,
        }}
        animate={{
          y: 1.5,
        }}
        transition={{
          duration: 1,
          delay: 0.5,
        }}
      >
        <Html
          position={[0, 0.17, 0.11]}
          transform
          center
          scale={0.121}
        >
          <div
            className={`${"w-[390px] h-[514px]"}  max-w-full  overflow-y-auto p-5  place-items-center pointer-events-none select-none`}
          >
            <div className="w-full overflow-y-auto flex flex-col space-y-2">
              <h1 className="text-center text-black text-2xl font-bold">
                WELCOME TO<br /> THE SUPER GYM
              </h1>
              {rooms.map((room: IRoom) => (
                <div
                  key={room.id}
                  className="p-4 rounded-lg bg-slate-800 bg-opacity-70 text-white hover:bg-slate-950 transition-colors cursor-pointer pointer-events-auto"
                >
                  <p className="text-uppercase font-bold text-lg">
                    {room.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        room.nbCharacters > 0 ? "bg-green-500" : "bg-orange-500"
                      }`}
                    ></div>
                    {room.nbCharacters} people in this room
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Html>
      </motion.group>
      <Suspense>
        <LobbyAvatar
          position-z={-1}
          position-x={0.5 * Math.min(1, window.innerWidth / 1600)}
          position-y={0}
          rotation-y={-Math.PI / 8}
        />
      </Suspense>
    </group>
  );
};

useFont.preload("/fonts/Inter_Bold.json");
