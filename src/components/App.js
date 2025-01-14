// import logo from './logo.svg';
// import './App.css';

// import logo from '../images/header_logo.svg';
import logo from './images/header_logo.svg';

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
              <div className="aircraft-engine-box">
                <div className="aircraft-type">
                  <h2 className="aircraft-type__name">Выберете облик летательного аппарата</h2>
                  <button
                    className="aircraft-type__aircraft"
                    type="button"
                  // onClick={onEditAvatar}
                  ></button>
                  <button
                    className="aircraft-type__rocket"
                    type="button"
                  // onClick={onEditAvatar}
                  ></button>



                  
                </div>
                <div className="aircraft-engine ">
                  <img
                    className="aircraft-engine__image"
                    // src={currentUser?.avatar}
                    alt="Изображение двигателя"
                  />
                  <h2 className="aircraft-engine__name aircraft-type__name">Выбор двигателя</h2>
                  <div className="aircraft-engine__list">
                  </div>
                </div>
              </div>
              <div className="aircraft-weight">
                <img
                  className="aircraft-weight__image"
                  // src={currentUser?.avatar}
                  alt="Изображение двигателя"
                />
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
        </main>
      </div>
    </div>
  );
}

export default App;
