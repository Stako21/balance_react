import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <>
      <div>Home</div>
      <ul>
        <li><Link to="/zp">ЗП</Link></li>
        <li><Link to="/kr">КР</Link></li>
        <li><Link to="/dp">ДП</Link></li>
      </ul>
    </>
  );
};