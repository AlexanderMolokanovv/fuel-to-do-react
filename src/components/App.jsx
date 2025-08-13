import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header";
import InputComponent from "./InputComponent";
import SliderComponent from "./SliderComponent";
import ResultsPage from "./ResultsPage";
import arrow from "./images/arrow.svg";
import CustomSelect from "./CustomSelect";
import { cards, inputCards, additionalFields } from "./constants";

function App() {
  const navigate = useNavigate();

  // Инициализация состояния для всех полей формы
  const [formData, setFormData] = useState({
    vehicleType: 1, // Облик летательного аппарата (по умолчанию 1 - самолет)
    engineType: "", // Выбранный двигатель
    aircraftMass: "", // Масса летательного аппарата
    fuelTankVolume: "", // Объем бака
    payload: "", // Полезная нагрузка
    wsmCoefficients: cards.reduce((acc, card) => ({ ...acc, [card.id]: card.initialValue }), {}), // WSM коэффициенты
    limitingParameters: inputCards.reduce((acc, card) => ({ ...acc, [card.id]: { min: card.initialValue, max: card.initialValue } }), {}), // Ограничивающие параметры
  });

  // Обработка выбора летательного аппарата
  const handleVehicleClick = (vehicleId) => {
    setFormData((prev) => ({ ...prev, vehicleType: vehicleId }));
  };

  // Обработка изменения значений инпутов (масса, бак, нагрузка, двигатель)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Обработка изменения WSM коэффициентов
  const handleValueChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      wsmCoefficients: { ...prev.wsmCoefficients, [id]: value },
    }));
    console.log(`WSM Coefficient ID: ${id}, New Value: ${value}%`);
  };

  // Обработка изменения ограничивающих параметров
  const handleInputValueChange = (id, minValue, maxValue) => {
    setFormData((prev) => ({
      ...prev,
      limitingParameters: {
        ...prev.limitingParameters,
        [id]: { min: minValue, max: maxValue },
      },
    }));
    console.log(`Limiting Parameter ID: ${id}, Min: ${minValue}, Max: ${maxValue}`);
  };

  // Обработка отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Формирование данных для отправки на сервер
    const dataToSend = {
      vehicleType: formData.vehicleType,
      engineType: formData.engineType,
      aircraftMass: parseFloat(formData.aircraftMass) || 0,
      fuelTankVolume: parseFloat(formData.fuelTankVolume) || 0,
      payload: parseFloat(formData.payload) || 0,
      wsmCoefficients: Object.keys(formData.wsmCoefficients).reduce((acc, key) => ({
        ...acc,
        [key]: parseFloat(formData.wsmCoefficients[key]) || 0,
      }), {}),
      limitingParameters: Object.keys(formData.limitingParameters).reduce((acc, key) => ({
        ...acc,
        [key]: {
          min: parseFloat(formData.limitingParameters[key].min) || 0,
          max: parseFloat(formData.limitingParameters[key].max) || 0,
        },
      }), {}),
    };

    // Заглушка для серверных данных
    const serverData = {
      fuelEfficiency: 0.85, // КПД топлива
      maxRange: 1200, // Дальность полёта, км
      cost: 500000, // Стоимость, руб
    };

    try {
      console.log("Отправка на сервер:", dataToSend);
      // const response = await apii.calculateFuel(dataToSend);
      // navigate('/results', { state: { ...dataToSend, ...response } });
      navigate("/results", {
        state: { ...dataToSend, ...serverData },
      });
    } catch (error) {
      console.error("Ошибка API:", error);
    }
  };

  return (
    <div className="whole-page">
      <div className="page">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <main className="main-content">
                <form onSubmit={handleSubmit}>
                  <section className="section-content">
                    <h1 className="section-content__name">
                      Характеристики летательного аппарата
                    </h1>
                    <div className="airplane">
                      <div className="box-two-containers">
                        <div className="data-conteiner">
                          <h2 className="data-conteiner__name">
                            Облик летательного аппарата
                          </h2>
                          <div className="data-conteiner__buttons">
                            <button
                              className={
                                formData.vehicleType === 1
                                  ? "data-conteiner__airplane--active"
                                  : "data-conteiner__airplane"
                              }
                              type="button"
                              onClick={() => handleVehicleClick(1)}
                            ></button>
                            <button
                              className={
                                formData.vehicleType === 2
                                  ? "data-conteiner__rocket--active"
                                  : "data-conteiner__rocket"
                              }
                              type="button"
                              onClick={() => handleVehicleClick(2)}
                            ></button>
                            <button
                              className={
                                formData.vehicleType === 3
                                  ? "data-conteiner__helicopter--active"
                                  : "data-conteiner__helicopter"
                              }
                              type="button"
                              onClick={() => handleVehicleClick(3)}
                            ></button>
                          </div>
                        </div>
                        <div className="data-conteiner">
                          <div className="data-conteiner__img-name-container">
                            <div className="data-conteiner__img-conteiner">
                              <div className="data-conteiner__img-engine"></div>
                            </div>
                            <h2 className="data-conteiner__name">
                              Выбор двигателя
                            </h2>
                          </div>
                          <CustomSelect
                            formData={formData}
                            handleInputChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="box-two-containers">
                        {additionalFields.slice(1).map((field) => (
                          <div className="data-conteiner" key={field.id}>
                            <div className="data-conteiner__img-name-container">
                              <div className="data-conteiner__img-conteiner">
                                <div className={field.iconClass}></div>
                              </div>
                              <h2 className="data-conteiner__name">
                                {field.name}
                              </h2>
                            </div>
                            <input
                              type="number"
                              name={field.id}
                              value={formData[field.id] || ""}
                              onChange={handleInputChange}
                              className="data-conteiner__input"
                              placeholder={`Значение, ${field.unit}`}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="airplane-weight">
                        <h1 className="section-content__name">
                          WSM коэффициенты
                        </h1>
                        <div className="cards-container">
                          {cards.map((card) => (
                            <SliderComponent
                              key={card.id}
                              id={card.id}
                              name={card.name}
                              initialValue={formData.wsmCoefficients[card.id] || card.initialValue}
                              iconClass={card.iconClass}
                              onValueChange={handleValueChange}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className="section-content">
                    <h1 className="section-content__name">
                      Ограничивающие параметры
                    </h1>
                    <div className="limiting-parameters-conteiner">
                      {inputCards.map((card) => (
                        <InputComponent
                          key={card.id}
                          id={card.id}
                          name={card.name}
                          initialMinValue={formData.limitingParameters[card.id]?.min || card.initialValue}
                          initialMaxValue={formData.limitingParameters[card.id]?.max || card.initialValue}
                          unit={card.unit}
                          tooltip={card.tooltip}
                          iconClass={card.iconClass}
                          onValueChange={handleInputValueChange}
                        />
                      ))}
                    </div>
                  </section>
                  <button className="calculate-button" type="submit">
                    Произвести расчет{" "}
                    <img
                      src={arrow}
                      className="calculate-button__arrow"
                      alt="BigCo Inc. logo"
                    />
                  </button>
                </form>
                <footer className="footer">2025. Все права защищены</footer>
              </main>
            }
          />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;