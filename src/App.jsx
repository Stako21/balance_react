import { useState } from 'react';
import React from 'react';
import { Routes,Route } from 'react-router-dom';
import { Home } from './Components/Home';
import { Header } from './Components/Header';
import { ParseExcel } from './Components/ParseExcel';
import './App.css'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
            path="/zp"
            element={<ParseExcel fileName="balanceZP.xlsx" title="ЗП" />}
          />
          <Route
            path="/kr"
            element={<ParseExcel fileName="balanceKR.xlsx" title="КР" />}
          />
          <Route
            path="/dp"
            element={<ParseExcel fileName="balanceDP.xlsx" title="ДП" />}
          />
      </Routes>
    </>
  )
}

export default App
