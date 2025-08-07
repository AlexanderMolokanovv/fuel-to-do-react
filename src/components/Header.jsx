// import React from "react";
function Header() {

  return (
<header className="header">
          <div className="header__logo">
          </div>
         

          <h1 className="header__name">Нейросетевой проектирование топлив для летательных аппаратов</h1>
          {/* <h1 className="header__name">Результаты расчета</h1> */}

        </header>
  );
}
export default Header;


// import React from "react";
// import {  useContext,  useState } from "react";
// import { useLocation, Link } from "react-router-dom";
// // componentDidUpdate, NameClassComponent, useForceUpdate
// // import { CurrentUserContext } from "../contexts/CurrentUserContext";
// // import logo from "../images/header_logo.svg";

// function Header() {
// // { onSignOut }
//   // const currentUser = useContext(CurrentUserContext);
//   // const [menuIsOpen, setMenuIsOpen] = useState(true);

//   // const location = useLocation();

//   // const toggleMenu = () => setMenuIsOpen(!menuIsOpen);

//   // const logoutMobile = () => {
//   //   onSignOut();
//   //   setMenuIsOpen(true);
//   // };

//   // const Icons = () => (
//   //   <button
//   //     className={menuIsOpen ? "header__close-button" : "header__menu-button"}
//   //     type="button"
//   //     onClick={toggleMenu}
//   //   />
//   // );

//   return (
//         <header className="header">
//       {/* <Header /> */}
//       <div className="header__logo"></div>
//       <h1 className="header__name">
//         Нейросетевой проектирование топлив для летательных аппаратов
//       </h1>
//     </header>
//   );
// }
// export default Header;


// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useContext } from 'react';
// import CurrentUserContext from '../contexts/CurrentUserContext';
// import logo from '../images/header_logo.svg';

// function Header() {
//   // const { isLoggedIn } = useContext(CurrentUserContext);

//   return (
//     <header className="header">
//     {/* //   <img src={logo} alt="Fuel Design Logo" className="header__logo" />
//     //   <h1 className="header__name">
//     //     Нейросетевой проектирование топлив для летательных аппаратов
//     //   </h1>
//     //   <nav className="header__nav">
//     //     <NavLink to="/" className="header__link">
//     //       Ввод данных
//     //     </NavLink>
//     //     <NavLink to="/results" className="header__link">
//     //       Результаты
//     //     </NavLink>
//     //     {isLoggedIn ? ( */}
//     {/* //       <NavLink to="/profile" className="header__link">
//     //         Профиль
//     //       </NavLink>
//     //     ) : (
//     //       <NavLink to="/login" className="header__link">
//     //         Войти
//     //       </NavLink>
//     //     )}
//     //   </nav> */}
//      </header>
//   );
// }

// export default Header;