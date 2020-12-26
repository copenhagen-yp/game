import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <ul>
        <li><Link to="/sign-in">SignIn</Link></li>
        <li><Link to="/home">Home</Link></li>
      </ul>
    </div>
  );
}
