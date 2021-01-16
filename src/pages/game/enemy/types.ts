interface IEnemy {
  x: number,
  y: number,
  radius: number,
  width: number,
  height: number,
  init: () => void,
  draw: () => void,
  setPosition: (x: number, y: number) => void,
  move: (otherSprite?: any) => void
}

export {
  IEnemy
};