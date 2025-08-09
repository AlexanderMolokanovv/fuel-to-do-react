import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ChartsSection = () => {
  const viscosityData = [
    { temp: 230, sample1: 50, sample2: 45, sample3: 40, sample4: 35, sample5: 30, sample6: 25 },
    { temp: 240, sample1: 42, sample2: 38, sample3: 34, sample4: 30, sample5: 26, sample6: 22 },
    { temp: 250, sample1: 35, sample2: 32, sample3: 28, sample4: 25, sample5: 22, sample6: 19 },
    { temp: 260, sample1: 28, sample2: 26, sample3: 22, sample4: 20, sample5: 18, sample6: 16 },
    { temp: 270, sample1: 22, sample2: 20, sample3: 18, sample4: 16, sample5: 14, sample6: 13 },
    { temp: 280, sample1: 16, sample2: 15, sample3: 14, sample4: 12, sample5: 11, sample6: 10 },
    { temp: 290, sample1: 12, sample2: 11, sample3: 10, sample4: 9, sample5: 8, sample6: 7 },
  ];

  const heatCapacityData = [
    { temp: 250, sample1: 1.5, sample2: 1.6, sample3: 1.7, sample4: 1.8, sample5: 1.9, sample6: 2.0 },
    { temp: 300, sample1: 1.6, sample2: 1.7, sample3: 1.8, sample4: 1.9, sample5: 2.0, sample6: 2.1 },
    { temp: 350, sample1: 1.7, sample2: 1.8, sample3: 1.9, sample4: 2.0, sample5: 2.1, sample6: 2.2 },
    { temp: 400, sample1: 1.8, sample2: 1.9, sample3: 2.0, sample4: 2.1, sample5: 2.2, sample6: 2.3 },
    { temp: 450, sample1: 1.9, sample2: 2.0, sample3: 2.1, sample4: 2.2, sample5: 2.3, sample6: 2.4 },
    { temp: 500, sample1: 2.0, sample2: 2.1, sample3: 2.2, sample4: 2.3, sample5: 2.4, sample6: 2.5 },
  ];

  return (
    <section className="charts-section py-8 bg-gray-100">
      <h1 className="section-content__name">Графики</h1>
      <div className="box-two-containers">
        <div className="graf-conteiner">
          <h2 className="res-content__name">Вязкость</h2>
          <LineChart width={500} height={300} data={viscosityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="temp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sample1" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="sample2" stroke="#82ca9d" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="sample3" stroke="#ff7300" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="sample4" stroke="#ffbb78" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="sample5" stroke="#00c49f" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="sample6" stroke="#d0ed57" activeDot={{ r: 8 }} />
          </LineChart>
        </div>
        <div className="graf-conteiner">
          <h2 className="res-content__name">Теплоемкость</h2>
          <LineChart width={500} height={300} data={heatCapacityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="temp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sample1" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="sample2" stroke="#82ca9d" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="sample3" stroke="#ff7300" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="sample4" stroke="#ffbb78" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="sample5" stroke="#00c49f" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="sample6" stroke="#d0ed57" activeDot={{ r: 8 }} />
          </LineChart>
        </div>
      </div>
    </section>
  );
};

export default ChartsSection;