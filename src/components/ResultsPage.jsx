import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FuelComponent from "./FuelComponent";
import FuelPropertyComponent from "./FuelPropertyComponent";
import ChartsSection from "./ChartsSection";
import arrow from "./images/arrow.svg";

// Конфигурация свойств топлива с русскими названиями и единицами измерения
const fuelPropertiesConfig = [
  { id: "freezingTemp", name: "Температура замерзания", unit: "°C", iconClass: "data-conteiner__img-freezing-temp" },
  { id: "density", name: "Плотность", unit: "кг/м³", iconClass: "data-conteiner__img-density" },
  { id: "viscosity", name: "Вязкость", unit: "мПа·с", iconClass: "data-conteiner__img-viscosity" },
  { id: "combustionHeat", name: "Теплота сгорания", unit: "кДж/кг", iconClass: "data-conteiner__img-combustion-heat" },
  { id: "coolingResource", name: "Охлаждающая способность", unit: "кДж/кг", iconClass: "data-conteiner__img-cooling-resource" },
  { id: "thermalConductivity", name: "Теплопроводность", unit: "Вт/(м·К)", iconClass: "data-conteiner__img-thermal-conductivity" },
  { id: "heatCapacity", name: "Теплоёмкость", unit: "Дж/К", iconClass: "data-conteiner__img-heat-capacity" },
  { id: "inductionPeriod", name: "Период индукции", unit: "сек", iconClass: "data-conteiner__img-induction-period" },
  { id: "burningRate", name: "Скорость горения", unit: "м/с", iconClass: "data-conteiner__img-burning-rate" },
  { id: "vaporPressure", name: "Давление паров", unit: "кПа", iconClass: "data-conteiner__img-vapor-pressure" }
];

// Конфигурация для перевода названий компонентов топлива на русский
const fuelComponentsTranslation = {
  Methanol: "Метанол",
  Ethanol: "Этанол",
  Propanol: "Пропанол",
  Butanol: "Бутанол",
  Pentanol: "Пентанол",
  Isopropanol: "Изопропанол",
  Isobutanol: "Изобутанол",
  Neftas: "Нефтяной растворитель",
  Kerosene: "Керосин",
  "TS-1": "ТС-1",
  RT: "РТ",
  OME1: "ОМЕ-1",
  OME2: "ОМЕ-2",
  OME3: "ОМЕ-3",
  OME4: "ОМЕ-4",
  OME5: "ОМЕ-5",
  OME6: "ОМЕ-6",
  Pentane: "Пентан",
  Hexane: "Гексан",
  Heptane: "Гептан",
  Octane: "Октан",
  Nonane: "Нонан",
  Decane: "Декан",
  Undecane: "Ундекан",
  Biodiesel: "Биодизель"
};

function ResultsPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Форматирование свойств топлива
  const fuelProperties = fuelPropertiesConfig.map(property => ({
    ...property,
    value: state?.properties?.[property.id] ? Number(state.properties[property.id]).toFixed(2) : "N/A"
  }));

  // Форматирование состава топлива с переводом на русский
  const fuelMixture = state?.mixture?.map(component => ({
    ...component,
    name: fuelComponentsTranslation[component.name] || component.name, // Переводим на русский
    proportion: (component.proportion * 100).toFixed(2) // Форматируем до 2 знаков
  })) || [];

  // Форматирование результатов расчёта
  const formattedFuelEfficiency = state?.fuelEfficiency ? (Number(state.fuelEfficiency) * 100).toFixed(2) : "N/A";
  const formattedMaxRange = state?.maxRange ? Number(state.maxRange).toFixed(2) : "N/A";
  const formattedCost = state?.cost ? Number(state.cost).toFixed(2) : "N/A";

  const handleRecalculate = () => {
    navigate("/");
  };

  return (
    <div className="whole-page">
      <div className="page">
        <main className="main-content">
          {state ? (
            <>
              <section className="section-content">
                <h1 className="section-content__name">Состав топлива</h1>
                <div className="cards-container cards-container--two-in-a-row">
                  {fuelMixture.map((component, index) => (
                    <FuelComponent
                      key={index}
                      name={component.name}
                      value={component.proportion}
                      unit="%"
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
                    <div className="data-conteiner__img-name-container">
                      <div className="data-conteiner__img-conteiner">
                        <div className="data-conteiner__img-efficiency"></div>
                      </div>
                      <h2 className="data-conteiner__name">КПД топлива</h2>
                    </div>
                    <p className="data-conteiner__val">{formattedFuelEfficiency} %</p>
                  </div>
                  <div className="data-conteiner">
                    <div className="data-conteiner__img-name-container">
                      <div className="data-conteiner__img-conteiner">
                        <div className="data-conteiner__img-range"></div>
                      </div>
                      <h2 className="data-conteiner__name">Дальность полёта</h2>
                    </div>
                    <p className="data-conteiner__val">{formattedMaxRange} км</p>
                  </div>
                  <div className="data-conteiner">
                    <div className="data-conteiner__img-name-container">
                      <div className="data-conteiner__img-conteiner">
                        <div className="data-conteiner__img-cost"></div>
                      </div>
                      <h2 className="data-conteiner__name">Стоимость</h2>
                    </div>
                    <p className="data-conteiner__val">{formattedCost} руб</p>
                  </div>
                </div>
              </section>

              <ChartsSection graphData={state.graphData} />
            </>
          ) : (
            <p>Данные не найдены. Пожалуйста, выполните расчёт заново.</p>
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
              alt="Пересчитать"
            />
          </button>

          <footer className="footer">2025. Все права защищены</footer>
        </main>
      </div>
    </div>
  );
}

export default ResultsPage;