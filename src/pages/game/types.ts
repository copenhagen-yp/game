interface IMovableCharacter {
  x: number,
  y: number,
  width: number,
  height: number,
  init: () => void,
  draw: () => void,
  setPosition: (x: number, y: number) => void,
  move: (x: number, y: number) => void,
}

type CellType = {
  x: number,
  y: number,
}

type LevelType = {
  MAIN_CHARACTER: CellType,
  EXIT: CellType,
  FOODS: CellType[],
  ENEMIES: CellType[],
  WALLS: CellType[],
}

export { IMovableCharacter, LevelType, CellType };
