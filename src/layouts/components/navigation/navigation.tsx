import { Link } from 'react-router-dom';
import React from 'react';

import { routes } from './../../../routes';

export const Navigation = () => {
  return (
    <ul>
      <li><Link to={routes.signIn.path}>SignIn</Link></li>
      <li><Link to={routes.signUp.path}>SignUp</Link></li>
      <li><Link to={routes.home.path}>Home</Link></li>
      <li><Link to={routes.game.path}>Game</Link></li>
      <li><Link to={routes.leaderboard.path}>Leaderboard</Link></li>
      <li><Link to={routes.forums.path}>Forums</Link></li>
    </ul>
  );
};
