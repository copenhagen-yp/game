import {Link} from "react-router-dom";
import React from "react";

export const Navigation = () => {
  return (
    <ul>
      <li><Link to="/sign-in">SignIn</Link></li>
      <li><Link to="/home">Home</Link></li>
      <li><Link to="/play">Game</Link></li>
    </ul>
  );
};
