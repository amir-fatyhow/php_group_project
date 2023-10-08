import { useGLTF } from "@react-three/drei";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import pathfinding from "pathfinding";

export const socket = 1/* = io(
  import.meta.env.VITE_SERVER_URL || "http://localhost:3000"
)*/;
export const charactersAtom = atom([]);
export const mapAtom = atom(null);
export const userAtom = atom(null);
export const itemsAtom = atom(null);
export const roomIDAtom = atom(null);
export const roomsAtom = atom([]);

export const SocketManager = () => {
  const [_characters, setCharacters] = useAtom(charactersAtom);
  const [_map, setMap] = useAtom(mapAtom);
  const [_user, setUser] = useAtom(userAtom);
  const [items, setItems] = useAtom(itemsAtom);
  const [_rooms, setRooms] = useAtom(roomsAtom);

  const rooms = [];

  const updateGrid = (room) => {
    // RESET GRID FOR ROOM
    for (let x = 0; x < room.size[0] * room.gridDivision; x++) {
      for (let y = 0; y < room.size[1] * room.gridDivision; y++) {
        room.grid.setWalkableAt(x, y, true);
      }
    }

    room.items.forEach((item) => {
      if (item.walkable || item.wall) {
        return;
      }
      const width =
          item.rotation === 1 || item.rotation === 3 ? item.size[1] : item.size[0];
      const height =
          item.rotation === 1 || item.rotation === 3 ? item.size[0] : item.size[1];
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
        size: [7, 7], // HARDCODED FOR SIMPLICITY PURPOSES
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

    function onRoomJoined(value) {
      setMap(value.map);
      setUser(value.id);
      setCharacters(value.characters);
    }

    function onCharacters(value) {
      setCharacters(value);
    }

    function onMapUpdate(value) {
      setMap(value.map);
      setCharacters(value.characters);
    }

    function onRooms(value) {
      setRooms(value);
    }


    return () => {

    };
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
    "password": "WAWA",
    "items": [
      {
        "name": "loungeSofaCorner",
        "size": [5, 5],
        "rotation": 3,
        "gridPosition": [0, 0]
      },
      {
        "name": "bear",
        "size": [2, 1],
        "wall": true,
        "gridPosition": [2, 0],
        "rotation": 0
      },
      {
        "name": "tableCoffeeGlassSquare",
        "size": [2, 2],
        "gridPosition": [5, 4],
        "rotation": 0
      },
      {
        "name": "loungeSofa",
        "size": [5, 2],
        "rotation": 1,
        "gridPosition": [8, 2]
      },
      {
        "name": "plant",
        "size": [1, 1],
        "gridPosition": [0, 6],
        "rotation": 0
      },
      {
        "name": "chairCushion",
        "size": [1, 1],
        "rotation": 1,
        "gridPosition": [12, 4]
      },
      {
        "name": "deskComputer",
        "size": [3, 2],
        "gridPosition": [10, 3],
        "rotation": 1
      },
      {
        "name": "deskComputer",
        "size": [3, 2],
        "gridPosition": [3, 10],
        "rotation": 0
      },
      {
        "name": "chairCushion",
        "size": [1, 1],
        "rotation": 0,
        "gridPosition": [4, 12]
      },
      {
        "name": "lampSquareFloor",
        "size": [1, 1],
        "gridPosition": [13, 0],
        "rotation": 0
      },
      {
        "name": "speaker",
        "size": [1, 1],
        "gridPosition": [7, 0],
        "rotation": 0
      },
      {
        "name": "speakerSmall",
        "size": [1, 1],
        "rotation": 2,
        "gridPosition": [10, 6]
      },
      {
        "name": "laptop",
        "size": [1, 1],
        "gridPosition": [6, 0],
        "rotation": 0
      },
      {
        "name": "deskComputer",
        "size": [3, 2],
        "gridPosition": [8, 10],
        "rotation": 0
      },
      {
        "name": "chairCushion",
        "size": [1, 1],
        "rotation": 0,
        "gridPosition": [9, 12]
      },
      {
        "name": "speakerSmall",
        "size": [1, 1],
        "rotation": 3,
        "gridPosition": [0, 5]
      }
    ]
  },
  {
    "id": 2,
    "name": "BATHROOM",
    "password": "WAWA",
    "items": [
      {
        "name": "washer",
        "size": [2, 2],
        "gridPosition": [12, 0],
        "rotation": 0
      },
      {
        "name": "toiletSquare",
        "size": [2, 2],
        "gridPosition": [6, 0],
        "rotation": 0
      },
      {
        "name": "trashcan",
        "size": [1, 1],
        "gridPosition": [8, 0],
        "rotation": 0
      },
      {
        "name": "bathroomCabinetDrawer",
        "size": [2, 2],
        "gridPosition": [4, 0],
        "rotation": 0
      },
      {
        "name": "bathtub",
        "size": [4, 2],
        "gridPosition": [6, 7],
        "rotation": 0
      },
      {
        "name": "bathroomMirror",
        "size": [2, 1],
        "wall": true,
        "gridPosition": [4, 0],
        "rotation": 0
      },
      {
        "name": "bathroomCabinet",
        "size": [2, 1],
        "wall": true,
        "gridPosition": [12, 0],
        "rotation": 0
      },
      {
        "name": "bathroomSink",
        "size": [2, 2],
        "gridPosition": [0, 7],
        "rotation": 1
      },
      {
        "name": "toiletSquare",
        "size": [2, 2],
        "gridPosition": [0, 9],
        "rotation": 1
      },
      {
        "name": "bathroomMirror",
        "size": [2, 1],
        "wall": true,
        "gridPosition": [0, 7],
        "rotation": 1
      },
      {
        "name": "showerRound",
        "size": [2, 2],
        "gridPosition": [0, 0],
        "rotation": 0
      },
      {
        "name": "rugRounded",
        "size": [6, 4],
        "walkable": true,
        "gridPosition": [5, 9],
        "rotation": 0
      },
      {
        "name": "plant",
        "size": [1, 1],
        "gridPosition": [10, 8],
        "rotation": 0
      },
      {
        "name": "plantSmall",
        "size": [1, 1],
        "gridPosition": [0, 11],
        "rotation": 0
      },
      {
        "name": "bookcaseOpenLow",
        "size": [2, 1],
        "gridPosition": [5, 7],
        "rotation": 1
      },
      {
        "name": "tableCoffeeGlassSquare",
        "size": [2, 2],
        "gridPosition": [0, 4],
        "rotation": 0
      }
    ]
  },
  {
    "id": 3,
    "name": "TOLCHOK",
    "password": "WAWA",
    "items": [
      {
        "name": "plant",
        "size": [1, 1],
        "gridPosition": [1, 0],
        "rotation": 0
      },
      {
        "name": "bookcaseOpenLow",
        "size": [2, 1],
        "gridPosition": [2, 0],
        "rotation": 0
      },
      {
        "name": "tableCrossCloth",
        "size": [4, 2],
        "gridPosition": [4, 10],
        "rotation": 0
      },
      {
        "name": "chairCushion",
        "size": [1, 1],
        "rotation": 2,
        "gridPosition": [6, 9]
      },
      {
        "name": "chairCushion",
        "size": [1, 1],
        "rotation": 0,
        "gridPosition": [6, 12]
      },
      {
        "name": "chairCushion",
        "size": [1, 1],
        "rotation": 0,
        "gridPosition": [4, 12]
      },
      {
        "name": "chairCushion",
        "size": [1, 1],
        "rotation": 2,
        "gridPosition": [4, 9]
      },
      {
        "name": "kitchenMicrowave",
        "size": [1, 1],
        "gridPosition": [5, 0],
        "rotation": 0
      },
      {
        "name": "kitchenSink",
        "size": [2, 2],
        "gridPosition": [10, 0],
        "rotation": 0
      },
      {
        "name": "dryer",
        "size": [2, 2],
        "gridPosition": [8, 0],
        "rotation": 0
      },
      {
        "name": "kitchenBlender",
        "size": [1, 1],
        "gridPosition": [6, 0],
        "rotation": 1
      },
      {
        "name": "kitchenCabinetCornerRound",
        "size": [2, 2],
        "gridPosition": [12, 4],
        "rotation": 0
      },
      {
        "name": "kitchenCabinetCornerInner",
        "size": [2, 2],
        "gridPosition": [12, 0],
        "rotation": 0
      },
      {
        "name": "kitchenCabinet",
        "size": [2, 2],
        "gridPosition": [12, 2],
        "rotation": 3
      },
      {
        "name": "plantSmall",
        "size": [1, 1],
        "gridPosition": [0, 0],
        "rotation": 0
      },
      {
        "name": "tableCrossCloth",
        "size": [4, 2],
        "gridPosition": [8, 10],
        "rotation": 0
      },
      {
        "name": "benchCushionLow",
        "size": [2, 1],
        "gridPosition": [9, 12],
        "rotation": 0
      },
      {
        "name": "benchCushionLow",
        "size": [2, 1],
        "gridPosition": [9, 9],
        "rotation": 0
      },
      {
        "name": "kitchenFridge",
        "size": [2, 1],
        "rotation": 3,
        "gridPosition": [0, 3]
      },
      {
        "name": "kitchenFridgeLarge",
        "size": [2, 1],
        "rotation": 1,
        "gridPosition": [0, 12]
      },
      {
        "name": "kitchenStove",
        "size": [2, 2],
        "gridPosition": [0, 6],
        "rotation": 1
      },
      { "name": "bench", "size": [2, 1], "rotation": 3, "gridPosition": [0, 9] }
    ]
  },
  {
    "id": 4,
    "name": "RECEPTION",
    "password": "WAWA",
    "items": [
      {
        "name": "tableCoffee",
        "size": [4, 2],
        "gridPosition": [5, 4],
        "rotation": 0
      },
      {
        "name": "rugRectangle",
        "size": [8, 4],
        "walkable": true,
        "gridPosition": [3, 3],
        "rotation": 0
      },
      {
        "name": "plant",
        "size": [1, 1],
        "gridPosition": [4, 0],
        "rotation": 0
      },
      {
        "name": "speaker",
        "size": [1, 1],
        "gridPosition": [9, 0],
        "rotation": 0
      },
      {
        "name": "loungeChair",
        "size": [2, 2],
        "rotation": 2,
        "gridPosition": [6, 0]
      },
      {
        "name": "plantSmall",
        "size": [1, 1],
        "gridPosition": [3, 0],
        "rotation": 0
      },
      {
        "name": "plant",
        "size": [1, 1],
        "gridPosition": [1, 0],
        "rotation": 0
      },
      {
        "name": "plantSmall",
        "size": [1, 1],
        "gridPosition": [0, 0],
        "rotation": 0
      },
      {
        "name": "plantSmall",
        "size": [1, 1],
        "gridPosition": [1, 1],
        "rotation": 0
      },
      {
        "name": "plant",
        "size": [1, 1],
        "gridPosition": [0, 1],
        "rotation": 0
      },
      {
        "name": "plantSmall",
        "size": [1, 1],
        "gridPosition": [0, 2],
        "rotation": 0
      },
      {
        "name": "televisionModern",
        "size": [4, 2],
        "rotation": 0,
        "gridPosition": [5, 9]
      },
      {
        "name": "lampRoundFloor",
        "size": [1, 1],
        "gridPosition": [11, 0],
        "rotation": 0
      }
    ]
  }
]
