import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ChartsSection = () => {
  const data1 = [
    { name: 'Янв', value: 74 },
    { name: 'Фев', value: 68 },
    { name: 'Мар', value: 82 },
    { name: 'Апр', value: 70 },
    { name: 'Май', value: 75 },
  ];
  const data2 = [
    { name: 'Янв', value: 562 },
    { name: 'Фев', value: 550 },
    { name: 'Мар', value: 570 },
    { name: 'Апр', value: 545 },
    { name: 'Май', value: 560 },
  ];

  return (
    <section className="charts-section py-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Графики</h1>
      <div className="flex flex-row justify-center gap-8">
        <div className="chart-container bg-white p-4 rounded-lg shadow-md w-[45%]">
          <h2 className="text-xl font-semibold mb-4 text-center">Температура застывания</h2>
          <LineChart width={500} height={300} data={data1} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </div>
        <div className="chart-container bg-white p-4 rounded-lg shadow-md w-[45%]">
          <h2 className="text-xl font-semibold mb-4 text-center">Плотность</h2>
          <LineChart width={500} height={300} data={data2} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" activeDot={{ r: 8 }} />
          </LineChart>
        </div>
      </div>
    </section>
  );
};

export default ChartsSection;