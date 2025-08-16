// ./src/components/InputComponent.jsx
import React, { useState } from "react";

function InputComponent({
  id,
  name,
  unit,
  initialMinValue,
  initialMaxValue,
  iconClass,
  tooltip,
  step,
  onValueChange,
}) {
  const [minValue, setMinValue] = useState(initialMinValue || "");
  const [maxValue, setMaxValue] = useState(initialMaxValue || "");

  const handleMinChange = (e) => {
    const newValue = e.target.value;
    setMinValue(newValue);
    onValueChange(id, newValue, maxValue);
  };

  const handleMaxChange = (e) => {
    const newValue = e.target.value;
    setMaxValue(newValue);
    onValueChange(id, minValue, newValue);
  };

  const inputStep = step || (
    id === "freezingTemp" ? "any" : (
      ["viscosity", "thermalConductivity", "vaporPressure", "burningRate"].includes(id) ? 0.01 : 1
    )
  );

  // Set minimum value: only freezingTemp can be negative
  const inputMin = id === "freezingTemp" ? -273.15 : 0;

  console.log(`InputComponent ${id}: step=${inputStep}, unit=${unit}, min=${inputMin}`);

  return (
    <div className="data-conteiner">
      <div className="data-conteiner__img-name-container">
        <div className="data-conteiner__img-conteiner">
          <div className={iconClass || "data-conteiner__img-default"}></div>
        </div>
        <h2 className="data-conteiner__name">{name}{unit ? `, ${unit}` : ""}</h2>
      </div>
      <div className="data-conteiner__two-inputs-container">
        <div className="data-conteiner__input-field" {...(tooltip ? { "data-tooltip": tooltip } : {})}>
          <input
            type="number"
            className="data-conteiner__input"
            value={minValue}
            onChange={handleMinChange}
            step={inputStep}
            min={inputMin}
            placeholder="Min"
          />
        </div>
        <div className="data-conteiner__input-field" {...(tooltip ? { "data-tooltip": tooltip } : {})}>
          <input
            type="number"
            className="data-conteiner__input"
            value={maxValue}
            onChange={handleMaxChange}
            step={inputStep}
            min={inputMin}
            placeholder="Max"
          />
        </div>
      </div>
    </div>
  );
}

export default InputComponent;