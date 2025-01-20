import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./Components/Home/Home";
import { Header } from "./Components/Header/Header";
import { ParseExcel } from "./Components/ParseExcel/ParseExcel";
import "./App.scss";

function App() {
  const [lastUpdateTime, setLastUpdateTime] = useState(""); // Состояние для времени обновления
  const [headerTitle, setHeaderTitle] = useState(""); // Состояние для заголовка
  const location = useLocation();

  // Обновляем заголовок в зависимости от маршрута
  React.useEffect(() => {
    if (location.pathname === "/zp") {
      setHeaderTitle("ЗП");
    } else if (location.pathname === "/kr") {
      setHeaderTitle("КР");
    } else if (location.pathname === "/dp") {
      setHeaderTitle("ДП");
    } else {
      setHeaderTitle("Your Title Here"); // Заголовок по умолчанию
    }
  }, [location]);

  return (
    <>
      <Header title={headerTitle} lastUpdateTime={lastUpdateTime} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/zp"
          element={
            <ParseExcel
              fileName="balanceZP.xlsx"
              setLastUpdateTime={setLastUpdateTime}
            />
          }
        />
        <Route
          path="/kr"
          element={
            <ParseExcel
              fileName="balanceKR.xlsx"
              setLastUpdateTime={setLastUpdateTime}
            />
          }
        />
        <Route
          path="/dp"
          element={
            <ParseExcel
              fileName="balanceDP.xlsx"
              setLastUpdateTime={setLastUpdateTime}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
