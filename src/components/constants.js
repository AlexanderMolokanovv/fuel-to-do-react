 // Данные для карточек
  const cards = [
    {
      id: "range",
      name: "Дальность полета",
      initialValue: 49,
      iconClass: "data-conteiner__img-range",
    },
    {
      id: "payload",
      name: "Полезная нагрузка",
      initialValue: 73,
      iconClass: "data-conteiner__img-payload",
    },
    {
      id: "ecology",
      name: "Экологичность",
      initialValue: 65,
      iconClass: "data-conteiner__img-ecology",
    },
    {
      id: "cost",
      name: "Стоимость владения",
      initialValue: 55,
      iconClass: "data-conteiner__img-cost",
    },
    {
      id: "reliability",
      name: "Надежность",
      initialValue: 80,
      iconClass: "data-conteiner__img-reliability",
    },
  ];

  const inputCards = [
    {
      id: "freezingTemp",
      name: "Температура застывания",
      initialValue: 0,
      unit: "°C",
      tooltip: "не менее",
      iconClass: "data-conteiner__img-freezing-temp",
    },
    {
      id: "density",
      name: "Плотность",
      initialValue: 800,
      unit: "кг/м³",
      tooltip: "не более",
      iconClass: "data-conteiner__img-density",
    },
    {
      id: "viscosity",
      name: "Вязкость при -20°C",
      initialValue: 5,
      unit: "мПа·с",
      iconClass: "data-conteiner__img-viscosity",
    },
    {
      id: "combustionHeat",
      name: "Массовая теплота сгорания",
      initialValue: 43000,
      unit: "кДж/кг",
      iconClass: "data-conteiner__img-combustion-heat",
    },
    {
      id: "coolingResource",
      name: "Хладоресурс",
      initialValue: 2000,
      unit: "кДж/кг",
      iconClass: "data-conteiner__img-cooling-resource",
    },
    {
      id: "thermalConductivity",
      name: "Теплопроводность",
      initialValue: 0.15,
      unit: "Вт/(М*К)",
      step: 0.01,
      iconClass: "data-conteiner__img-thermal-conductivity",
    },
    {
      id: "heatCapacity",
      name: "Теплоемкость",
      initialValue: 2000,
      unit: "Дж/К",
      iconClass: "data-conteiner__img-heat-capacity",
    },
    {
      id: "inductionPeriod",
      name: "Период индукции",
      initialValue: 600,
      unit: "сек",
      iconClass: "data-conteiner__img-induction-period",
    },
    {
      id: "burningRate",
      name: "Скорость горения",
      initialValue: 0.5,
      unit: "м/с",
      step: 0.01,
      iconClass: "data-conteiner__img-burning-rate",
    },
    {
      id: "vaporPressure",
      name: "Давление насыщеных паров при 150°C",
      initialValue: 100,
      unit: "кПа",
      iconClass: "data-conteiner__img-vapor-pressure",
    },
  ];

  const fuelComponents = [
    { id: "component1", name: "Компонент 1", value: 44, unit: "%" },
    { id: "component2", name: "Компонент 2", value: 20, unit: "%" },
    { id: "component3", name: "Компонент 3", value: 15, unit: "%" },
    { id: "component4", name: "Компонент 4", value: 10, unit: "%" },
    { id: "component5", name: "Компонент 5", value: 8, unit: "%" },
    { id: "component6", name: "Компонент 6", value: 3, unit: "%" },
  ];

  const fuelProperties = [
  { id: "freezingTemp", name: "Температура застывания", value: -47, unit: "°C", iconClass: "data-conteiner__img-freezing-temp" },
  { id: "density", name: "Плотность", value: 800, unit: "кг/м³", iconClass: "data-conteiner__img-density" },
  { id: "viscosity", name: "Вязкость при -20°C", value: 8, unit: "мПа·с", iconClass: "data-conteiner__img-viscosity" },
  { id: "combustionHeat", name: "Массовая теплота сгорания", value: 43100, unit: "кДж/кг", iconClass: "data-conteiner__img-combustion-heat" },
  { id: "coolingResource", name: "Хладоресурс", value: 2100, unit: "кДж/кг", iconClass: "data-conteiner__img-cooling-resource" },
  { id: "thermalConductivity", name: "Теплопроводность", value: 0.15, unit: "Вт/(М*К)", iconClass: "data-conteiner__img-thermal-conductivity" },
  { id: "heatCapacity", name: "Теплоемкость", value: 2000, unit: "Дж/К", iconClass: "data-conteiner__img-heat-capacity" },
  { id: "inductionPeriod", name: "Период индукции", value: 600, unit: "сек", iconClass: "data-conteiner__img-induction-period" },
  { id: "burningRate", name: "Скорость горения", value: 0.2, unit: "м/с", iconClass: "data-conteiner__img-burning-rate" },
  { id: "vaporPressure", name: "Давление насыщеных паров при 150°C", value: 10, unit: "кПа", iconClass: "data-conteiner__img-vapor-pressure" },
];

const additionalFields = [
  { id: "engine", name: "Выбор двигателя", unit: "", iconClass: "data-conteiner__img-engine" },
  { id: "aircraftMass", name: "Масса летательного аппарата", unit: "кг", iconClass: "data-conteiner__img-aircraft-mass" },
  { id: "fuelTankVolume", name: "Объем бака", unit: "л", iconClass: "data-conteiner__img-fuel-tank-volume" },
  { id: "payload", name: "Полезная нагрузка", unit: "кг", iconClass: "data-conteiner__img-payload" },
];

export { cards, inputCards, fuelComponents, fuelProperties, additionalFields };