import Header from "./Header";
import ResultsPage from "./ResultsPage";
import React, { useState } from "react";
import arrow from "./images/arrow.svg";
import ChartsSection from "./ChartsSection";
import SliderComponent from "./SliderComponent";

import { Routes, Route, useNavigate } from "react-router-dom";

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

  // Данные для карточек
  const cards = [
  {
    id: "range",
    name: "Дальность полета",
    initialValue: 49,
    iconClass: "data-conteiner__img-range"
  },
  {
    id: "payload",
    name: "Полезная нагрузка",
    initialValue: 73,
    iconClass: "data-conteiner__img-payload"
  },
  {
    id: "ecology",
    name: "Экологичность",
    initialValue: 65,
    iconClass: "data-conteiner__img-ecology"
  },
  {
    id: "cost",
    name: "Стоимость владения",
    initialValue: 55,
    iconClass: "data-conteiner__img-cost"
  },
  {
    id: "reliability",
    name: "Надежность",
    initialValue: 80,
    iconClass: "data-conteiner__img-reliability"
  }
]

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
                          <select
                            name="engineType"
                            value={formData.engineType}
                            onChange={handleInputChange}
                            className="data-conteiner__select data-conteiner__select--engine"
                            required
                          >
                            <option value="" disabled>
                              Выберите тип двигателя
                            </option>
                            <option value="turbofan">Турбовентиляторный</option>
                            <option value="turboprop">Турбовинтовой</option>
                            <option value="piston">Поршневой</option>
                          </select>
                          {/* <div className="data-conteiner__input"></div> */}
                        </div>
                      </div>
                      <div className="box-two-containers">
                        <div className="data-conteiner">
                          <div className="data-conteiner__img-name-container">
                            <div className="data-conteiner__img-conteiner">
                              <div className="data-conteiner__img-engine"></div>
                            </div>
                            <h2 className="data-conteiner__name">
                              Масса летательного аппарата
                            </h2>
                          </div>
                          {/* <div className="data-conteiner__input"></div> */}
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
                              <div className="data-conteiner__img-engine"></div>
                            </div>
                            <h2 className="data-conteiner__name">Объем бака</h2>
                          </div>
                          <div className="data-conteiner__input"></div>
                        </div>
                        <div className="data-conteiner">
                          <div className="data-conteiner__img-name-container">
                            <div className="data-conteiner__img-conteiner">
                              <div className="data-conteiner__img-lode"></div>
                            </div>
                            <h2 className="data-conteiner__name">
                              Полезная нагрузка
                            </h2>
                          </div>
                          <div className="data-conteiner__input"></div>
                        </div>
                      </div>

                      <div className="airplane-weight">
                        <h1 className="section-content__name">
                          Характеристики летательного аппарата
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

                    <div className="box-two-containers">
                      <div className="data-conteiner">
                        <div className="data-conteiner__img-name-container">
                          <div className="data-conteiner__img-conteiner">
                            <div className="data-conteiner__img-engine"></div>
                          </div>
                          <h2 className="data-conteiner__name">
                            Температура застывания
                          </h2>
                        </div>
                        <div className="data-conteiner__two-inputs-container">
                          <div className="data-conteiner__input"></div>
                          <div className="data-conteiner__input"></div>
                        </div>
                      </div>

                      <div className="data-conteiner">
                        <div className="data-conteiner__img-name-container">
                          <div className="data-conteiner__img-conteiner">
                            <div className="data-conteiner__img-engine"></div>
                          </div>
                          <h2 className="data-conteiner__name">Плотность</h2>
                        </div>
                        <div className="data-conteiner__two-inputs-container">
                          <div className="data-conteiner__input"></div>
                          <div className="data-conteiner__input"></div>
                        </div>
                      </div>
                    </div>
                    <div className="box-two-containers">
                      <div className="data-conteiner">
                        <div className="data-conteiner__img-name-container">
                          <div className="data-conteiner__img-conteiner">
                            <div className="data-conteiner__img-engine"></div>
                          </div>
                          <h2 className="data-conteiner__name">
                            Вязкость при -20С
                          </h2>
                        </div>
                        <div className="data-conteiner__two-inputs-container">
                          <div className="data-conteiner__input"></div>
                          <div className="data-conteiner__input"></div>
                        </div>
                      </div>

                      <div className="data-conteiner">
                        <div className="data-conteiner__img-name-container">
                          <div className="data-conteiner__img-conteiner">
                            <div className="data-conteiner__img-engine"></div>
                          </div>
                          <h2 className="data-conteiner__name">
                            Массовая теплота сгорания, кДж/кг
                          </h2>
                        </div>
                        <div className="data-conteiner__two-inputs-container">
                          <div className="data-conteiner__input"></div>
                          <div className="data-conteiner__input"></div>
                        </div>
                      </div>
                    </div>
                    <div className="box-two-containers">
                      <div className="data-conteiner">
                        <div className="data-conteiner__img-name-container">
                          <div className="data-conteiner__img-conteiner">
                            <div className="data-conteiner__img-engine"></div>
                          </div>
                          <h2 className="data-conteiner__name">
                            Температура застывания
                          </h2>
                        </div>
                        <div className="data-conteiner__two-inputs-container">
                          <div className="data-conteiner__input"></div>
                          <div className="data-conteiner__input"></div>
                        </div>
                      </div>

                      <div className="data-conteiner">
                        <div className="data-conteiner__img-name-container">
                          <div className="data-conteiner__img-conteiner">
                            <div className="data-conteiner__img-engine"></div>
                          </div>
                          <h2 className="data-conteiner__name">Плотность</h2>
                        </div>
                        <div className="data-conteiner__two-inputs-container">
                          <div className="data-conteiner__input"></div>
                          <div className="data-conteiner__input"></div>
                        </div>
                      </div>
                    </div>
                    <div className="box-two-containers">
                      <div className="data-conteiner">
                        <div className="data-conteiner__img-name-container">
                          <div className="data-conteiner__img-conteiner">
                            <div className="data-conteiner__img-engine"></div>
                          </div>
                          <h2 className="data-conteiner__name">
                            Температура застывания
                          </h2>
                        </div>
                        <div className="data-conteiner__two-inputs-container">
                          <div className="data-conteiner__input"></div>
                          <div className="data-conteiner__input"></div>
                        </div>
                      </div>

                      <div className="data-conteiner">
                        <div className="data-conteiner__img-name-container">
                          <div className="data-conteiner__img-conteiner">
                            <div className="data-conteiner__img-engine"></div>
                          </div>
                          <h2 className="data-conteiner__name">Плотность</h2>
                        </div>
                        <div className="data-conteiner__two-inputs-container">
                          <div className="data-conteiner__input"></div>
                          <div className="data-conteiner__input"></div>
                        </div>
                      </div>
                    </div>
                    <div className="box-two-containers">
                      <div className="data-conteiner">
                        <div className="data-conteiner__img-name-container">
                          <div className="data-conteiner__img-conteiner">
                            <div className="data-conteiner__img-engine"></div>
                          </div>
                          <h2 className="data-conteiner__name">
                            Температура застывания
                          </h2>
                        </div>
                        <div className="data-conteiner__two-inputs-container">
                          <div className="data-conteiner__input"></div>
                          <div className="data-conteiner__input"></div>
                        </div>
                      </div>

                      <div className="data-conteiner">
                        <div className="data-conteiner__img-name-container">
                          <div className="data-conteiner__img-conteiner">
                            <div className="data-conteiner__img-engine"></div>
                          </div>
                          <h2 className="data-conteiner__name">Плотность</h2>
                        </div>
                        <div className="data-conteiner__two-inputs-container">
                          <div className="data-conteiner__input"></div>
                          <div className="data-conteiner__input"></div>
                        </div>
                      </div>
                    </div>
                  </section>

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
                    <h1 className="section-content__name">Состав топлива </h1>

                    <div className="box-two-containers">
                      <div className="res-content">
                        <h2 className="res-content__name">Компонент 1</h2>
                        <h2 className="res-content__val">74%</h2>
                      </div>
                      <div className="res-content">
                        <h2 className="res-content__name">Компонент 2</h2>
                        <h2 className="res-content__val">74%</h2>
                      </div>
                    </div>
                    <div className="box-two-containers">
                      <div className="res-content">
                        <h2 className="res-content__name">Компонент 3</h2>
                        <h2 className="res-content__val">74%</h2>
                      </div>
                      <div className="res-content">
                        <h2 className="res-content__name">Компонент 4</h2>
                        <h2 className="res-content__val">74%</h2>
                      </div>
                    </div>
                    <div className="box-two-containers">
                      <div className="res-content">
                        <h2 className="res-content__name">Компонент 5</h2>
                        <h2 className="res-content__val">74%</h2>
                      </div>
                      <div className="res-content">
                        <h2 className="res-content__name">Компонент 6</h2>
                        <h2 className="res-content__val">74%</h2>
                      </div>
                    </div>
                  </section>

                  <section className="section-content">
                    <h1 className="section-content__name">
                      Характеристики топлива{" "}
                    </h1>
                    <div className="box-two-containers">
                      <div className="data-conteiner">
                        <div className="data-conteiner__img-name-container">
                          <div className="data-conteiner__img-conteiner">
                            <div className="data-conteiner__img-engine"></div>
                          </div>
                          <h2 className="res-content__name">
                            Температура застывания
                          </h2>
                        </div>
                        <h2 className="res-content__val">74</h2>
                      </div>

                      <div className="data-conteiner">
                        <div className="data-conteiner__img-name-container">
                          <div className="data-conteiner__img-conteiner">
                            <div className="data-conteiner__img-engine"></div>
                          </div>
                          <h2 className="res-content__name">
                            Температура застывания
                          </h2>
                        </div>

                        <h2 className="res-content__val">55</h2>
                      </div>
                    </div>

                    <div className="box-two-containers">
                      <div className="data-conteiner">
                        <div className="data-conteiner__img-name-container">
                          <div className="data-conteiner__img-conteiner">
                            <div className="data-conteiner__img-engine"></div>
                          </div>
                          <h2 className="res-content__name">
                            Температура застывания
                          </h2>
                        </div>
                        <h2 className="res-content__val">44</h2>
                      </div>

                      <div className="data-conteiner">
                        <div className="data-conteiner__img-name-container">
                          <div className="data-conteiner__img-conteiner">
                            <div className="data-conteiner__img-engine"></div>
                          </div>
                          <h2 className="res-content__name">
                            Температура застывания
                          </h2>
                        </div>

                        <h2 className="res-content__val">74</h2>
                      </div>
                    </div>
                    <div className="box-two-containers">
                      <div className="data-conteiner">
                        <div className="data-conteiner__img-name-container">
                          <div className="data-conteiner__img-conteiner">
                            <div className="data-conteiner__img-engine"></div>
                          </div>
                          <h2 className="res-content__name">
                            Температура застывания
                          </h2>
                        </div>
                        <h2 className="res-content__val">741</h2>
                      </div>

                      <div className="data-conteiner">
                        <div className="data-conteiner__img-name-container">
                          <div className="data-conteiner__img-conteiner">
                            <div className="data-conteiner__img-engine"></div>
                          </div>
                          <h2 className="res-content__name">
                            Температура застывания
                          </h2>
                        </div>

                        <h2 className="res-content__val">74</h2>
                      </div>
                    </div>

                    <div className="box-two-containers">
                      <div className="data-conteiner">
                        <div className="data-conteiner__img-name-container">
                          <div className="data-conteiner__img-conteiner">
                            <div className="data-conteiner__img-engine"></div>
                          </div>
                          <h2 className="res-content__name">
                            Температура застывания
                          </h2>
                        </div>
                        <h2 className="res-content__val">562</h2>
                      </div>

                      <div className="data-conteiner">
                        <div className="data-conteiner__img-name-container">
                          <div className="data-conteiner__img-conteiner">
                            <div className="data-conteiner__img-engine"></div>
                          </div>
                          <h2 className="res-content__name">
                            Температура застывания
                          </h2>
                        </div>

                        <h2 className="res-content__val">45</h2>
                      </div>
                    </div>

                    <div className="box-two-containers">
                      <div className="data-conteiner">
                        <div className="data-conteiner__img-name-container">
                          <div className="data-conteiner__img-conteiner">
                            <div className="data-conteiner__img-engine"></div>
                          </div>
                          <h2 className="res-content__name">
                            Температура застывания
                          </h2>
                        </div>
                        <h2 className="res-content__val">14</h2>
                      </div>

                      <div className="data-conteiner">
                        <div className="data-conteiner__img-name-container">
                          <div className="data-conteiner__img-conteiner">
                            <div className="data-conteiner__img-engine"></div>
                          </div>
                          <h2 className="res-content__name">
                            Температура застывания
                          </h2>
                        </div>

                        <h2 className="res-content__val">142</h2>
                      </div>
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
