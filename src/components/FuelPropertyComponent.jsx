import React from 'react';

const FuelPropertyComponent = ({ name, value, unit, iconClass }) => {
  return (
    <div className="res-content">
      <div className="data-conteiner__img-name-container">
        <div className="data-conteiner__img-conteiner">
          <div className={iconClass || 'data-conteiner__img-default'}></div>
        </div>
        <h2 className="res-content__name">{`${name}, ${unit}`}</h2>
      </div>
      <h2 className="res-content__val">{value}</h2>
    </div>
  );
};

export default FuelPropertyComponent;