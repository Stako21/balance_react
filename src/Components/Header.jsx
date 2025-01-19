import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div>
      <h1>Header</h1>
      <p><Link to="/">Home</Link></p>
      <hr />
    </div>
  )
}
