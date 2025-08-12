import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FuelComponent from "./FuelComponent";
import FuelPropertyComponent from "./FuelPropertyComponent";
import ChartsSection from "./ChartsSection";
import arrow from "./images/arrow.svg";
import { fuelComponents, fuelProperties } from "./constants";

function ResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const handleRecalculate = () => {
    navigate("/");
  };

  return (
    <main className="main-content">
      {state && (
        <>
          <section className="section-content">
            <h1 className="section-content__name">Состав топлива</h1>
            <div className="cards-container cards-container--two-in-a-row">
              {fuelComponents.map((component, index) => (
                <FuelComponent
                  key={component.id}
                  name={component.name}
                  value={component.value}
                  unit={component.unit}
                  index={index}
                />
              ))}
            </div>
          </section>

          <section className="section-content">
            <h1 className="section-content__name">Характеристики топлива</h1>
            <div className="cards-container cards-container--two-in-a-row">
              {fuelProperties.map((property) => (
                <FuelPropertyComponent
                  key={property.id}
                  name={property.name}
                  value={property.value}
                  unit={property.unit}
                  iconClass={property.iconClass}
                />
              ))}
            </div>
          </section>

          <section className="section-content">
            <h1 className="section-content__name">Результаты расчета</h1>
            <div className="cards-container">
              <div className="data-conteiner">
                <h2 className="data-conteiner__name">КПД топлива</h2>
                <p>{state.fuelEfficiency} %</p>
              </div>
              <div className="data-conteiner">
                <h2 className="data-conteiner__name">Дальность полёта</h2>
                <p>{state.maxRange} км</p>
              </div>
              <div className="data-conteiner">
                <h2 className="data-conteiner__name">Стоимость</h2>
                <p>{state.cost} руб</p>
              </div>
            </div>
          </section>

          <ChartsSection />
        </>
      )}

      <button
        className="calculate-button"
        type="button"
        onClick={handleRecalculate}
      >
        Рассчитать еще{" "}
        <img
          src={arrow}
          className="calculate-button__arrow"
          alt="BigCo Inc. logo"
        />
      </button>

      <footer className="footer">2025. Все права защищены</footer>
    </main>
  );
}

export default ResultsPage;
