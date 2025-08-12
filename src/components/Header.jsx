import React from "react";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const headerTitle =
    location.pathname === "/results"
      ? "Результаты расчета"
      : "Нейросетевой проектирование топлив для летательных аппаратов";

  return (
    <header className="header">
      <div className="header__logo"></div>
      <h1 className="header__name">{headerTitle}</h1>
    </header>
  );
}

export default Header;