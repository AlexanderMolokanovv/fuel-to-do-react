import React, { useState, useEffect } from 'react';

const InputComponent = ({ id, name, initialMinValue, initialMaxValue, unit, tooltip, iconClass, step, onValueChange }) => {
  const [minValue, setMinValue] = useState(initialMinValue || '');
  const [maxValue, setMaxValue] = useState(initialMaxValue || '');

  const handleMinChange = (e) => {
    const newValue = e.target.value;
    setMinValue(newValue);
    onValueChange(id, { min: newValue, max: maxValue });
  };

  const handleMaxChange = (e) => {
    const newValue = e.target.value;
    setMaxValue(newValue);
    onValueChange(id, { min: minValue, max: newValue });
  };

  useEffect(() => {
    // Example: Send data to server
    // fetch('/api/update', {
    //   method: 'POST',
    //   body: JSON.stringify({ id, minValue, maxValue }),
    //   headers: { 'Content-Type': 'application/json' },
    // });
  }, [minValue, maxValue, id]);

  // Определяем шаг для инпутов: используем prop step, если он есть, иначе проверяем unit
  const inputStep = step || (unit && (unit.includes('Вт') || unit.includes('м/с')) ? 0.01 : 1);

  return (
    <div className="data-conteiner">
      <div className="data-conteiner__img-name-container">
        <div className="data-conteiner__img-conteiner">
          <div className={iconClass || 'data-conteiner__img-default'}></div>
        </div>
        <h2 className="data-conteiner__name">{name}{unit ? `, ${unit}` : ''}</h2>
      </div>
      <div className="data-conteiner__two-inputs-container">
        <div className="data-conteiner__input-field" {...(tooltip ? { 'data-tooltip': tooltip } : {})}>
          <input
            type="number"
            className="data-conteiner__input"
            value={minValue}
            onChange={handleMinChange}
            step={inputStep}
            min={0}
            placeholder="Min"
          />
        </div>
        <div className="data-conteiner__input-field" {...(tooltip ? { 'data-tooltip': tooltip } : {})}>
          <input
            type="number"
            className="data-conteiner__input"
            value={maxValue}
            onChange={handleMaxChange}
            step={inputStep}
            min={0}
            placeholder="Max"
          />
        </div>
      </div>
    </div>
  );
};

export default InputComponent;