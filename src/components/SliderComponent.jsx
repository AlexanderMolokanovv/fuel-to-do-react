import React, { useState, useEffect } from "react";

const SliderComponent = ({
  id,
  name,
  initialValue,
  iconClass,
  onValueChange,
}) => {
  const [width, setWidth] = useState(initialValue);

  const changeWidth = (e) => {
    const newValue = e.target.value;
    setWidth(newValue);
    onValueChange(id, newValue);
  };

  useEffect(() => {
    // Example: fetch('/api/update', { ... });
  }, [width, id]);

  return (
    <div className="data-range-conteiner">
      <div className="data-range-conteiner__picture-percentages-box">
        <div className={iconClass}></div>
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
      <h2 className="data-range-conteiner__name">{name}</h2>
    </div>
  );
};

export default SliderComponent;
