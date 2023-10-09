import { useGLTF } from "@react-three/drei";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import pathfinding from "pathfinding";

export const itemsAtom = atom(null);
export const roomIDAtom = atom(null);
export const roomsAtom = atom([]);

export const Manager = () => {
  const [items, setItems] = useAtom(itemsAtom);
  const [_rooms, setRooms] = useAtom(roomsAtom);

  const rooms = [];

  const updateGrid = (room) => {

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
      const room = {
        ...roomItem,
        size: [7, 7],
        gridDivision: 2,
        characters: [],
      };
      room.grid = new pathfinding.Grid(
          room.size[0] * room.gridDivision,
          room.size[1] * room.gridDivision
      );
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
      let temp = rooms.map((room) => ({
        id: room.id,
        name: room.name,
        nbCharacters: room.characters.length,
      }))
      setRooms(temp);
      setItems({});
    }

    onWelcome();
  }, []);
  return (
      <>
      </>
  )
};

const initialData = [
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
    ]
  },
  {
    "id": 2,
    "name": "BATHROOM",
    "items": [
      {
        "name": "washer",
        "size": [2, 2],
        "gridPosition": [12, 0],
        "rotation": 0
      }
    ]
  },
  {
    "id": 3,
    "name": "TOLCHOK",
    "items": [
      {
        "name": "plant",
        "size": [1, 1],
        "gridPosition": [1, 0],
        "rotation": 0
      }
    ]
  },
  {
    "id": 4,
    "name": "RECEPTION",
    "items": [
      {
        "name": "tableCoffee",
        "size": [4, 2],
        "gridPosition": [5, 4],
        "rotation": 0
      }
    ]
  }
]
