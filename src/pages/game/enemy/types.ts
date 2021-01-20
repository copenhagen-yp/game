interface IEnemy {
  x: number,
  y: number,
  radiusFindHero: number,
  width: number,
  height: number,
  init: () => void,
  draw: () => void,
  setPosition: (x: number, y: number) => void,
  move: (x: number, y: number) => void,
  update: (otherSprite?: any) => void
}

type Tpath = {
  x: number,
  y: number
}

export {
  IEnemy,
  Tpath
};