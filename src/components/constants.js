const cards = [
  { id: 'range', name: 'Дальность полета', initialValue: 50, iconClass: 'data-conteiner__img-range' },
  { id: 'payload', name: 'Полезная нагрузка', initialValue: 50, iconClass: 'data-conteiner__img-payload' },
  { id: 'ecology', name: 'Экологичность', initialValue: 50, iconClass: 'data-conteiner__img-ecology' },
  { id: 'cost', name: 'Стоимость владения', initialValue: 50, iconClass: 'data-conteiner__img-cost' },
  { id: 'reliability', name: 'Надежность', initialValue: 50, iconClass: 'data-conteiner__img-reliability' }
];

const inputCards = [
  { id: 'freezingTemp', name: 'Температура застывания', initialMin: -100, initialMax: -20, unit: '°C', iconClass: 'data-conteiner__img-freezing-temp', tooltip: 'Температура застывания топлива (°C)' },
  { id: 'density', name: 'Плотность', initialMin: 600, initialMax: 1000, unit: 'кг/м³', iconClass: 'data-conteiner__img-density', tooltip: 'Плотность топлива (кг/м³)' },
  { id: 'viscosity', name: 'Вязкость при -20°C', initialMin: 0.1, initialMax: 10, unit: 'мПа·с', iconClass: 'data-conteiner__img-viscosity', tooltip: 'Вязкость при -20°C (мПа·с)' },
  { id: 'combustionHeat', name: 'Массовая теплота сгорания', initialMin: 15000, initialMax: 50000, unit: 'кДж/кг', iconClass: 'data-conteiner__img-combustion-heat', tooltip: 'Массовая теплота сгорания (кДж/кг)' },
  { id: 'coolingResource', name: 'Хладоресурс', initialMin: 1000, initialMax: 3000, unit: 'кДж/кг', iconClass: 'data-conteiner__img-cooling-resource', tooltip: 'Хладоресурс (кДж/кг)' },
  { id: 'thermalConductivity', name: 'Теплопроводность', initialMin: 0.05, initialMax: 0.3, unit: 'Вт/(м·К)', iconClass: 'data-conteiner__img-thermal-conductivity', tooltip: 'Теплопроводность (Вт/(м·К))' },
  { id: 'heatCapacity', name: 'Теплоемкость', initialMin: 1000, initialMax: 5000, unit: 'Дж/К', iconClass: 'data-conteiner__img-heat-capacity', tooltip: 'Теплоемкость (Дж/К)' },
  { id: 'inductionPeriod', name: 'Период индукции', initialMin: 200, initialMax: 800, unit: 'сек', iconClass: 'data-conteiner__img-induction-period', tooltip: 'Период индукции (сек)' },
  { id: 'burningRate', name: 'Скорость горения', initialMin: 0.05, initialMax: 2, unit: 'м/с', iconClass: 'data-conteiner__img-burning-rate', tooltip: 'Скорость горения (м/с)' },
  { id: 'vaporPressure', name: 'Давление насыщенных паров при 150°C', initialMin: 0.1, initialMax: 100, unit: 'кПа', iconClass: 'data-conteiner__img-vapor-pressure', tooltip: 'Давление насыщенных паров при 150°C (кПа)' }
];

const additionalFields = [
  { id: 'aircraftMass', name: 'Масса летательного аппарата', unit: 'кг', iconClass: 'data-conteiner__img-aircraft-mass' },
  { id: 'fuelTankVolume', name: 'Объем бака', unit: 'л', iconClass: 'data-conteiner__img-fuel-tank-volume' },
  { id: 'payload', name: 'Полезная нагрузка', unit: 'кг', iconClass: 'data-conteiner__img-payload' }
];

export { cards, inputCards, additionalFields };