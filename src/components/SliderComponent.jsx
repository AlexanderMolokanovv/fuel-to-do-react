import React, { useState } from 'react';

const SliderComponent = () => {
  const [width, setWidth] = useState(49); // Начальное значение из изображения

  const changeWidth = (e) => {
    setWidth(e.target.value);
  };

  return (
   <>
      <div className="data-range-conteiner__picture-percentages-box">
        <div className="data-conteiner__img-engine"></div>
        <h1 className="data-range-conteiner__percentages">{`${width}%`}</h1>
      </div>
      <div className="data-range-conteiner__slider-track">
        <div
          className="data-range-conteiner__slider-left-track"
          style={{ width: `${width}%` }}
        ></div>
        <div className="data-range-conteiner__slider-right-track"></div>
      <input
        type="range"
        className="data-range-conteiner__slider-input"
        onChange={changeWidth}
        min={0}
        max={100}
        step={1}
        value={width}
      />
      </div>
      <h2 className="data-range-conteiner__name">Дальность полета</h2>
    </>
  );
};

export default SliderComponent;