import { IMovableCharacter } from '../../game';

interface IEnemy extends IMovableCharacter {
  radiusFindHero: number,
  update: (otherSprite?: IMovableCharacter) => void,
}

type Tpath = {
  x: number,
  y: number
}

export {
  IEnemy,
  Tpath
};
