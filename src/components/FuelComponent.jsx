import React from 'react';

const FuelComponent = ({ name, value, unit, index }) => {
  return (
    <div className="res-content">
      <h2 className="res-content__name">{`${index + 1}. ${name}`}</h2>
      <h2 className="res-content__val">{`${value}${unit}`}</h2>
    </div>
  );
};

export default FuelComponent;