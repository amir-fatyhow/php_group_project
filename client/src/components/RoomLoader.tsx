import { useGLTF } from "@react-three/drei";
import {atom, SetStateAction, useAtom} from "jotai";
import { useEffect } from "react";
import pathfinding from "pathfinding";

interface IItem {
  "name": string,
  "size": [number, number],
  "gridPosition": [number, number],
  "rotation": number,
  "walkable"?: boolean,
  "wall"?: boolean
}

interface IRoom {
  id: number,
  "name": string,
  "items": IItem[],
  size: [number, number],
  gridDivision: number,
  characters: number[],
  "grid": pathfinding.Grid,
  "nbCharacters": number
}

export const itemsAtom = atom<IItem[]>([]);
export const roomIDAtom = atom(null);
export const roomsAtom  = atom<IRoom[]>([]);

export const RoomLoader = () => {
  const [items, setItems] = useAtom<IItem[], [SetStateAction<IItem[]>], void>(itemsAtom);
  const [_rooms, setRooms] = useAtom<IRoom[], [SetStateAction<IRoom[]>], void>(roomsAtom);

  const rooms: IRoom[] = [];

  const updateGrid = (room: IRoom) => {
    for (let x = 0; x < room.size[0] * room.gridDivision; x++) {
      for (let y = 0; y < room.size[1] * room.gridDivision; y++) {
        room.grid.setWalkableAt(x, y, true);
      }
    }

    room.items.forEach((item) => {
      if (item.walkable || item.wall) {
        return;
      }
      const width = item.rotation === 1 || item.rotation === 3 ? item.size[1] : item.size[0];
      const height = item.rotation === 1 || item.rotation === 3 ? item.size[0] : item.size[1];
      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          room.grid.setWalkableAt(
              item.gridPosition[0] + x,
              item.gridPosition[1] + y,
              false
          );
        }
      }
    });
  };

  const loadRooms = async () => {
    initialData.forEach((roomItem) => {
      const room: IRoom = {
        ...roomItem,
        size: [7, 7],
        gridDivision: 2,
        characters: [],
        grid: new pathfinding.Grid(
            7 * 2,
            7 * 2
        )
      };
      updateGrid(room);
      rooms.push(room);
    });
  };
  loadRooms();

  useEffect(() => {
    if (!items) {
      return;
    }
    Object.values(items).forEach((item) => {
      useGLTF.preload(`/models/items/${item.name}.glb`);
    });
  }, [items]);

  useEffect(() => {
    function onWelcome() {
      let temp: IRoom[] = rooms.map((room) => ({
        ...room,
        id: room.id,
        name: room.name,
        nbCharacters: room.characters.length,
      }))
      setRooms(temp);
      setItems([]);
    }

    onWelcome();
  }, []);
  return (
      <>
      </>
  )
};

const initialData: IRoom[] = [
  {
    "id": 1,
    "name": "GYM",
    "items": [
      {
        "name": "bear",
        "size": [2, 1],
        "wall": true,
        "gridPosition": [2, 0],
        "rotation": 0
      }
    ],
    "size": [7, 7],
    "gridDivision": 2,
    "characters": [],
    "grid": pathfinding.Grid,
    "nbCharacters": 0
  }
]
