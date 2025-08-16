import React, { useState } from 'react';
import InputComponent from './InputComponent';
import SliderComponent from './SliderComponent';
import '../blocks/data-conteiner/data-conteiner.css';
import '../blocks/data-conteiner/__two-inputs-container/data-conteiner__two-inputs-container.css';
import '../blocks/calculate-button/calculate-button.css';

function FuelForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    vehicleType: '',
    engineType: '',
    aircraftMass: '',
    fuelTankVolume: '',
    payload: '',
    wsmCoefficients: {
      range: 50,
      payload: 50,
      ecology: 50,
      cost: 50,
      reliability: 50
    },
    limitingParameters: {
      freezingTemp: { min: '', max: '' },
      density: { min: '', max: '' },
      viscosity: { min: '', max: '' },
      combustionHeat: { min: '', max: '' },
      coolingResource: { min: '', max: '' },
      thermalConductivity: { min: '', max: '' },
      heatCapacity: { min: '', max: '' },
      inductionPeriod: { min: '', max: '' },
      burningRate: { min: '', max: '' },
      vaporPressure: { min: '', max: '' }
    }
  });

  const handleInputChange = (id, value) => {
    if (id.startsWith('wsm')) {
      setFormData({
        ...formData,
        wsmCoefficients: { ...formData.wsmCoefficients, [id.replace('wsm', '').toLowerCase()]: Number(value) }
      });
    } else if (id.includes('Min') || id.includes('Max')) {
      const [param, bound] = id.split(/(Min|Max)/);
      const paramKey = param.charAt(0).toLowerCase() + param.slice(1);
      setFormData({
        ...formData,
        limitingParameters: {
          ...formData.limitingParameters,
          [paramKey]: {
            ...formData.limitingParameters[paramKey],
            [bound.toLowerCase()]: value === '' ? '' : Number(value)
          }
        }
      });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleFormSubmit} className="fuel-form">
      <h1 className="section-content__name">Ввод данных</h1>
      
      <section className="section-content">
        <h2>Характеристики летательного аппарата</h2>
        <InputComponent
          id="vehicleType"
          name="Тип аппарата"
          initialValue={formData.vehicleType}
          onValueChange={handleInputChange}
          type="select"
          options={[
            { value: 'airplane', label: 'Самолет' },
            { value: 'helicopter', label: 'Вертолет' },
            { value: 'rocket', label: 'Ракета' }
          ]}
        />
        <InputComponent
          id="engineType"
          name="Тип двигателя"
          initialValue={formData.engineType}
          onValueChange={handleInputChange}
          type="select"
          options={[
            { value: 'jet', label: 'Реактивный' },
            { value: 'turboprop', label: 'Турбовинтовой' }
          ]}
        />
        <InputComponent
          id="aircraftMass"
          name="Масса аппарата (кг)"
          initialValue={formData.aircraftMass}
          onValueChange={handleInputChange}
          type="number"
          placeholder="Введите массу"
        />
        <InputComponent
          id="fuelTankVolume"
          name="Объем бака (л)"
          initialValue={formData.fuelTankVolume}
          onValueChange={handleInputChange}
          type="number"
          placeholder="Введите объем"
        />
        <InputComponent
          id="payload"
          name="Полезная нагрузка (кг)"
          initialValue={formData.payload}
          onValueChange={handleInputChange}
          type="number"
          placeholder="Введите нагрузку"
        />
      </section>

      <section className="section-content">
        <h2>WSM коэффициенты</h2>
        <SliderComponent
          id="wsmRange"
          name="Дальность полета"
          initialValue={formData.wsmCoefficients.range}
          onValueChange={handleInputChange}
          iconClass="data-conteiner__img-range"
        />
        <SliderComponent
          id="wsmPayload"
          name="Полезная нагрузка"
          initialValue={formData.wsmCoefficients.payload}
          onValueChange={handleInputChange}
          iconClass="data-conteiner__img-payload"
        />
        <SliderComponent
          id="wsmEcology"
          name="Экологичность"
          initialValue={formData.wsmCoefficients.ecology}
          onValueChange={handleInputChange}
          iconClass="data-conteiner__img-ecology"
        />
        <SliderComponent
          id="wsmCost"
          name="Стоимость владения"
          initialValue={formData.wsmCoefficients.cost}
          onValueChange={handleInputChange}
          iconClass="data-conteiner__img-cost"
        />
        <SliderComponent
          id="wsmReliability"
          name="Надежность"
          initialValue={formData.wsmCoefficients.reliability}
          onValueChange={handleInputChange}
          iconClass="data-conteiner__img-reliability"
        />
      </section>

      <section className="section-content">
        <h2>Ограничивающие параметры</h2>
        {[
          { id: 'freezingTemp', name: 'Температура застывания (°C)', unit: '°C' },
          { id: 'density', name: 'Плотность (кг/м³)', unit: 'кг/м³' },
          { id: 'viscosity', name: 'Вязкость при -20°C (мПа·с)', unit: 'мПа·с' },
          { id: 'combustionHeat', name: 'Массовая теплота сгорания (кДж/кг)', unit: 'кДж/кг' },
          { id: 'coolingResource', name: 'Хладоресурс (кДж/кг)', unit: 'кДж/кг' },
          { id: 'thermalConductivity', name: 'Теплопроводность (Вт/(м·К))', unit: 'Вт/(м·К)' },
          { id: 'heatCapacity', name: 'Теплоемкость (Дж/К)', unit: 'Дж/К' },
          { id: 'inductionPeriod', name: 'Период индукции (сек)', unit: 'сек' },
          { id: 'burningRate', name: 'Скорость горения (м/с)', unit: 'м/с' },
          { id: 'vaporPressure', name: 'Давление насыщенных паров при 150°C (кПа)', unit: 'кПа' }
        ].map(param => (
          <div key={param.id} className="data-conteiner__two-inputs-container">
            <InputComponent
              id={`${param.id}Min`}
              name={`${param.name} (min)`}
              initialValue={formData.limitingParameters[param.id].min}
              onValueChange={handleInputChange}
              type="number"
              placeholder="Min"
              iconClass={`data-conteiner__img-${param.id}`}
            />
            <InputComponent
              id={`${param.id}Max`}
              name={`${param.name} (max)`}
              initialValue={formData.limitingParameters[param.id].max}
              onValueChange={handleInputChange}
              type="number"
              placeholder="Max"
              iconClass={`data-conteiner__img-${param.id}`}
            />
          </div>
        ))}
      </section>

      <button type="submit" className="calculate-button">
        Рассчитать
      </button>
    </form>
  );
}

export default FuelForm;