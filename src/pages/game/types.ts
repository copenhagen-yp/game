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

export { IMovableCharacter };
