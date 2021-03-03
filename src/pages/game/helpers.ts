import { gameObjects } from './play-ground/types';

export const checkCollision = (firstObject: gameObjects, secondObject: gameObjects) => {
  let collX = false;
  let collY = false;

  if (
    (firstObject.x + firstObject.width > secondObject.x) &&
    (firstObject.x < secondObject.x + secondObject.width)
  ) {
    collX = true;
  }

  if (
    (firstObject.y + firstObject.height > secondObject.y) &&
    (firstObject.y < secondObject.y + secondObject.height)
  ) {
    collY = true;
  }

  return collX && collY;
};
