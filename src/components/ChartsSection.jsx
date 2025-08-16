import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function ChartsSection({ graphData }) {
  const viscosityData = graphData?.viscosity || [];
  const heatCapacityData = graphData?.heatCapacity || [];

  return (
    <section className="charts-section py-8 bg-gray-100">
      <h1 className="section-content__name">Графики</h1>
      <div className="box-two-containers">
        <div className="graf-conteiner">
          <h2 className="res-content__name">Вязкость</h2>
          <LineChart width={500} height={300} data={viscosityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="temp" label={{ value: 'Температура (°C)', position: 'insideBottomRight', offset: -10 }} />
            <YAxis label={{ value: 'Вязкость (мПа·с)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sample1" stroke="#8884d8" activeDot={{ r: 8 }} name="JP-8" />
            <Line type="monotone" dataKey="sample2" stroke="#82ca9d" activeDot={{ r: 8 }} name="Ethanol" />
            <Line type="monotone" dataKey="sample3" stroke="#ff7300" activeDot={{ r: 8 }} name="TS-1" />
            <Line type="monotone" dataKey="sample4" stroke="#ffbb78" activeDot={{ r: 8 }} name="OME1" />
            <Line type="monotone" dataKey="sample5" stroke="#00c49f" activeDot={{ r: 8 }} name="Propanol" />
            <Line type="monotone" dataKey="sample6" stroke="#d0ed57" activeDot={{ r: 8 }} name="Methanol" />
          </LineChart>
        </div>
        <div className="graf-conteiner">
          <h2 className="res-content__name">Теплоемкость</h2>
          <LineChart width={500} height={300} data={heatCapacityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="temp" label={{ value: 'Условная точка', position: 'insideBottomRight', offset: -10 }} />
            <YAxis label={{ value: 'Теплоемкость (кДж/К)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sample1" stroke="#8884d8" activeDot={{ r: 8 }} name="JP-8" />
            <Line type="monotone" dataKey="sample2" stroke="#82ca9d" activeDot={{ r: 8 }} name="Ethanol" />
            <Line type="monotone" dataKey="sample3" stroke="#ff7300" activeDot={{ r: 8 }} name="TS-1" />
            <Line type="monotone" dataKey="sample4" stroke="#ffbb78" activeDot={{ r: 8 }} name="OME1" />
            <Line type="monotone" dataKey="sample5" stroke="#00c49f" activeDot={{ r: 8 }} name="Propanol" />
            <Line type="monotone" dataKey="sample6" stroke="#d0ed57" activeDot={{ r: 8 }} name="Methanol" />
          </LineChart>
        </div>
      </div>
    </section>
  );
}

export default ChartsSection;