import React from 'react';
import { Link } from 'react-router-dom';

export const Header = ({ title, lastUpdateTime }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>Last Updated: {lastUpdateTime || "No updates yet"}</p>
      <p><Link to="/">Home</Link></p>
      <hr />
    </div>
  )
}
