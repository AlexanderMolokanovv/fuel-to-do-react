import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header";
import InputComponent from "./InputComponent";
import SliderComponent from "./SliderComponent";
import ResultsPage from "./ResultsPage";
import arrow from "./images/arrow.svg";
import ChartsSection from "./ChartsSection";
import FuelComponent from "./FuelComponent";
import FuelPropertyComponent from "./FuelPropertyComponent";
import CustomSelect from "./CustomSelect";
import {
  cards,
  inputCards,
  fuelComponents,
  fuelProperties,
  additionalFields,
} from "./constants";

function App() {
  // Функция для обработки изменения значения
  const handleValueChange = (id, value) => {
    console.log(`Card ID: ${id}, New Value: ${value}%`);
    // Здесь можно добавить логику отправки на сервер
    // fetch('/api/update', {
    //   method: 'POST',
    //   body: JSON.stringify({ id, value }),
    //   headers: { 'Content-Type': 'application/json' },
    // });
  };

  const handleInputValueChange = (id, value) => {
    console.log(`Input Card ID: ${id}, New Value: ${value}`);
  };

  const navigate = useNavigate();

  // хуки

  const [activeVehicle, setActiveVehicle] = useState(null);

  const handleVehicleClick = (vehicleId) => {
    setActiveVehicle(vehicleId);
    sendVehicleToApi(vehicleId);
  };

  const sendVehicleToApi = async (vehicleId) => {
    try {
      console.log(`Отправка vehicleId ${vehicleId} на сервер`);
      // const response = await apii.selectVehicleType(vehicleId);
      // console.log('API response:', response);
    } catch (error) {
      console.error("Ошибка API:", error);
    }
  };

  const [formData, setFormData] = useState({
    aircraftMass: "",
    engineType: "", // Для хранения выбранного двигателя
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [width, setWidth] = useState(100);

  const changeWidth = (event) => {
    setWidth(event.target.value);

    // Внутри App.jsx, секция "Выбор двигателя"
    // const [formDataa, setFormData] = useState({
    //   engineType: '', // Для хранения выбранного двигателя
    // });

    // const handleInputChange = (e) => {
    //   const { name, value } = e.target;
    //   setFormData((prev) => ({ ...prev, [name]: value }));
    // };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Заглушка для серверных данных
    const serverData = {
      fuelEfficiency: 0.85, // КПД топлива
      maxRange: 1200, // Дальность полёта, км
      cost: 500000, // Стоимость, руб
    };
    try {
      console.log("Отправка на сервер:", {
        ...formData,
        vehicleType: activeVehicle,
      });
      // const response = await apii.calculateFuel({ ...formData, vehicleType: activeVehicle });
      // navigate('/results', { state: { ...formData, vehicleType: activeVehicle, ...response } });
      navigate("/results", {
        state: { ...formData, vehicleType: activeVehicle, ...serverData },
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
                <form>
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
                                activeVehicle === 1
                                  ? "data-conteiner__airplane--active"
                                  : "data-conteiner__airplane"
                              }
                              type="button"
                              onClick={() => handleVehicleClick(1)}
                            ></button>
                            {/* https://translated.turbopages.org/proxy_u/en-ru.ru.dcbf60f6-678fa25f-44b40967-74722d776562/https/www.geeksforgeeks.org/react-suite-dropdown-dropdown-with-icon/ */}
                            <button
                              className={
                                activeVehicle === 2
                                  ? "data-conteiner__rocket--active"
                                  : "data-conteiner__rocket"
                              }
                              type="button"
                              onClick={() => handleVehicleClick(2)}
                            ></button>
                            <button
                              className={
                                activeVehicle === 3
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
                            {/* Выпадающий список */}
                          </div>
                          {/* <select
                            name="engineType"
                            value={formData.engineType}
                            onChange={handleInputChange}
                            className="data-conteiner__select data-conteiner__select--engine appearance-none pr-8"
                            required
                          >
                            <option value="" disabled>
                              Выберите тип двигателя
                            </option>
                            <option value="gasturbine">Газотурбинный</option>
                            <option value="turbojet">Турбореактивный</option>
                            <option value="piston_gasoline">
                              {" "}
                              Поршневой бензин{" "}
                            </option>
                            <option value="piston_diesel">
                              {" "}
                              Поршневой дизель{" "}
                            </option>
                            <option value="ramjet">
                              {" "}
                              Прямоточный воздушно-реактивный{" "}
                            </option>
                            <option value="liquid_rocket">
                              {" "}
                              Жидкостный ракетный{" "}
                            </option>
                            <option value="solid_rocket">
                              {" "}
                              Твердотопливный ракетный{" "}
                            </option>
                          </select> */}

<CustomSelect formData={formData} handleInputChange={handleInputChange} />
                        </div>
                      </div>
                      <div className="box-two-containers">
                        <div className="data-conteiner">
                          <div className="data-conteiner__img-name-container">
                            <div className="data-conteiner__img-conteiner">
                              <div
                                className={additionalFields[1].iconClass}
                              ></div>
                            </div>
                            <h2 className="data-conteiner__name">
                              {additionalFields[1].name}
                            </h2>
                          </div>
                          <input
                            type="number"
                            name="aircraftMass"
                            value={formData.aircraftMass}
                            onChange={handleInputChange}
                            className="data-conteiner__input"
                            placeholder="Введите массу, кг"
                          />
                        </div>
                        <div className="data-conteiner">
                          <div className="data-conteiner__img-name-container">
                            <div className="data-conteiner__img-conteiner">
                              <div
                                className={additionalFields[2].iconClass}
                              ></div>
                            </div>
                            <h2 className="data-conteiner__name">
                              {additionalFields[2].name}
                            </h2>
                          </div>
                          <input
                            type="number"
                            name="fuelTankVolume"
                            value={formData.fuelTankVolume || ""}
                            onChange={handleInputChange}
                            className="data-conteiner__input"
                            placeholder="Введите объем бака, л"
                          />
                        </div>
                        <div className="data-conteiner">
                          <div className="data-conteiner__img-name-container">
                            <div className="data-conteiner__img-conteiner">
                              <div
                                className={additionalFields[3].iconClass}
                              ></div>
                            </div>
                            <h2 className="data-conteiner__name">
                              {additionalFields[3].name}
                            </h2>
                          </div>
                          <input
                            type="number"
                            name="payload"
                            value={formData.payload || ""}
                            onChange={handleInputChange}
                            className="data-conteiner__input"
                            placeholder="Введите полезную нагрузку, кг"
                          />
                        </div>
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
                              initialValue={card.initialValue}
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
                  </section>

                  {/* <div> */}
                  {/* Input Section */}
                  <div className="limiting-parameters-conteiner">
                    {inputCards.map((card) => (
                      <InputComponent
                        key={card.id}
                        id={card.id}
                        name={card.name}
                        initialMinValue={card.initialValue}
                        initialMaxValue={card.initialValue}
                        unit={card.unit}
                        tooltip={card.tooltip}
                        iconClass={card.iconClass}
                        onValueChange={handleInputValueChange}
                      />
                    ))}
                  </div>

                  <button
                    className="calculate-button"
                    type="button"
                    // onClick={onEditAvatar}
                  >
                    Произвести расчет{" "}
                    <img
                      src={arrow}
                      className="calculate-button__arrow"
                      alt="BigCo Inc. logo"
                    />
                  </button>

                  <header className="header">
                    <div className="header__logo"></div>
                    <h1 className="header__name">Результаты расчета</h1>
                  </header>

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
                    <h1 className="section-content__name">
                      Характеристики топлива
                    </h1>
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

                  <ChartsSection />

                  <button
                    className="calculate-button"
                    type="button"
                    // onClick={onEditAvatar}
                  >
                    Рассчитать еще{" "}
                    <img
                      src={arrow}
                      className="calculate-button__arrow"
                      alt="BigCo Inc. logo"
                    />
                  </button>

                  {/* <label>
              Имя:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Отправить" /> */}
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
