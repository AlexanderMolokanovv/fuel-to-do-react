import Header from "./Header";
import React, { useState } from "react";
import arrow from "./images/arrow.svg";

function App() {
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
  aircraftMass: '',
  engineType: '', // Для хранения выбранного двигателя
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

  

  return (
    <div className="whole-page">
      <div className="page">
        <Header
        />
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
                      <h2 className="data-conteiner__name">Выбор двигателя</h2>
{/* Выпадающий список */}
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
                  </div>
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

                  {/*
                посмотреть архив или здесь https://www.kindacode.com/article/using-range-sliders-in-react */}

                  <div className="box-two-containers">
                    <div className="data-range-conteiner">
                      <div className="data-range-conteiner__picture-percentages-box">
                        <div className="data-conteiner__img-engine"></div>
                        <h1 className="data-range-conteiner__percentages">
                          {`${width}%`}
                        </h1>
                      </div>
                      <input
                        type="range"
                        className="data-range-conteiner__slider"

 onChange={changeWidth}
        min={0}
        max={100}
        step={1}
        value={width}

                      />
                      <h2 className="data-range-conteiner__name">
                        Дальность полета
                      </h2>
                    </div>
                    <div className="data-range-conteiner">
                      <div className="data-range-conteiner__picture-percentages-box">
                        <div className="data-conteiner__img-engine"></div>
                        <h1 className="data-range-conteiner__percentages">
                          73%
                        </h1>
                      </div>
                      <input
                        type="range"
                        className="data-range-conteiner__slider"
                      />
                      <h2 className="data-range-conteiner__name">
                        Полезная нагрузка
                      </h2>
                    </div>
                    <div className="data-range-conteiner">
                      <div className="data-range-conteiner__picture-percentages-box">
                        <div className="data-conteiner__img-engine"></div>
                        <h1 className="data-range-conteiner__percentages">
                          73%
                        </h1>
                      </div>
                      <input
                        type="range"
                        className="data-range-conteiner__slider"
                      />
                      <h2 className="data-range-conteiner__name">
                        Полезная нагрузка
                      </h2>
                    </div>
                  </div>

                  <div className="box-two-containers">
                    <div className="data-range-conteiner">
                      <div className="data-range-conteiner__picture-percentages-box">
                        <div className="data-conteiner__img-engine"></div>
                        <h1 className="data-range-conteiner__percentages">
                          73%
                        </h1>
                      </div>
                      <input
                        type="range"
                        className="data-range-conteiner__slider"
                      />
                      <h2 className="data-range-conteiner__name">
                        Стоимость владения
                      </h2>
                    </div>
                    <div className="data-range-conteiner">
                      <div className="data-range-conteiner__picture-percentages-box">
                        <div className="data-conteiner__img-engine"></div>
                        <h1 className="data-range-conteiner__percentages">
                          73%
                        </h1>
                      </div>
                      <input
                        type="range"
                        className="data-range-conteiner__slider"
                      />
                      <h2 className="data-range-conteiner__name">Надежность</h2>
                    </div>
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
                    <h2 className="data-conteiner__name">Вязкость при -20С</h2>
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

            <section className="section-content">
              <h1 className="section-content__name">Характеристики топлива </h1>

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
                  </div>
                </div>

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

            {/* <label>
              Имя:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Отправить" /> */}
          </form>
          <footer className="footer">2025. Все права защищены</footer>
        </main>
      </div>
    </div>
  );
}

export default App;
