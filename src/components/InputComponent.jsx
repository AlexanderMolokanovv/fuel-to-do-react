import React, { useState, useEffect } from 'react';

const InputComponent = ({ id, name, initialValue, unit, tooltip, onValueChange }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onValueChange(id, newValue);
  };

  useEffect(() => {
    // Example: Send data to server
    // fetch('/api/update', {
    //   method: 'POST',
    //   body: JSON.stringify({ id, value }),
    //   headers: { 'Content-Type': 'application/json' },
    // });
  }, [value, id]);

  return (
    <div className="data-range-conteiner">
      <div className="data-range-conteiner__input-box">
        <h2 className="data-range-conteiner__name">{name}</h2>
        <div className="data-range-conteiner__input-wrapper" data-tooltip={tooltip}>
          <input
            type="number"
            className="data-range-conteiner__input"
            value={value}
            onChange={handleChange}
            step={unit.includes('Вт') || unit.includes('м/с') ? 0.01 : 1}
            min={0}
          />
          <span className="data-range-conteiner__unit">{unit}</span>
        </div>
      </div>
    </div>
  );
};

export default InputComponent;