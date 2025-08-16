import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header";
import InputComponent from "./InputComponent";
import SliderComponent from "./SliderComponent";
import ResultsPage from "./ResultsPage";
import arrow from "./images/arrow.svg";
import CustomSelect from "./CustomSelect";
import { cards, inputCards, additionalFields } from "./constants";
import api from "../api/api";

function App() {
  const navigate = useNavigate();

  // Initialize form state
  const [formData, setFormData] = useState({
    vehicleType: 'airplane',
    engineType: "gasturbine",
    aircraftMass: "",
    fuelTankVolume: "",
    payload: "",
    wsmCoefficients: cards.reduce((acc, card) => ({ ...acc, [card.id]: card.initialValue }), {}),
    limitingParameters: inputCards.reduce((acc, card) => ({
      ...acc,
      [card.id]: { 
        min: card.id === "freezingTemp" ? -150 : card.initialMin, // Изменено min
        max: card.initialMax 
      }
    }), {})
  });

  // Handle vehicle type selection
  const handleVehicleClick = (vehicleId) => {
    const vehicleMap = {
      1: 'airplane',
      2: 'rocket',
      3: 'helicopter'
    };
    setFormData((prev) => ({ ...prev, vehicleType: vehicleMap[vehicleId] }));
  };

  // Handle input changes (for aircraftMass, fuelTankVolume, payload, engineType)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle WSM coefficient changes
  const handleValueChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      wsmCoefficients: { ...prev.wsmCoefficients, [id]: Number(value) }
    }));
    console.log(`WSM Coefficient ID: ${id}, New Value: ${value}%`);
  };

  // Handle limiting parameter changes
  const handleInputValueChange = (id, minValue, maxValue) => {
    setFormData((prev) => ({
      ...prev,
      limitingParameters: {
        ...prev.limitingParameters,
        [id]: { min: Number(minValue), max: Number(maxValue) }
      }
    }));
    console.log(`Limiting Parameter ID: ${id}, Min: ${minValue}, Max: ${maxValue}`);
  };

  // Handle form submission with validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Form validation
      const errors = [];
      
      if (!formData.vehicleType) errors.push('Не выбран тип летательного аппарата');
      if (!formData.engineType) errors.push('Не выбран тип двигателя');
      if (formData.aircraftMass === '' || isNaN(parseFloat(formData.aircraftMass)) || parseFloat(formData.aircraftMass) <= 0) {
        errors.push('Масса летательного аппарата должна быть числом больше 0');
      }
      if (formData.fuelTankVolume === '' || isNaN(parseFloat(formData.fuelTankVolume)) || parseFloat(formData.fuelTankVolume) <= 0) {
        errors.push('Объем бака должен быть числом больше 0');
      }
      if (formData.payload === '' || isNaN(parseFloat(formData.payload)) || parseFloat(formData.payload) <= 0) {
        errors.push('Полезная нагрузка должна быть числом больше 0');
      }

      const wsmFields = ['range', 'payload', 'ecology', 'cost', 'reliability'];
      wsmFields.forEach(field => {
        if (!formData.wsmCoefficients[field] || formData.wsmCoefficients[field] < 0 || formData.wsmCoefficients[field] > 100) {
          errors.push(`WSM-коэффициент "${field}" должен быть от 0 до 100`);
        }
      });

      const paramFields = [
        'freezingTemp', 'density', 'viscosity', 'combustionHeat', 'coolingResource',
        'thermalConductivity', 'heatCapacity', 'inductionPeriod', 'burningRate', 'vaporPressure'
      ];
      paramFields.forEach(field => {
        if (formData.limitingParameters[field].min === '' || formData.limitingParameters[field].max === '') {
          errors.push(`Ограничивающие параметры для "${field}" должны содержать min и max`);
        } else if (isNaN(parseFloat(formData.limitingParameters[field].min)) || isNaN(parseFloat(formData.limitingParameters[field].max))) {
          errors.push(`Ограничивающие параметры для "${field}" должны быть числами`);
        } else if (parseFloat(formData.limitingParameters[field].min) > parseFloat(formData.limitingParameters[field].max)) {
          errors.push(`Минимальное значение "${field}" не может быть больше максимального`);
        } else if (
          !['freezingTemp', 'viscosity', 'thermalConductivity', 'vaporPressure'].includes(field) &&
          (parseFloat(formData.limitingParameters[field].min) <= 0 || parseFloat(formData.limitingParameters[field].max) <= 0)
        ) {
          errors.push(`Ограничивающие параметры для "${field}" должны быть больше 0`);
        }
      });

      if (errors.length > 0) {
        throw new Error(`Ошибки в форме: ${errors.join('; ')}`);
      }

      // Prepare data for server
      const dataToSend = {
        vehicleType: formData.vehicleType,
        engineType: formData.engineType,
        aircraftMass: parseFloat(formData.aircraftMass),
        fuelTankVolume: parseFloat(formData.fuelTankVolume),
        payload: parseFloat(formData.payload),
        wsmCoefficients: Object.keys(formData.wsmCoefficients).reduce((acc, key) => ({
          ...acc,
          [key]: parseFloat(formData.wsmCoefficients[key])
        }), {}),
        limitingParameters: Object.keys(formData.limitingParameters).reduce((acc, key) => ({
          ...acc,
          [key]: {
            min: parseFloat(formData.limitingParameters[key].min),
            max: parseFloat(formData.limitingParameters[key].max)
          }
        }), {})
      };

      console.log("Отправка на сервер:", JSON.stringify(dataToSend, null, 2));
      const response = await api.calculateFuel(dataToSend);
      console.log("Ответ сервера:", response);
      navigate("/results", { state: response });
    } catch (error) {
      console.error("Ошибка API:", error);
      alert(`Ошибка: ${error.message}`);
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
                                formData.vehicleType === 'airplane'
                                  ? "data-conteiner__airplane--active"
                                  : "data-conteiner__airplane"
                              }
                              type="button"
                              onClick={() => handleVehicleClick(1)}
                            ></button>
                            <button
                              className={
                                formData.vehicleType === 'rocket'
                                  ? "data-conteiner__rocket--active"
                                  : "data-conteiner__rocket"
                              }
                              type="button"
                              onClick={() => handleVehicleClick(2)}
                            ></button>
                            <button
                              className={
                                formData.vehicleType === 'helicopter'
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
                        {additionalFields.map((field) => (
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
                          initialMinValue={formData.limitingParameters[card.id]?.min || card.initialMin}
                          initialMaxValue={formData.limitingParameters[card.id]?.max || card.initialMax}
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