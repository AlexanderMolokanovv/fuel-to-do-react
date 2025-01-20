// import logo from './logo.svg';
// import './App.css';

// import logo from '../images/header_logo.svg';
import logo from './images/header_logo.svg';
import arrow from './images/arrow.svg';

// import './blocks/whole-page/whole-page.css';

// import '../index.css';

function App() {

  return (
    // <div className="App">
    <div className="whole-page">

      <div className="page">
        <header className="header">
          {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}

          {/* <header className="header"> */}
          <img className="header__logo" src={logo} alt="Логотип проекта" />


          {/* </header> */}


          <h1 className="header__name">Нейросетевой проектирование топлив для летательных аппаратов</h1>

        </header>


        <main className="main-content">
          <section className="section-content">
            <h1 className="section-content__name">Характеристики летательного аппарата</h1>
            <div className="aircraft">
              <div className="box-two-containers">
                <div className="data-conteiner">
                  <h2 className="data-conteiner__name">Облик летательного аппарата</h2>
                  <div className="data-conteiner__two-elements-container">
                    <button
                      className="data-conteiner__aircraft"
                      type="button"
                    // onClick={onEditAvatar}
                    ></button>

                    <button
                      className="data-conteiner__rocket"
                      type="button"
                    // onClick={onEditAvatar}
                    ></button>
                  </div>
                </div>



                <div className="data-conteiner">
                  {/* <img
                    className="aircraft-engine__image"
                    // src={currentUser?.avatar}
                    alt="Изображение двигателя"
                  /> */}
                  <div className="data-conteiner__img-name-container">
                    <div className="data-conteiner__img-conteiner">
                      <div className="data-conteiner__img-engine">
                      </div>
                    </div>
                    <h2 className="data-conteiner__name">Выбор двигателя</h2>
                  </div>
                  <div className="data-conteiner__aircraft-engine-list">
                  </div>
                </div>
              </div>


              <div className="box-two-containers">

                <div className="data-conteiner">
                  {/* <img
                    className="aircraft-engine__image"
                    // src={currentUser?.avatar}
                    alt="Изображение двигателя"
                  /> */}
                  <div className="data-conteiner__img-name-container">
                    <div className="data-conteiner__img-conteiner">
                      <div className="data-conteiner__img-engine">
                      </div>
                    </div>
                    <h2 className="data-conteiner__name">Масса летательного аппарата</h2>
                  </div>
                  <div className="data-conteiner__aircraft-engine-list">
                  </div>
                </div>

                <div className="data-conteiner">
                  {/* <img
                    className="aircraft-engine__image"
                    // src={currentUser?.avatar}
                    alt="Изображение двигателя"
                  /> */}
                  <div className="data-conteiner__img-name-container">
                    <div className="data-conteiner__img-conteiner">
                      <div className="data-conteiner__img-engine">
                      </div>
                    </div>
                    <h2 className="data-conteiner__name">Объем бака</h2>
                  </div>
                  <div className="data-conteiner__aircraft-engine-list">
                  </div>
                </div>
                <div className="data-conteiner">
                  {/* <img
                    className="aircraft-engine__image"
                    // src={currentUser?.avatar}
                    alt="Изображение двигателя"
                  /> */}
                  <div className="data-conteiner__img-name-container">
                    <div className="data-conteiner__img-conteiner">
                      <div className="data-conteiner__img-engine">
                      </div>
                    </div>
                    <h2 className="data-conteiner__name">Полезная нагрузка</h2>
                  </div>
                  <div className="data-conteiner__aircraft-engine-list">
                  </div>
                </div>
              </div>



              <div className="aircraft-weight">
                {/* <img
                  className="aircraft-weight__image"
                  // src={currentUser?.avatar}
                  alt="Изображение двигателя"
                /> */}



                <h1 className="section-content__name">Характеристики летательного аппарата</h1>

                <input type="range"/>
                {/*
                посмотреть архив или здесь https://www.kindacode.com/article/using-range-sliders-in-react */}

                <h2 className="aircraft-weight__name">Масса летательного аппарата</h2>
                <div className="aircraft-weight__data">
                </div>
              </div>
              <div className="tank-volume">
                <img
                  className="tank-volume__image"
                  // src={currentUser?.avatar}
                  alt="Изображение двигателя"
                />
                <h2 className="tank-volume__name">Объем бака</h2>
                <div className="tank-volume__data">
                </div>
              </div>
              <div className="payload">
                <img
                  className="payload__image"
                  // src={currentUser?.avatar}
                  alt="Изображение двигателя"
                />
                <h2 className="payload__name">Полезная нагрузка</h2>
                <div className="payload__data">
                </div>
              </div>
            </div>
          </section>

          <section className="section-content">
            <h1 className="section-content__name">Ограничивающие параметры</h1>


            <div className="box-two-containers">
              <div className="data-conteiner">
                {/* <img
                    className="aircraft-engine__image"
                    // src={currentUser?.avatar}
                    alt="Изображение двигателя"
                  /> */}
                <div className="data-conteiner__img-name-container">
                  <div className="data-conteiner__img-conteiner">
                    <div className="data-conteiner__img-engine">
                    </div>
                  </div>
                  <h2 className="data-conteiner__name">Температура застывания</h2>
                </div>
                <div className="data-conteiner__aircraft-engine-list">
                </div>
              </div>

              <div className="data-conteiner">
                {/* <img
                    className="aircraft-engine__image"
                    // src={currentUser?.avatar}
                    alt="Изображение двигателя"
                  /> */}
                <div className="data-conteiner__img-name-container">
                  <div className="data-conteiner__img-conteiner">
                    <div className="data-conteiner__img-engine">
                    </div>
                  </div>
                  <h2 className="data-conteiner__name">Плотность</h2>
                </div>
                <div className="data-conteiner__aircraft-engine-list">
                </div>
              </div>
            </div>
            <div className="box-two-containers">
              <div className="data-conteiner">
                {/* <img
                    className="aircraft-engine__image"
                    // src={currentUser?.avatar}
                    alt="Изображение двигателя"
                  /> */}
                <div className="data-conteiner__img-name-container">
                  <div className="data-conteiner__img-conteiner">
                    <div className="data-conteiner__img-engine">
                    </div>
                  </div>
                  <h2 className="data-conteiner__name">Вязкость при -20С</h2>
                </div>
                <div className="data-conteiner__aircraft-engine-list">
                </div>
              </div>

              <div className="data-conteiner">
                {/* <img
                    className="aircraft-engine__image"
                    // src={currentUser?.avatar}
                    alt="Изображение двигателя"
                  /> */}
                <div className="data-conteiner__img-name-container">
                  <div className="data-conteiner__img-conteiner">
                    <div className="data-conteiner__img-engine">
                    </div>
                  </div>
                  <h2 className="data-conteiner__name">Массовая теплота сгорания, кДж/кг</h2>
                </div>
                <div className="data-conteiner__aircraft-engine-list">
                </div>
              </div>
            </div>
            <div className="box-two-containers">
              <div className="data-conteiner">
                {/* <img
                    className="aircraft-engine__image"
                    // src={currentUser?.avatar}
                    alt="Изображение двигателя"
                  /> */}
                <div className="data-conteiner__img-name-container">
                  <div className="data-conteiner__img-conteiner">
                    <div className="data-conteiner__img-engine">
                    </div>
                  </div>
                  <h2 className="data-conteiner__name">Температура застывания</h2>
                </div>
                <div className="data-conteiner__aircraft-engine-list">
                </div>
              </div>

              <div className="data-conteiner">
                {/* <img
                    className="aircraft-engine__image"
                    // src={currentUser?.avatar}
                    alt="Изображение двигателя"
                  /> */}
                <div className="data-conteiner__img-name-container">
                  <div className="data-conteiner__img-conteiner">
                    <div className="data-conteiner__img-engine">
                    </div>
                  </div>
                  <h2 className="data-conteiner__name">Плотность</h2>
                </div>
                <div className="data-conteiner__aircraft-engine-list">
                </div>
              </div>
            </div>
            <div className="box-two-containers">
              <div className="data-conteiner">
                {/* <img
                    className="aircraft-engine__image"
                    // src={currentUser?.avatar}
                    alt="Изображение двигателя"
                  /> */}
                <div className="data-conteiner__img-name-container">
                  <div className="data-conteiner__img-conteiner">
                    <div className="data-conteiner__img-engine">
                    </div>
                  </div>
                  <h2 className="data-conteiner__name">Температура застывания</h2>
                </div>
                <div className="data-conteiner__aircraft-engine-list">
                </div>
              </div>

              <div className="data-conteiner">
                {/* <img
                    className="aircraft-engine__image"
                    // src={currentUser?.avatar}
                    alt="Изображение двигателя"
                  /> */}
                <div className="data-conteiner__img-name-container">
                  <div className="data-conteiner__img-conteiner">
                    <div className="data-conteiner__img-engine">
                    </div>
                  </div>
                  <h2 className="data-conteiner__name">Плотность</h2>
                </div>
                <div className="data-conteiner__aircraft-engine-list">
                </div>
              </div>
            </div>
            <div className="box-two-containers">
              <div className="data-conteiner">
                {/* <img
                    className="aircraft-engine__image"
                    // src={currentUser?.avatar}
                    alt="Изображение двигателя"
                  /> */}
                <div className="data-conteiner__img-name-container">
                  <div className="data-conteiner__img-conteiner">
                    <div className="data-conteiner__img-engine">
                    </div>
                  </div>
                  <h2 className="data-conteiner__name">Температура застывания</h2>
                </div>
                <div className="data-conteiner__aircraft-engine-list">
                </div>
              </div>

              <div className="data-conteiner">
                {/* <img
                    className="aircraft-engine__image"
                    // src={currentUser?.avatar}
                    alt="Изображение двигателя"
                  /> */}
                <div className="data-conteiner__img-name-container">
                  <div className="data-conteiner__img-conteiner">
                    <div className="data-conteiner__img-engine">
                    </div>
                  </div>
                  <h2 className="data-conteiner__name">Плотность</h2>
                </div>
                <div className="data-conteiner__aircraft-engine-list">
                </div>
              </div>
            </div>
            <button
              className="calculate-button"
              type="button"
            // onClick={onEditAvatar}

            >
              Произвести расчет <img src={arrow} className="calculate-button__arrow" alt="BigCo Inc. logo" /></button>






          </section>

          <footer className="footer">

            2025. Все права защищены

          </footer>

        </main>
      </div>
    </div>
  );
}

export default App;
