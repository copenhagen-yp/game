import React, { useEffect, useRef, useState } from 'react';

import { PlayGround } from './play-ground';

import styles from './game.pcss';

const canvasWidth = 600;
const canvasHeight = 400;

export const Game = () => {
  const canvasRef = useRef(null);
  const [playGround, setPlayGround] = useState<any>(null);

  useEffect(() => {
    const canvasObj: any = canvasRef.current;

    if (canvasObj) {
      const ctx = canvasObj.getContext('2d');
      const playGroundObj = new PlayGround(canvasObj, ctx);

      setPlayGround(playGroundObj);
    }
  }, []);

  useEffect(() => {
    if (playGround) {
      playGround.start();
    }
  }, [playGround]);

  const handleCanvasClick = (event: any)=>{
    if(playGround) {
      playGround.handleClickCanvas(event);
    }
  };

  return (
    <main className={styles.game}>
      <h1>Game</h1>
      <div className={styles.container}>
        <div className={styles.canvasWrapper}>
          <canvas
            className={styles.canvas}
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            onClick={handleCanvasClick}
          />
        </div>
      </div>
    </main>
  );
}
